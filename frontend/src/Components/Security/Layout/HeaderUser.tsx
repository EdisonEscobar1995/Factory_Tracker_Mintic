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
  // const [data, setData] = useState<any>({ checkAuthentication:  verifyLogin() });
  const [data, setData] = useState<any>({ checkAuthentication:  true });
  setInterval(() => {
    // Ejecutar query verifyLogin
    // setData({ checkAuthentication: verifyLogin() })
    setData({ checkAuthentication: true })
  }, time);

  useEffect(() => {
    const { checkAuthentication } = data;
    if (!checkAuthentication) {
      // window.location.reload();
    }
  }, [data]);

  return (
    <Row gutter={8} justify="start">
      <Col span={23}>
        <Dropdown
          overlay={() => <UserMenu handleLogout={handleLogout} {...rest} />}
          placement="bottomRight"
        >
          <div className="custom-header-user">
            <Avatar icon={<UserOutlined />} />
            <span>{(user?.providerData && user?.providerData.length > 0) ? user?.providerData[0].displayName : ''}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HeaderUser;
