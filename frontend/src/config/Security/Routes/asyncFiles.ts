import { lazy } from 'react';

const asyncFiles = {
  login: lazy(() => import('../../../Pages/Login')),
  register: lazy(() => import('../../../Pages/Register')),
  home: lazy(() => import('../../../Pages/Home')),
  sales: lazy(() => import('../../../Pages/Sales/Sales')),
  registerSale: lazy(() => import('../../../Pages/Sales/RegisterSale')),
  notFound: lazy(() => import('../../../Pages/NotFound404')),
};

export default asyncFiles;
