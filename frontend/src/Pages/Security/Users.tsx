import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { Container } from '../../Components/Shared';
import Title from '../../Components/Shared/Title';
import { UserForm, UsersList } from '../../Components/Security/Users';
import { IUserDbProps, IUsersProps } from '../../Interfaces/Login/user';
import { getUsers } from '../../api/user';
import { register, updateDataUser } from '../../api/login';
import { updateProfile } from 'firebase/auth';
import message from '../../Components/Shared/message';
import { IRol } from '../../Interfaces/Login/login';

const Users: React.FC<IUsersProps> = ({ history }: IUsersProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IUserDbProps[] | []>([]);

  const ordenarLista = (list: any) => {
    return list.sort((a: any, b: any) => (a.displayName > b.displayName) ? 1 : -1);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsers();
        setData(ordenarLista(response));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleView = () => {
    setVisible(true);
  };

  const handleCreate = async (values: any, setLoadingForm: Function) => {
    console.log(values);
    try {
      setLoadingForm(true);
      const { email, password, name, lastName, roles } = values;
      const userCredential = await register({ email, password });
      const user = userCredential.user;
      updateProfile(user, {
        displayName: `${name} ${lastName}`,
      });
      await updateDataUser(user, `${name} ${lastName}`);
      const rolesAux: any = {};
      roles.forEach((role: string) => {
        rolesAux[role] = true
      });
      const dataAux = [...data, {
        id: user.uid,
        displayName: `${name} ${lastName}`,
        email,
        roles: rolesAux
      }];
      setData(ordenarLista(dataAux));
      setLoadingForm(false);
      handleCancel();
      message({ type: 'succes', text: 'Usuario creado con éxito!', duration: 10000 });
    } catch (error) {
      console.error(error);
      setLoadingForm(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Container>
      <div className="custom-sales-container">
        <Title icon={<UsergroupDeleteOutlined />} title='Usuarios' />
        <p className="custom-legend">Usuarios del sistema</p>
        <Row
          className="custom-buttons-container"
          gutter={8}
          justify="end"
        >
          <Col span={7}>
            <Button
              htmlType="submit"
              type="primary"
              className="custom-full-width"
              onClick={handleView}
              disabled={false}
            >
              Crear usuario
            </Button>
          </Col>
        </Row>
        <UsersList
          dataRequests={data || []}
          loadingRequests={loading}
        />
        <UserForm
          visible={visible}
          title={'Crear usuario'}
          handleCreate={handleCreate}
          handleCancel={handleCancel}
        />
      </div>
    </Container>
  );
};

export default Users;
