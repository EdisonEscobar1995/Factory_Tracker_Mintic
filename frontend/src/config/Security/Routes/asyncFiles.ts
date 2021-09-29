import { lazy } from 'react';

const asyncFiles = {
  login: lazy(() => import('../../../Pages/Login')),
  notFound: lazy(() => import('../../../Pages/NotFound404')),
};

export default asyncFiles;
