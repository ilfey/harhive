import { configurationError } from '@farfetched/core';

export type NetworkData = string | string[] | number | boolean | null | undefined;
export type NetworkRecord = Record<string, NetworkData>;

export const stringifyNetworkData = (value: NetworkData): string | string[] | null => {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  return value ?? null;
};

export const recordToUrlSearchParams = (record: NetworkRecord): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(record)) {
    const stringifiedValue = stringifyNetworkData(value);

    if (Array.isArray(stringifiedValue)) {
      for (const v of stringifiedValue) {
        params.append(key, v);
      }
    } else if (stringifiedValue !== null) {
      params.append(key, stringifiedValue);
    }
  }

  return params;
};
export const formatUrl = (
  baseUrl: string | null,
  url: string,
  queryRecord: NetworkRecord | string
): URL => {
  let urlBase = baseUrl ?? undefined;
  let finalUrl = url;

  if (!baseUrl && url.startsWith('/')) {
    urlBase = globalThis.location.origin;
  }

  if (urlBase && url.startsWith('/')) {
    const base = new URL(urlBase);
    const basePath = base.pathname.replace(/\/+$/, '');

    finalUrl = basePath + url;
    urlBase = base.origin;
  }

  const queryString =
    typeof queryRecord === 'string' ? queryRecord : recordToUrlSearchParams(queryRecord).toString();

  if (queryString) {
    finalUrl = `${finalUrl}?${queryString}`;
  }

  /**
   * Workararound for Safari 14.0
   * @see https://github.com/igorkamyshev/farfetched/issues/528
   */
  const urlArguments = [finalUrl, urlBase].filter(Boolean) as [string, string];

  try {
    return new URL(...urlArguments);
  } catch {
    throw configurationError({
      reason: 'Invalid URL',
      validationErrors: [`"${finalUrl}" is not valid URL`]
    });
  }
};

export const formatHeaders = (headersRecord: NetworkRecord): Headers => {
  const headers = new Headers();

  for (const [key, value] of Object.entries(headersRecord)) {
    const cleanValue = stringifyNetworkData(value);

    if (Array.isArray(cleanValue)) {
      for (const v of cleanValue) {
        headers.append(key, v);
      }
    } else if (cleanValue !== null) {
      headers.append(key, cleanValue);
    }
  }

  return headers;
};

export const mergeRecords = (...records: (NetworkRecord | undefined | null)[]): NetworkRecord => {
  const final: Record<string, string | string[]> = {};

  for (const item of records) {
    if (typeof item !== 'object') {
      continue;
    }
    for (const [key, value] of Object.entries(item || {})) {
      const newCleanValue = stringifyNetworkData(value);

      if (newCleanValue === null) {
        continue;
      }

      final[key] = final[key] ? [final[key], newCleanValue].flat() : newCleanValue;
    }
  }

  return final;
};

export const mergeQueryStrings = (
  ...queryStrings: (NetworkRecord | string | undefined | null)[]
): string => {
  const final: string[] = [];

  for (const item of queryStrings) {
    if (!item) {
      continue;
    }

    const current = typeof item !== 'string' ? recordToUrlSearchParams(item).toString() : item;

    final.push(current);
  }

  return final.join('&');
};

export const isMessageError = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};