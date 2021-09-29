import React, { useEffect, useState } from 'react';
import {
  Avatar, Col, Dropdown, Row
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserMenu from './UserMenu';

const time = 5 * 60 * 1000;

interface IHeaderUserProps {
  user?: any,
  handleLogout: any,
  [rest: string]: any
}

const HeaderUser: React.FC<IHeaderUserProps> = ({ user, handleLogout, ...rest }: IHeaderUserProps) => {
  const [data, setData] = useState<any>({});
  setInterval(() => {
    // Ejecutar query verifyLogin
    setData({ checkAuthentication: true })
  }, time);
  // const { companyRelations } = data?.me?.pendingsCount || {};

  // const { checkAuthentication, unix } = data || {};
  const { checkAuthentication } = data || {};

  useEffect(() => {
    if (!checkAuthentication) {
      window.location.reload();
    }
    // eslint-disable-next-line
  }, [checkAuthentication]); // [checkAuthentication, unix]);

  return (
    <Row gutter={8} justify="start">
      <Col span={18}>
        <Dropdown
          overlay={() => <UserMenu handleLogout={handleLogout} {...rest} />}
          placement="bottomRight"
        >
          <div className="custom-header-user">
            <Avatar icon={<UserOutlined />} />
            <span>{user?.firstName}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HeaderUser;
