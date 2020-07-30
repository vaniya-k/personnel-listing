import {useState, useEffect} from 'react';

const useJsonFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if(url !== null) {
      setLoading(true);
      setError(null);

      fetch(url)
        .then(res => res.json())
        .then(res => {setData(res); setLoading(false)})
        .catch(err => {setError(err.message); setLoading(false)})
    }
  }, [url]);

  return [data, loading, error];
};

export default useJsonFetch;