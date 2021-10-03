import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Loading } from '../../Shared';
import { ILoginValues } from '../../../Interfaces/Login/login';

interface IRegisterFormProps {
  loading: boolean;
  handleRegister: Function;
  handleCancel: React.MouseEventHandler<HTMLElement> | undefined;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ loading, handleRegister, handleCancel }: IRegisterFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: ILoginValues) => {
    console.log('values = ', values);
    // handleRegister(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="custom-information-container"
      onFinish={onFinish}
    >
      <Loading loading={loading}>
        <div className="custom-login-fields">
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              { message: '¡Correo requerido!', required: true, type: 'email' },
            ]}
          >
            <Input
              placeholder="Correo"
              maxLength={100}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="firstName"
            rules={[
              { message: '¡Nombre requerido!', required: true },
            ]}
          >
            <Input
              placeholder="Nombre"
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[
              { message: '¡Apellido requerido!', required: true },
            ]}
          >
            <Input
              placeholder="Apellido"
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ message: '¡Contraseña requerida!', required: true }]}
          >
            <Input.Password
              placeholder="Contraseña"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </div>
        <Row justify={'space-between'} className="custom-register-helper" style={{ marginBottom: '25px' }}>
          <Col span={11}>
            <Button
              type="primary"
              htmlType="submit"
              className="custom-full-width"
            >
              Registrar
            </Button>
          </Col>
          <Col span={11}>
            <Button
              type="ghost"
              className="custom-full-width"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Loading>
    </Form>
  );
};

export default RegisterForm;
