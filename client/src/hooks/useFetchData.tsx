import { useEffect, useState } from 'react';

function useFetchData<T>(fetchFunction: () => Promise<T>): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchFunction();

      if (isSubscribed) {
        setData(result);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    data,
    isLoading,
  };
}

export default useFetchData;
