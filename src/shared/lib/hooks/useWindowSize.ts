import { useEffect, useState } from 'react';

interface UseWindowSizeParams {
  includeScrollbar?: boolean;
}

export interface UseWindowSizeReturn {
  height: number;
  width: number;
}

export const useWindowSize = (params?: UseWindowSizeParams) => {
  const includeScrollbar = params?.includeScrollbar ?? true;
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        width: Number.POSITIVE_INFINITY,
        height: Number.POSITIVE_INFINITY
      };
    }

    return {
      width: includeScrollbar ? window.innerWidth : window.document.documentElement.clientWidth,
      height: includeScrollbar ? window.innerHeight : window.document.documentElement.clientHeight
    };
  });

  useEffect(() => {
    const onResize = () => {
      if (includeScrollbar) {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      } else {
        setSize({
          width: window.document.documentElement.clientWidth,
          height: window.document.documentElement.clientHeight
        });
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [params?.includeScrollbar]);

  return size;
};