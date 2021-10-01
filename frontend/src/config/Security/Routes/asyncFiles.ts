import { lazy } from 'react';

const asyncFiles = {
  login: lazy(() => import('../../../Pages/Login')),
  home: lazy(() => import('../../../Pages/Home')),
  notFound: lazy(() => import('../../../Pages/NotFound404')),
};

export default asyncFiles;
