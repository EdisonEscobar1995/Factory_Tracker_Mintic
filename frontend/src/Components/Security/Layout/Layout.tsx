import React, { FC } from 'react';
import { Layout as AntLayout, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import User from './User';
import InputTooltip from '../../Shared/InputTooltip';
import Logo from '../../Shared/Logo';

interface ILayoutProps {
  path: string,
  collapsed?: boolean,
  handleCollapse?: Function,
  headerMenus: string[],
  user: any,
  history: any
}

const Layout: FC<ILayoutProps> = ({
  path,
  headerMenus,
  user,
  history
}: ILayoutProps) => {
  
  return (
    <AntLayout className="custom-layout">
      <AntLayout.Header className="custom-header">
        <Row>
          <Col span={4}>
            <Logo />
          </Col>
          <Col span={2}>
            <InputTooltip
              icon={<InfoCircleOutlined style={{ color: '#ffffff', margin: '8px' }} />}
              text={'company.selectCompany'}
              className="custom-tooltip"
            />
          </Col>
          <Col span={4}>
            <User  />
          </Col>
        </Row>
      </AntLayout.Header>
      {/* <AntLayout.Footer>
        <Footer />
      </AntLayout.Footer> */}
    </AntLayout>
  );
};

export default Layout;
