import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ActionButton, Table } from '../Shared';
import ProductSaleForm from './ProductSaleForm';
import message from '../Shared/message';
import { IProduct } from '../../Interfaces/product';

interface ISalesProps {
  handleCreateSale: Function;
  handleCancel?: any;
  lists?: any;
  sale?: any;
  id?: string | undefined;
  disabled?: boolean;
  listProducts: IProduct[] | [];
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
  handleCreateSale,
  handleCancel,
  lists,
  sale,
  id,
  disabled,
  listProducts
}: ISalesProps) => {

  const [form] = Form.useForm();
  const [products, setProducts] = useState<IProductProps[] | []>([]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      codigo: sale?.codigo || '',
      descripcion: sale?.descripcion || '',
      valorUnitario: sale?.valorUnitario || '',
      estado: sale?.estado || ''
    });
  }, [sale]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      if (products.length > 0) {
        console.log('values = ', values);
        handleCreateSale(values);
      } else {
        message({ type: 'warning', text: 'Debe seleccionar por lo menos un producto!', duration: 10000 });
      }
    });
  };

  const handleAddProduct = () => {
    setVisible(true);
    /* setProducts([{
      nombre: 'Proucto 1',
      cantidad: 2,
      precioUnitario: 1200
    }]) */
  };

  const handleCancelProduct = () => {
    setVisible(false);
  };

  const formFullLayout = {
    labelCol: { xxl: 8, xl: 9 },
    wrapperCol: { xxl: 16, xl: 15 },
  };

  const dateVisualization = 'DD-MM-YYYY';

  const estdosLista = [{
    id: 0,
    name: 'En proceso'
  }, {
    id: 1,
    name: 'Cancelada'
  }, {
    id: 2,
    name: 'Entregada'
  }];

  return (
    <>
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
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Identificación del cliente"
              name="idCliente"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <Input
                maxLength={12}
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Fecha de venta"
              name="fechaVenta"
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
              label="Estado"
              name="estado"
              {...formFullLayout}
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
              >
                {estdosLista.map((x, i) => (
                  <Select.Option key={`${i}_${x.id}`} value={x.id} title={x.name}>
                    {x.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Valor total"
              name="valorTotal"
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
            <Button htmlType="submit" type="primary" className="custom-full-width">
              {(!id) ? 'Registrar' : 'Actualizar'}
            </Button>
          </Col>
        </Row>
      </Form>
      <ProductSaleForm
        visible={visible}
        title={'Agregar producto'}
        handleCreate={() => {}}
        handleEditUser={() => {}}
        handleCancel={handleCancelProduct}
        isEdit={false}
        listProducts={listProducts}
      />
    </>
  );
};

export default Sales;
