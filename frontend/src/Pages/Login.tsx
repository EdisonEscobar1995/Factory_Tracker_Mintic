import React, { useState } from 'react';
import { LoginForm } from '../Components/Security/Login';
import { Row, Col } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { ILoginProps, ILoginValues } from '../Interfaces/Login/login';
import { login, auth, loginWithGoogle } from '../api/login';
import message from '../Components/Shared/message';
import { User, UserCredential } from 'firebase/auth';

const Login: React.FC<ILoginProps> = ({ history, setAuthentication }: ILoginProps) => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ILoginValues) => {
    setLoading(true);
    login(values)
    .then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
      const { providerData, uid, email } = user;
      auth.currentUser?.getIdToken().then(
        token => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ providerData, uid, email }));
          setAuthentication({
            logged: true,
            loading: false,
            user
          })
          setLoading(false);
          /* updateDataUser(user).catch((error) => {
            console.log('error update = ', error);
            const errorUp = 'Error de autenticacion actualizando users';
            message({ type: 'warning', text: errorUp });
            localStorage.clear();
            setAuthentication({
              logged: false,
              loading: false,
              user
            });
            setLoading(false);
            window.location.reload();
          }); */
        }
      )
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

  const handleLoginGoogle = () => {
    loginWithGoogle(setAuthentication, setLoading);
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
              handleLoginGoogle={handleLoginGoogle}
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
