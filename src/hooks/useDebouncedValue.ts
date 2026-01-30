import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
};
