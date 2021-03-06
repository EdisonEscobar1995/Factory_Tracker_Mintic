import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col, Form, Input, Row
} from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { routeConstants } from '../../../config/Shared/Constants';
import { Loading } from '../../Shared';
import { ILoginFormProps, ILoginValues } from '../../../Interfaces/Login/login';

const LoginForm: React.FC<ILoginFormProps> = ({ handleSubmit, handleLoginGoogle, loading }: ILoginFormProps) => {
  const [form] = Form.useForm();

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  /* const onFinishFailed = ({ values, errorFields }) => {
    if (!validateSubmit(errorFields)) {
      handleSubmit(values);
    }
  }; */

  const onFinish = (values: ILoginValues) => {
    handleSubmit(values);
  };

  return (
    <Form
      className="custom-login-form"
      initialValues={{ type: 0 }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      form={form}
      layout="vertical"
    >
      <Loading loading={loading}>
        <div className="custom-login-fields">
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              { message: '¡Correo requerido!', required: true, type: 'email' },
            ]}
            {...formLayout}
          >
            <Input
              placeholder="Correo"
              maxLength={100}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ message: '¡Contraseña requerida!', required: true }]}
            {...formLayout}
          >
            <Input.Password
              placeholder="Contraseña"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </div>
        <Row justify={'center'}>
          <Col span={10}>
            <Button
              type="primary"
              htmlType="submit"
              className="custom-full-width"
            >
              Ingresar
            </Button>
          </Col>
        </Row>
        <Row className="custom-register-helper">
          <Col offset={4} span={20}>
            <span style={{ marginRight: '5px' }}>
              <b>¿Aún no tienes una cuenta?</b>
            </span>
            <b>
              <Link
                to={`${routeConstants.URL_WITHOUT_LAYOUT}${routeConstants.URL_REGISTER}`}
                className="custom-login-register"
              >
                Crear cuenta
              </Link>
            </b>
          </Col>
        </Row>
        <Row className="custom-register-helper">
          <Col span={24}>
            <Button
              type="primary"
              danger
              className="custom-full-width"
              onClick={handleLoginGoogle}
            >
              <GoogleOutlined />
              Ingrese con Google
            </Button>
          </Col>
        </Row>
      </Loading>
    </Form>
  );
};

export default LoginForm;
