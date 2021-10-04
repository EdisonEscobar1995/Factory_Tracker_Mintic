import React from 'react';
import { withRouter } from 'react-router-dom';
import { IUserProps } from '../../../Interfaces/Login/user';
import HeaderUser from './HeaderUser';

const User: React.FC<IUserProps> = ({ history, user, ...rest }: IUserProps) => {

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  };

  return <HeaderUser user={user} handleLogout={handleLogout} {...rest} />;
};

export default withRouter(User);
