import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [size, setSize] = useState<{ width: number; height: number }>(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const listener = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  });

  return size;
}
