import React, { useEffect } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { IProductFormProps } from '../../Interfaces/product';

const ProductForm: React.FC<IProductFormProps> = ({
  id,
  product,
  handleCancel
}: IProductFormProps) => {

  const [form] = Form.useForm();

  useEffect(() => {
    let estado = 0;
    if (product?.estado) {
      estado = 1;
    }
    form.setFieldsValue({
      descripcion: product?.descripcion || '',
      valorUnitario: product?.valorUnitario || '',
      estado
    });
  }, []);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      if (id && product) {
        // editar
      } else {
        // handleSubmit(input, setLoading);
      }
    });
  };

  const formFullLayout = {
    labelCol: { xxl: 8, xl: 9 },
    wrapperCol: { xxl: 16, xl: 15 },
  };

  const estados = [{
    id: 1,
    name: 'Disponible'
  }, {
    id: 0,
    name: 'No Disponible'
  }];

  return (
    <Form form={form} onFinish={onSubmit}>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: '¡Campo requerido!' }]}
            {...formFullLayout}
          >
            <Input
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Valor unitario"
            name="valorUnitario"
            rules={[{ required: true, message: '¡Campo requerido!' }]}
            {...formFullLayout}
          >
            <InputNumber
              style={{ width: '90%' }}
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
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
              {estados.map((x, i) => (
                <Select.Option key={`${i}_${x.id}`} value={x.id} title={x.name}>
                  {x.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
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
  );
};

export default ProductForm;
