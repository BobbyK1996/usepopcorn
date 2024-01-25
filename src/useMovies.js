import debounce from 'lodash/debounce';
import { useCallback, useState, useEffect } from 'react';

const KEY = 'a12b7d00';

const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  let controller = new AbortController();

  const fetchMovies = async (searchQuery) => {
    try {
      setIsLoading(true);
      setError('');
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.Response === 'False') {
        throw new Error('Movie not found');
      }

      setMovies(data.Search);
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.log('Error fetching movies:', err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 300), []);

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    controller.abort();

    controller = new AbortController();

    // handleCloseMovie();
    callback?.();

    debouncedFetchMovies(query);

    return () => {
      controller.abort();
      controller = new AbortController();
    };
  }, [query, debouncedFetchMovies]);

  return { movies, isLoading, error };
};

export { useMovies };
