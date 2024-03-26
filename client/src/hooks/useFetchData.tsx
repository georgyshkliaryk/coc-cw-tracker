import { useEffect, useState } from 'react';

function useFetchData<T>(fetchFunction: () => Promise<T>): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    const fetchData = async () => {
      const result = await fetchFunction();

      if (isSubscribed) {
        setData(result);
      }
    };

    fetchData();
    setIsLoading(false);

    return () => {
      isSubscribed = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
  };
}

export default useFetchData;
