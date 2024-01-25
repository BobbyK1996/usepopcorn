import { useEffect } from 'react';

const useKey = (key, action, additionalFunction) => {
  useEffect(() => {
    // if (additionalFunction) additionalFunction();

    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', callback);

    if (additionalFunction) additionalFunction();

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [action, key]);
};

export { useKey };
