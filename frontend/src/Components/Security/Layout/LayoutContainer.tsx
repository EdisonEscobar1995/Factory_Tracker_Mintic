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
import { menus as myMenus } from '../../../config/Shared/Menu';

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
  const location = useLocation();
  const [menus] = useState(myMenus());

  const {
    logged, user, loading, setAuthentication
  } = useAuthentication();

  useEffect(() => {
    if (logged && localStorage.getItem('token') && location.pathname.indexOf(`${routeConstants.URL_WITHOUT_LAYOUT}`) > -1) {
      // window.history.pushState(null, '', routeConstants.URL_HOME);
      if (!logged) {
        setAuthentication({
          logged: true,
          loading: false,
          user: undefined,
        })
      }
      history.push(routeConstants.URL_HOME);
    }
  }, [logged]);

  console.log('logged == ', logged, ' loading == ', loading);

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
              setAuthentication={setAuthentication}
            />
          )}
        />
      )}
      {logged && (
        <Layout
          path={pathname}
          collapsed={collapse}
          handleCollapse={handleCollapse}
          menus={menus.primary || []}
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
      {/* {!logged && (
        <Route render={() => <Redirect to={redirect} />} />
      )} */}
      
      <Route path="/404" component={asyncFiles.notFound} />
    </Switch>
  );
};

export default withRouter(LayoutContainer);
