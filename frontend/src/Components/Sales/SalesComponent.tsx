import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
  Button, Col, Row
} from 'antd';
import SalesList from './SalesList';
import { Container } from '../Shared';
import Title from '../Shared/Title';

interface ISalesProps {
  sale?: any;
  handleSubmit?: any;
  handleCreate?: React.MouseEventHandler<HTMLElement> | undefined;
}

const SalesComponent: React.FC<ISalesProps> = ({ sale, handleSubmit, handleCreate }: ISalesProps) => {

  return (
    <Container>
      <div className="custom-sales-container">
        <Title icon={<AppstoreAddOutlined />} title='Ventas' />
        <p className="custom-legend">Registro de ventas realizadas</p>
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
              onClick={handleCreate}
              disabled={false}
            >
              Registrar venta
            </Button>
          </Col>
        </Row>
        <SalesList
          dataRequests={[]}
        />
        {/* <IntegrationForm
          visible={visible}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          searchRspp={searchRspp}
          rspp={rspp}
          lists={lists}
          rsppView={rsppView}
          loading={loading}
          setLoading={setLoading}
          setFiltersRspp={setFiltersRspp}
        /> */}
      </div>
    </Container>
  );
};

export default SalesComponent;
