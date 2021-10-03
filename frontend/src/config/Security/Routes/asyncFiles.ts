import { lazy } from 'react';

const asyncFiles = {
  login: lazy(() => import('../../../Pages/Login')),
  register: lazy(() => import('../../../Pages/Register')),
  home: lazy(() => import('../../../Pages/Home')),
  notFound: lazy(() => import('../../../Pages/NotFound404')),
};

export default asyncFiles;
