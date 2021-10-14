import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Modal, Select } from 'antd';
import { Loading } from '../Shared';
import { IProduct } from '../../Interfaces/product';

interface IProductSaleFormProps {
  visible: boolean;
  title: string;
  handleCreate: Function;
  handleEditUser: Function;
  handleCancel: React.MouseEventHandler<HTMLElement> | undefined;
  product?: any;
  isEdit: boolean;
  listProducts: IProduct[] | [];
}

const ProductSaleForm: React.FC<IProductSaleFormProps> = ({
  visible,
  title,
  handleCreate,
  handleCancel,
  handleEditUser,
  product,
  isEdit,
  listProducts
}: IProductSaleFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        producto: product?.producto || '',
        valorUnitario: product?.valorUnitario || 0,
        cantidad: product?.cantidad || ''
      });
    }
  }, [visible]);

  const onOk = () => {
    form.validateFields().then((values) => {
      /* if (isEdit) {
        const rolesAux: any = {};
        (values.roles || []).forEach((key: string) => {
          rolesAux[key] = true;
        });
        handleEditUser({ ...product, displayName: values.name, roles: rolesAux }, setLoading);
      } else {
        handleCreate(values, setLoading);
      } */
    });
  };

  const handleClose = () => {
    form.resetFields();
  };

  const handleChangeProduct = (value: string) => {
    console.log(value);
    const item = listProducts.find((prod: IProduct) => prod.descripcion === value);
    let valorU = 0;
    if (item) {
      valorU = item.valorUnitario;
    }
    form.setFieldsValue({
      valorUnitario: valorU
    });
  };

  const formLayout = {
    labelCol: { xxl: 4, xl: 6 },
    wrapperCol: { xxl: 20, xl: 17 },
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={handleCancel}
      onOk={onOk}
      afterClose={handleClose}
      closable={false}
      maskClosable={false}
      width="70%"
      className="custom-modal-plantsForm"
      forceRender
      centered
    >
      <Form form={form} className="custom-information-container">
        <Loading loading={loading}>
          <Form.Item
            label="Producto"
            name="producto"
            rules={[{ message: '¡Producto requerido!', required: true }]}
            {...formLayout}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              onChange={handleChangeProduct}
            >
              {(listProducts || []).map((x, i) => (
                <Select.Option key={`${i}_${x.id}`} value={x.descripcion} title={x.descripcion}>
                  {x.descripcion}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Valor unitario"
            name="valorUnitario"
            rules={[
              { message: '¡Valor unitario requerido!', required: true },
            ]}
            {...formLayout}
          >
            <InputNumber
              style={{ width: '50%' }}
              placeholder="Valor unitario"
              min={0}
              maxLength={100}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[
              { message: '¡Cantidad requerido!', required: true },
            ]}
            {...formLayout}
          >
            <InputNumber
              style={{ width: '50%' }}
              placeholder="Cantidad"
              min={0}
              maxLength={100}
            />
          </Form.Item>
          
        </Loading>
      </Form>
    </Modal>
  );
};

export default ProductSaleForm;
