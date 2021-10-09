import React, { FC } from 'react';
import { Icreateprops } from '../../../Interfaces';
import { Redirect, Route, Switch } from 'react-router-dom';

interface IRoutesProps {
  routes: Icreateprops[],
  user: any,
  toRedirect: boolean,
  setAuthentication?: any
}

const Routes: FC<IRoutesProps> = ({
  routes, user, toRedirect, setAuthentication
}: IRoutesProps) => {

  return (
    <Switch>
      {routes.map(({ component, exact, path }, index) => (
        <Route
          key={index}
          exact={exact}
          path={path}
          render={(props) => React.createElement(
            component,
            {
              ...props,
              user,
              setAuthentication
            },
            null
          )}
        />
      ))}
      {toRedirect && <Route render={() => <Redirect to="/" />} />}
    </Switch>
  )
};

export default Routes;
