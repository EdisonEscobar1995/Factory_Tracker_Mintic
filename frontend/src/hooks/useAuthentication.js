import { useState, useEffect } from 'react';
import axios from 'axios';

const initialData = {
  loading: true,
  logged: false,
  user: undefined,
};

const useAuthentication = () => {

  const [authentication, setAuthentication] = useState(initialData);

  useEffect(() => {
    axios.post('http://localhost:5002/login', {})
      .then((data) => {
        if (data) {
          setAuthentication({
            loading: false,
            logged: data?.logged,
            user: data?.user
          });
        }
      });
  }, []);

  return {
    ...(authentication || initialData),
  };
};

export default useAuthentication;