import React, { useEffect } from 'react';
import { Form, Input, Row, Col, InputNumber } from 'antd';
import { debounce } from 'debounce';
import { IFilterProductsProps } from '../../Interfaces/product';

const FilterProducts: React.FC<IFilterProductsProps> = ({
  filters,
  setFilters
}: IFilterProductsProps) => {

  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      codigo: '',
      descripcion: '',
    });
  }, []);

  const formFullLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const filter = (field: string, e: any) => {
    setFilters({ ...filters, [field]: e });
  };

  return (
    <Form className="form-custom-filter" form={form} layout="vertical">
      <Row gutter={8}>
        <Col span={3}>
          <span>Filtrar por:</span>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Código"
            name="codigo"
            {...formFullLayout}
          >
            <InputNumber
              style={{ width: '90%' }}
              min={0}
              maxLength={25}
              onChange={debounce((e: any) => filter('codigo', e), 600)}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Descripción"
            name="descripcion"
            {...formFullLayout}
          >
            <Input
              maxLength={100}
              onChange={debounce((e: any) => filter('desc', e.target.value), 600)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterProducts;
