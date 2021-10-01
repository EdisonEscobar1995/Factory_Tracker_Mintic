import React, { useState } from 'react';
import { LoginForm } from '../Components/Security/Login';
import { Row, Col } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { routeConstants } from '../config/Shared/Constants';
import { IAuthProps, ILoginProps, ILoginValues } from '../Interfaces/Login/login';
import { login } from '../api/login';
import message from '../Components/Shared/message';
import { AxiosResponse } from 'axios';

const Login: React.FC<ILoginProps> = ({ history, setAuthentication }: ILoginProps) => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ILoginValues) => {
    /* const handleSuccess = ({ data }) => {
      setLoading(false);
      const { login } = data;
      if (login?.token?.accessToken) {
        history.push(`${routeConstants.URL_HOME}/_`);
      }
    }; */
    setLoading(true);
    login(values)
    .then((response: AxiosResponse) => {
      const data: IAuthProps = response?.data;
      localStorage.setItem('token', data?.token);
      localStorage.setItem('user', JSON.stringify(data?.user));
      setAuthentication({
        logged: true,
        loading: false,
        user: data?.user
      })
      console.log('type response = ', data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      const error = 'Error de autenticacion';
      message({ type: 'warning', text: error });
      setLoading(false);
    })

    /* client.mutate({ mutation: LOGIN, variables: values })
      .then(handleSuccess)
      .catch(() => setLoading(false)); */
  };
  const { innerHeight: height } = window;

  return (
    <div className="custom-background-login" style={{ height: `${height}px` }}>
      <div className="custom-component-container-login">
        <Row>
          <Col span={24} style={{ padding: '50px' }}>
            <div className="custom-icono-login">
              <ShopOutlined />
              <div className="custom-title-login">Factory Tracker</div>
            </div>
            <LoginForm
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
