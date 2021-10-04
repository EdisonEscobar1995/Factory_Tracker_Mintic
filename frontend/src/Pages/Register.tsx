import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { RegisterForm } from '../Components/Security/Login';
import { ILoginValues, IRegisterProps } from '../Interfaces/Login/login';
import { updateDataUser, register } from '../api/login';
import { updateProfile, UserCredential } from 'firebase/auth';
import message from '../Components/Shared/message';

const Register: React.FC<IRegisterProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { innerHeight: height } = window;

  const handleRegister = (values: ILoginValues) => {
    setLoading(true);
    register(values).then((userCredential: UserCredential) => {
      const user = userCredential.user;
      const { name, lastName } = values;
      updateProfile(user, {
        displayName: `${name} ${lastName}`,
      });
      updateDataUser(user, `${name} ${lastName}`).catch((error) => {
        console.log('error update = ', error);
        message({ type: 'warning', text: error });
        setLoading(false);
      });
      setLoading(false);
      history.push('/raw/login');
      message({ type: 'succes', text: 'Usuario creado con éxito' });
    });
  };

  const handleCancel = () => {
    history.push('/raw/login');
  };

  return (
    <div className="custom-background-login" style={{ height: `${height}px` }}>
      <div className="custom-component-container-login">
        <Row>
          <Col span={24} style={{ padding: '5px 50px' }}>
            <div className="custom-icono-login" style={{ fontSize: '75px' }}>
              <ShopOutlined />
              <div className="custom-title-login">Crear usuario</div>
            </div>
            <RegisterForm
              loading={loading}
              handleRegister={handleRegister}
              handleCancel={handleCancel}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
