import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { RegisterForm } from '../Components/Security/Login';
import { ILoginValues, IRegisterProps } from '../Interfaces/Login/login';

const Register: React.FC<IRegisterProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { innerHeight: height } = window;

  const handleRegister = (values: ILoginValues) => {

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
