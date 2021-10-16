import React, { ReactNode, useEffect, useState } from 'react';
import { Layout as AntLayout, Col, Row } from 'antd';
import User from './User';
import Logo from '../../Shared/Logo';
import { CollapseType } from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';
import MenuPrimary from '../../Shared/MenuPrimary';
import { pathTreatment } from '../../../utils/common';
import { routes } from '../../../config/Security/Routes';
import { IDataMenu } from '../../../Interfaces/menu';
import { getMenus } from '../../../api/menu';

interface ILayoutProps {
  path: string,
  collapsed?: boolean,
  handleCollapse?: (collapsed: boolean, type: CollapseType) => void,
  menus: any[],
  user: any,
  history: any
  children: ReactNode,
}

const Layout: React.FC<ILayoutProps> = ({
  path,
  collapsed,
  handleCollapse,
  menus,
  user,
  history,
  children,
}: ILayoutProps) => {
  const { innerHeight: height } = window;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataMenu, setDataMenu] = useState<IDataMenu[] | [] | undefined>([]);

  useEffect(() => {
    const obtenerMenus = async () => {
      setLoading(true);
      const dataMenus = await getMenus(user);
      setDataMenu(dataMenus);
      setLoading(false);
    };
    obtenerMenus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const foundMenu = (pathname: string): string => {
    const route = routes.find(
      ({ path }) => pathTreatment(path || '') === pathTreatment(pathname)
    );
    if (route) {
      return `${route?.target || ''}`;
    }
    return '';
  };
  
  return (
    <AntLayout className="custom-layout">
      <AntLayout.Header className="custom-header">
        <Row>
          <Col span={4}>
            <Logo />
          </Col>
          <Col offset={15} span={4}>
            <User user={user} />
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
              pathname={path && foundMenu(path)}
              menus={menus}
              data={dataMenu}
              loading={loading}
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
