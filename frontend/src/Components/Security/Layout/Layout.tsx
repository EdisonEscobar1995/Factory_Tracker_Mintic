import React, { FC, ReactNode } from 'react';
import { Layout as AntLayout, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import User from './User';
import InputTooltip from '../../Shared/InputTooltip';
import Logo from '../../Shared/Logo';
import { CollapseType } from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';
import MenuPrimary from '../../Shared/MenuPrimary';

interface ILayoutProps {
  path: string,
  collapsed?: boolean,
  handleCollapse?: (collapsed: boolean, type: CollapseType) => void,
  menus: any[],
  user: any,
  history: any
  children: ReactNode,
}

const Layout: FC<ILayoutProps> = ({
  path,
  collapsed,
  handleCollapse,
  menus,
  user,
  history,
  children,
}: ILayoutProps) => {
  const { innerHeight: height } = window;
  return (
    <AntLayout className="custom-layout">
      <AntLayout.Header className="custom-header">
        <Row>
          <Col span={4}>
            <Logo />
          </Col>
          <Col offset={17} span={3}>
            <User  />
          </Col>
        </Row>
      </AntLayout.Header>
      <AntLayout.Content>
        <AntLayout className="custom-content-layout">
          <AntLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            className="custom-layout-sider"
          >
            <MenuPrimary
              Link={Link}
              pathname={path}
              menus={menus}
              // data={data}
              // loading={loading}
            />
          </AntLayout.Sider>
          <AntLayout.Content style={{ height: `${height - 70}px` }} className="custom-content">
            {children}
          </AntLayout.Content>
        </AntLayout>
      </AntLayout.Content>
      {/* <AntLayout.Footer>
        <Footer />
      </AntLayout.Footer> */}
    </AntLayout>
  );
};

export default Layout;
