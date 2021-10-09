import { lazy } from 'react';

const asyncFiles = {
  login: lazy(() => import('../../../Pages/Login')),
  register: lazy(() => import('../../../Pages/Register')),
  home: lazy(() => import('../../../Pages/Home')),
  users: lazy(() => import('../../../Pages/Security/Users')),
  sales: lazy(() => import('../../../Pages/Sales/Sales')),
  products: lazy(() => import('../../../Pages/Products/Products')),
  registerSale: lazy(() => import('../../../Pages/Sales/RegisterSale')),
  registerProduct: lazy(() => import('../../../Pages/Products/RegisterProduct')),
  notFound: lazy(() => import('../../../Pages/NotFound404')),
};

export default asyncFiles;
