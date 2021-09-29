import React, { FC, useState, useEffect } from 'react';
import {
  Redirect, Route, Switch, withRouter, useLocation, RouteComponentProps
} from 'react-router-dom';
import Routes from './Routes';
import { routeConstants } from '../../../config/Shared/Constants';
import Layout from './Layout';
import { routes } from '../../../config/Security/Routes';
import useAuthentication from '../../../hooks/useAuthentication';
import asyncFiles from '../../../config/Security/Routes/asyncFiles';

const redirection = (logged: boolean) => (logged
  ? routeConstants.URL_HOME
  : `${routeConstants.URL_WITHOUT_LAYOUT}${routeConstants.URL_LOGIN}`);

interface MatchParams {
  id?: string
}

const LayoutContainer: FC<RouteComponentProps<MatchParams>> = ({
  history, location: { pathname },
}: RouteComponentProps<MatchParams>) => {
  const [collapse, setCollapsed] = useState(false);
  const [redirect] = useState(redirection(false));
  console.log('redirect = ', redirect);
  const location = useLocation();

  const {
    logged, user, loading
  } = useAuthentication();

  console.log('logged == ', logged);

  useEffect(() => {
    if (logged && location.pathname.indexOf(`${routeConstants.URL_WITHOUT_LAYOUT}`) > -1) {
      window.history.pushState(null, '', routeConstants.URL_HOME);
    }
  }, [logged]);

  const handleCollapse = () => setCollapsed(!collapse);

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={redirect} />} />
       {!logged && (
        <Route
          path={routeConstants.URL_WITHOUT_LAYOUT}
          render={() => (
            <Routes
              user={user}
              routes={routes.filter(({ layout }) => !layout)}
              toRedirect
            />
          )}
        />
      )}
      {logged && (
        <Layout
          path={pathname}
          collapsed={collapse}
          handleCollapse={handleCollapse}
          headerMenus={[]}
          user={user}
          history={history}
        >
          <Routes
            user={user}
            routes={routes.filter(
              ({ layout }) => (layout || layout === undefined)
            )}
            toRedirect={false}
          />
        </Layout>
      )}
      {!logged && !loading && (
        <Route render={() => <Redirect to={redirect} />} />
      )}
      <Route path="/404" component={asyncFiles.notFound} />
    </Switch>
  );
};

export default withRouter(LayoutContainer);
