import {useState, useEffect} from 'react';

const useJsonFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
    .then(res => res.json())
    .then(res => {setData(res); setLoading(false)})
    .catch(error => {setError(error.message); setLoading(false)})
  }, [url]);

  return [data, loading, error];
};

export default useJsonFetch;