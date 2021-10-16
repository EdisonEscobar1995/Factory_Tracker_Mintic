import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ActionButton, Table } from '../Shared';
import ProductSaleForm from './ProductSaleForm';
import message from '../Shared/message';
import { IProduct } from '../../Interfaces/product';
import { estadosLista } from '../../utils/common';

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
  producto: 'Nombre producto',
  cantidad: 'Cantidad',
  valorUnitario: 'Valor unitario',
};

const sorters = {
  cantidad: (a: any, b: any) => a.cantidad - b.cantidad,
  valorUnitario: (a: any, b: any) => a.valorUnitario - b.valorUnitario,
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
    if (sale) {
      console.log('sale = ', sale);
      let fechaVenta;
      if (sale?.fechaVenta) {
        const fecha = new Date(sale.fechaVenta.seconds * 1000 + sale.fechaVenta.nanoseconds/1000000);
        fechaVenta = moment(fecha, 'DD-MM-YYYY HH:mm');
      }
      console.log('form = ', form.getFieldsValue());
      form.setFieldsValue({
        nombreCliente: sale?.nombreCliente || '',
        idCliente: sale?.idCliente || '',
        valorTotal: sale?.valorTotal || '',
        fechaVenta,
        estado: sale.estado || '',
      });
      setProducts(sale?.productos || []);
    }
  }, [sale]);

  useEffect(() => {
    const sumTotal = () => {
      if (products.length > 0) {
        let total = 0;
        products.forEach((prod: any) => {
          total += (prod.cantidad * prod.valorUnitario);
        });
        form.setFieldsValue({
          valorTotal: total
        });
      }
    };
    sumTotal();
  }, [products]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      if (products.length > 0) {
        console.log('values = ', values);
        const dataSale = { ...values, productos: products, fechaVenta: values.fechaVenta.toDate() };
        console.log('dataSale = ', dataSale);
        handleCreateSale(dataSale);
      } else {
        message({ type: 'warning', text: 'Debe seleccionar por lo menos un producto!', duration: 10000 });
      }
    });
  };

  const hanldeCreateProduct = (product: any, setLoading: Function) => {
    setLoading(true);
    const productsAux = [...products];
    const item = products.find((prod: any) => prod.producto === product.producto);
    if (item) {
      message({ type: 'warning', text: 'El producto seleccionado ya se encuentra asociado a la compra!', duration: 6000 });
      setLoading(false);
    } else {
      productsAux.push(product);
      setProducts(productsAux);
      setLoading(false);
      setVisible(false);
    }
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
                disabled={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Estado"
              name="estado"
              rules={[{ required: true, message: '¡Campo requerido!' }]}
              {...formFullLayout}
            >
              <Select
                optionFilterProp="children"
              >
                {estadosLista.map((x, i) => (
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
        {(!id && !sale) && (
          <Row className="custom-buttons-container" gutter={8} justify="end">
            <Col span={4}>
              <Button onClick={handleAddProduct} className="custom-full-width">
                <PlusOutlined />
                Agregar producto
              </Button>
            </Col>
          </Row>
        )}
        {products.length > 0 && (
          <Row gutter={8}>
            <Col span={24}>
              <Table
                rowKey='id'
                data={products}
                titles={columns}
                scroll={{ y: 460 }}
                sorters={sorters}
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
              {(!id && !sale) ? 'Registrar' : 'Actualizar'}
            </Button>
          </Col>
        </Row>
      </Form>
      <ProductSaleForm
        visible={visible}
        title={'Agregar producto'}
        handleCreate={hanldeCreateProduct}
        handleEditUser={() => {}}
        handleCancel={handleCancelProduct}
        isEdit={false}
        listProducts={listProducts}
      />
    </>
  );
};

export default Sales;
