import { Icreateprops } from '../../../Interfaces';
import { routeConstants } from '../../Shared/Constants';

const { URL_WITHOUT_LAYOUT } = routeConstants;

const createRoutes = ({ layout, url, ...rest }: Icreateprops) => ({
  ...rest,
  layout,
  path: layout ? url : `${URL_WITHOUT_LAYOUT}${url}`,
});

export default createRoutes;
