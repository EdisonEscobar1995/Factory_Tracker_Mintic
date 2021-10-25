import React, { useState } from 'react';
import { LoginForm } from '../Components/Security/Login';
import { Row, Col } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { ILoginProps, ILoginValues } from '../Interfaces/Login/login';
import { login, loginWithGoogle } from '../api/login';
import message from '../Components/Shared/message';
import { updateProfile, User, UserCredential } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { getUserById } from '../api/user';

const Login: React.FC<ILoginProps> = ({ history, setAuthentication }: ILoginProps) => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ILoginValues) => {
    setLoading(true);
    login(values)
    .then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
      const { providerData, uid, email } = user;
      auth.currentUser?.getIdToken().then(
        async (token) => {
          localStorage.setItem('token', token);
          const userDb = await getUserById(uid)
          localStorage.setItem('user', JSON.stringify({ providerData, uid, email, rol: userDb?.roles }));
          setAuthentication({
            logged: true,
            loading: false,
            user
          })
          setLoading(false);
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
