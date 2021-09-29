import React from 'react';
import {
  GoldOutlined, InfoCircleFilled, KeyOutlined, LockOutlined, MailOutlined, TeamOutlined,
} from '@ant-design/icons';
import login from '../../img/logo192.png';
import { IResultTitleProps } from '../../Interfaces/shared/common';

const ResultTitle: React.FC<IResultTitleProps> = ({ type }: IResultTitleProps) => {
  switch (type) {
    case 'register':
      return (
        <div className="custom-register-activation">
          <span>
            <MailOutlined />
            <p>{('register.accountActivation')}</p>
          </span>
        </div>
      );
    case 'login':
      return <img src={login} alt="ICA login" className="custom-login-img" />;
    case 'forgotPassword':
    case 'reset':
      return (
        <div className="custom-title-text">
          <span>
            <KeyOutlined />
            <p>{('forgotPassword.title')}</p>
          </span>
        </div>
      );
    case 'activate':
      return (
        <div className="custom-title-text">
          <span>
            <LockOutlined />
            <p>{('activate.title')}</p>
          </span>
        </div>
      );
    case 'home':
      return (
        <div className="custom-home-info">
          <InfoCircleFilled />
          <br />
          <h3>{('common.information')}</h3>
        </div>
      );
    case 'users':
      return (
        <div className="custom-users">
          <TeamOutlined />
          <p>{('user.title')}</p>
        </div>
      );
    case 'checkout-result':
      return (
        <div className="custom-checkout-title">
          <span>
            <GoldOutlined />
            <p>{('checkout.checkoutResult')}</p>
          </span>
        </div>
      );
    default:
      return <div />;
  }
};

export default ResultTitle;
