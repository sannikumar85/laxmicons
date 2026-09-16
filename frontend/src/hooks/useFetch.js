import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const useFetch = (
  fetchFunction,
  options = {}
) => {
  const {
    immediate = true,
    initialData = null,
  } = options;

  const [data, setData] =
    useState(initialData);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args) => {
      if (!fetchFunction) return;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(...args);

        if (!isMounted.current) return result;

        setData(result);

        return result;
      } catch (err) {
        if (!isMounted.current) return;

        const errorMessage =
          err?.message ||
          "Something went wrong.";

        setError(errorMessage);

        throw err;
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (immediate && fetchFunction) {
      execute().catch(() => {});
    }
  }, [immediate, fetchFunction, execute]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

export default useFetch;