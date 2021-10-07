import createRoutes from './create';
import asyncFiles from './asyncFiles';

const routes = [
  createRoutes({
    component: asyncFiles.notFound,
    layout: false,
    url: '/forgotPassword',
  }),
  createRoutes({
    component: asyncFiles.login,
    layout: false,
    url: '/login',
  }),
  createRoutes({
    component: asyncFiles.register,
    layout: false,
    url: '/register',
  }),
  createRoutes({
    component: asyncFiles.home,
    layout: true,
    url: '/home',
    target: 'home'
  }),
  createRoutes({
    component: asyncFiles.sales,
    layout: true,
    url: '/users',
    target: 'users'
  }),
  createRoutes({
    component: asyncFiles.sales,
    layout: true,
    url: '/sales',
    target: 'sales'
  }),
  createRoutes({
    component: asyncFiles.registerSale,
    layout: true,
    url: '/registerSale/:id?',
    target: 'sales'
  }),
  createRoutes({
    component: asyncFiles.notFound,
    layout: true,
    url: undefined,
  }),
];

export default routes;
