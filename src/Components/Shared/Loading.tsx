import React, { FC, ReactNode } from 'react';
import { Col, Row, Spin } from 'antd';

interface ILoadingProps {
  loading: boolean,
  children?: ReactNode,
  custom?: string,
}

const timeOut = 400;

const Loading: FC<ILoadingProps> = ({ loading = false, children, custom }: ILoadingProps) => (
  <Row className="custom-loading-row">
    <Col span={24} className="custom-loading-col">
      <Spin spinning={loading} className={custom || 'custom-loading-spin'} delay={timeOut}>
        {children}
      </Spin>
    </Col>
  </Row>
);

export default Loading;