import React, { useState, useCallback, useRef, useEffect } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const activeRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);

      const httpAbort = new AbortController();
      activeRequests.current.push(httpAbort);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        });
        const responseData = await response.json();

        activeRequests.current = activeRequests.current.filter(
          (req) => req !== httpAbort
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { loading, error, sendRequest, clearError };
};
