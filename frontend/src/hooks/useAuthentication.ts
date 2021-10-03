import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUseAuthenticationProps } from '../Interfaces/Login/login';

const initialData = {
  loading: false,
  logged: false,
  user: undefined,
};

const useAuthentication = () => {

  const [authentication, setAuthentication] = useState<IUseAuthenticationProps>(initialData);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthentication({
        logged: true,
        loading: false,
        user: JSON.parse(localStorage.getItem('user') || '')
      });
    }
  }, []);

  return {
    ...(authentication || initialData),
    setAuthentication
  };
};

export default useAuthentication;