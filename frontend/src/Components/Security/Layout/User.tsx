import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderUser from './HeaderUser';

interface IUserProps {
  history: any,
  user?: any,
  [rest: string]: any
}

const User: React.FC<IUserProps> = ({ history, user, ...rest }: IUserProps) => {

  const handleLogout = () => {
    // await client.mutate({ mutation: LOGOUT });
    // TODO: check logout
    // history.push('/');
    debugger;
    localStorage.clear();
    history.push('/');
    window.location.reload();
  };

  return <HeaderUser user={user} handleLogout={handleLogout} {...rest} />;
};

export default withRouter(User);
