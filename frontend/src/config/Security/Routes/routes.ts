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
    component: asyncFiles.home,
    layout: true,
    url: '/home',
  }),
  createRoutes({
    component: asyncFiles.notFound,
    layout: false,
    url: '/register',
  }),
];

export default routes;
