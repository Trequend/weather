import { useEffect, useState } from 'react';

export function useInterval(ms: number) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, ms);

    return () => {
      clearInterval(interval);
    };
  }, [ms]);

  return date;
}
