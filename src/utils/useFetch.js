import {useEffect, useState} from 'react';
import axios from 'axios';

const UseFetch = () => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = 'https://app.onemor.com/api/workout-feed';
  const appToken = '1075|iAuA67HxC6K5uJa4H1YZFcGZ0jhfa5SXgPQghYNY24b703c9';

  const getDatas = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${appToken}`,
        },
      });

      setDatas(response.data.data);
      setIsLoading(false);

      //   console.log(datas);
    } catch (e) {
      setError(e);

      console.log('Fetch Error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    getDatas();
  };

  return {datas, isLoading, error, refetch};
};

export default UseFetch;
