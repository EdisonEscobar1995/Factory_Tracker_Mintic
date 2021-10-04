import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import Title from '../Shared/Title';
import { ActionButton, Table } from '../Shared';

interface ISalesProps {
  handleSubmit?: any;
  handleUpdate?: any;
  handleCancel?: any;
  lists?: any;
  shed?: any;
  edit?: boolean;
}

interface IProductProps {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

const columns = {
  nombre: 'Nombre producto',
  cantidad: 'Cantidad',
  precioUnitario: 'Precio unitario',
};


const Sales: React.FC<ISalesProps> = ({
  handleSubmit,
  handleUpdate,
  handleCancel,
  lists,
  shed,
  edit }: ISalesProps) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductProps[] | []>([]);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      if (edit) {
        // editar
      } else {
        // handleSubmit(input, setLoading);
      }
      setLoading(false);
    });
  };

  const handleAddProduct = () => {
    setProducts([{
      nombre: 'Proucto 1',
      cantidad: 2,
      precioUnitario: 1200
    }])
  };

  const formFullLayout = {
    labelCol: { xxl: 8, xl: 9 },
    wrapperCol: { xxl: 16, xl: 15 },
  };

  const dateVisualization = 'DD-MM-YYYY';

  return (
    <div className="custom-sales-container">
      <Title title={edit ? 'Editar venta' : 'Registrar venta'} />
      <Form form={form} onFinish={onSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Nombre del cliente"
              name="nombreCliente"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <Input
                maxLength={100}
                disabled={edit}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Identificación del cliente"
              name="indentificacionCliente"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <Input
                maxLength={12}
                disabled={edit}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Fecha de venta"
              name="fechaRegistro"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <DatePicker
                className="custom-full-width"
                format={dateVisualization}
                disabledDate={(d) => !d || d.isBefore(moment())}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Valor total"
              name="valorTotal"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <InputNumber
                className="custom-full-width"
                min={0}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="custom-buttons-container" gutter={8} justify="end">
          <Col span={4}>
            <Button onClick={handleAddProduct} className="custom-full-width">
              <PlusOutlined />
              Agregar producto
            </Button>
          </Col>
        </Row>
        {products.length > 0 && (
          <Row gutter={8}>
            <Col span={24}>
              <Table
                rowKey='id'
                data={products}
                titles={columns}
                actions={[
                  ({ record }: any) => (
                  <ActionButton
                    key="edit"
                    type="primary"
                    icon={<EditOutlined />}
                    text="Editar producto"
                    handleClick={() => {}}
                  />
                )]}
              />
            </Col>
          </Row>
        )}
        <Row className="custom-buttons-container" gutter={8} justify="center">
          <Col span={4}>
            <Button onClick={handleCancel} className="custom-full-width">
              Cancelar
            </Button>
          </Col>
          <Col span={4}>
            <Button htmlType="submit" type="primary" className="custom-full-width" loading={loading}>
              {(!shed?.id) ? 'Registrar' : 'Actualizar'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Sales;
