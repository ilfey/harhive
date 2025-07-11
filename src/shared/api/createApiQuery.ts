import {
	Contract,
	createQuery,
	DynamicallySourcedField,
	HttpError,
	NetworkError,
	TimeoutError,
	timeout,
	unknownContract,
} from "@farfetched/core";
import { RequestParams } from "../lib/api/createRequestBuilder";
import { requestBuilder } from "./requestBuilder";

interface QueryParameters<
	Params,
	Response,
	ContractData extends Response,
	MappedData,
	MapDataSource = void,
> {
	request: RequestParams<Params>;
	response?: {
		contract?: Contract<Response, ContractData>;
		mapData?: DynamicallySourcedField<
			{
				result: ContractData;
				params: Params;
			},
			MappedData,
			MapDataSource
		>;
	};
	initialData?: MappedData;
}

export const createApiQuery = <
	Params = void,
	Response = unknown,
	ContractData extends Response = Response,
	MappedData = ContractData,
	MapDataSource = void,
>({
	request,
	response,
	initialData,
}: QueryParameters<
	Params,
	Response,
	ContractData,
	MappedData,
	MapDataSource
>) => {
	const query = createQuery<
		Params,
		Response,
		NetworkError | HttpError | TimeoutError,
		ContractData,
		MappedData,
		MapDataSource
	>({
		effect: requestBuilder<Params, Response>(request),
		contract:
			response?.contract ??
			(unknownContract as Contract<Response, ContractData>),
		mapData:
			response?.mapData ?? (({ result }) => result as unknown as MappedData),
		initialData: initialData ?? null!,
	});

	timeout(query, {
		after: 5000,
	});

	if (import.meta.env.DEV) {
		query.finished.failure.watch(({ error }) => {
			console.error(error);

			if (error?.errorType === "TIMEOUT") {
				console.log("@TIMEOUT");
				// TODO: error
			}

			if (error?.errorType === "NETWORK") {
				console.log("@NETWORK");
				// TODO: error
			}

			if (error?.errorType === "HTTP") {
				console.log("@HTTP");
				// TODO: error
			}

			if (error?.errorType === "INVALID_DATA") {
				console.log("@INVALID_DATA");
				// TODO: error
			}
		});
	}

	return query;
};
