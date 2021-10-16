import React from 'react';
import { Col, Row } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const Information: React.FC = () => {
  return (
    <div className="custom-container-home">
      <Row justify="center">
        <Col span={22}>
          <h2>Factory Tracker</h2>
        </Col>
        <Col span={20}>
          <Row gutter={8}>
            <Col span={22}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, qui debitis! Fuga perferendis esse assumenda voluptatibus amet ducimus debitis blanditiis vitae minima! Neque iste ipsum tempora consequuntur sit rerum quisquam!
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Information;
