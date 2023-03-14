import { useEffect, useState } from 'react';

function getSavedValue<T>(key: string, initialValue: T) {
  let toReturn: T = initialValue;

  const savedValue: T = JSON.parse(localStorage.getItem(key) || '{}');

  if (savedValue) {
    toReturn = savedValue;
  }

  return toReturn;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getSavedValue<T>(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
}
