import { useState, useEffect } from 'react';

const useLocalStorageState = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedValues = localStorage.getItem(key);
    console.log(storedValues);
    return storedValues ? JSON.parse(storedValues) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export { useLocalStorageState };
