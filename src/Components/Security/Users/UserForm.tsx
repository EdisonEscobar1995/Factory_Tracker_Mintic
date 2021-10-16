import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Loading } from '../../Shared';
import { IUserDbProps } from '../../../Interfaces/Login/user';

interface IUserFormProps {
  visible: boolean;
  title: string;
  handleCreate: Function;
  handleEditUser: Function;
  handleCancel: React.MouseEventHandler<HTMLElement> | undefined;
  user?: IUserDbProps | undefined;
  isEdit: boolean;
}

const UserForm: React.FC<IUserFormProps> = ({
  visible,
  title,
  handleCreate,
  handleCancel,
  handleEditUser,
  user,
  isEdit
}: IUserFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        email: user?.email || '',
        name: user?.displayName || '',
        lastName: '',
        password: '',
        roles: Object.keys(user?.roles || {}),
      });
    }
  }, [visible]);

  const onOk = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        const rolesAux: any = {};
        (values.roles || []).forEach((key: string) => {
          rolesAux[key] = true;
        });
        handleEditUser({ ...user, displayName: values.name, roles: rolesAux }, setLoading);
      } else {
        handleCreate(values, setLoading);
      }
    });
  };

  const handleClose = () => {
    form.resetFields();
  };

  const rolesList = [{
    id: 'admin',
    name: 'Administrador'
  }, {
    id: 'seller',
    name: 'Vendedor'
  }];

  const formLayout = {
    labelCol: { xxl: 4, xl: 6 },
    wrapperCol: { xxl: 20, xl: 17 },
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={handleCancel}
      onOk={onOk}
      afterClose={handleClose}
      closable={false}
      maskClosable={false}
      width="70%"
      className="custom-modal-plantsForm"
      forceRender
      centered
    >
      <Form form={form} className="custom-information-container">
        <Loading loading={loading}>
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
              disabled={isEdit}
            />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { message: '¡Nombre requerido!', required: true },
            ]}
            {...formLayout}
          >
            <Input
              placeholder="Nombre"
              maxLength={100}
            />
          </Form.Item>
          {!isEdit && (
            <>
              <Form.Item
                label="Apellido"
                name="lastName"
                {...formLayout}
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
                {...formLayout}
              >
                <Input.Password
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ message: '¡Rol requerido!', required: true }]}
            {...formLayout}
          >
            <Select
              showSearch
              optionFilterProp="children"
              mode="multiple"
            >
              {rolesList.map((x, i) => (
                <Select.Option key={`${i}_${x.id}`} value={x.id} title={x.name}>
                  {x.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Loading>
      </Form>
    </Modal>
  );
};

export default UserForm;
