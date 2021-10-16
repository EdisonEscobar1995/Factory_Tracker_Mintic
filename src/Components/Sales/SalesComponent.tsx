import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
  Button, Col, Row
} from 'antd';
import SalesList from './SalesList';
import { Container, Loading } from '../Shared';
import Title from '../Shared/Title';
import { ISale } from '../../Interfaces/Sale/sale';

interface ISalesComponentProps {
  sale?: any;
  dataSales: ISale[] | [];
  loadingRequests: boolean;
  handleCreate?: React.MouseEventHandler<HTMLElement> | undefined;
  handleView: Function;
  handleDelete: Function;
}

const SalesComponent: React.FC<ISalesComponentProps> = ({
  sale,
  dataSales,
  loadingRequests,
  handleCreate,
  handleView,
  handleDelete
}: ISalesComponentProps) => {

  return (
    <Container>
      <div className="custom-sales-container">
        <Title icon={<AppstoreAddOutlined />} title='Ventas' />
        <p className="custom-legend">Registro de ventas realizadas</p>
        <Loading loading={loadingRequests} custom='custom-component-spin'>
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
            dataRequests={dataSales}
            handleView={handleView}
            handleDelete={handleDelete}
          />
        </Loading>
      </div>
    </Container>
  );
};

export default SalesComponent;
