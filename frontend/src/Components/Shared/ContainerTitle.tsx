import React from 'react';
import { Col, Row } from 'antd';
import ResultTitle from './ResultTitle';
import { IContainerTitleProps } from '../../Interfaces/shared/common';

const ContainerTitle: React.FC<IContainerTitleProps> = ({ type, children }: IContainerTitleProps) => (
  <Row>
    <Col span={4} className="custom-container-indicator">
      <Row className="custom-container-indicator-title">
        <Col span={24}>
          <ResultTitle type={type} />
        </Col>
      </Row>
    </Col>
    <Col span={20}>{children}</Col>
  </Row>
);

export default ContainerTitle;
