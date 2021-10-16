import React from 'react';
import { Row, Col } from 'antd';
import { ITitleProps } from '../../Interfaces/shared/common';

const Title: React.FC<ITitleProps> = ({ title, icon }: ITitleProps) => (
  <Row className="custom-title-border">
    <Col span={23}>
      <h3 className="custom-title-content">{title}</h3>
    </Col>
    <Col span={1}>
      {icon}
    </Col>
  </Row>
);

export default Title;
