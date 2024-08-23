import { useEffect, useState } from "react";

export function useLocalstorage<T>(key: string, initialValue: T) {
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  };

  const [value, setValue] = useState<T>(getStoredValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
