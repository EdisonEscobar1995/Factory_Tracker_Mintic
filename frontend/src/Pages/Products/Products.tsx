import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { Container } from '../../Components/Shared';
import Title from '../../Components/Shared/Title';
import message from '../../Components/Shared/message';
import { IProduct, IProductsProps } from '../../Interfaces/product';
import { deleteProduct, getProducts } from '../../api/product';
import { ProductsList } from '../../Components/Products';
import { ordenarLista } from '../../utils/common';

const Products: React.FC<IProductsProps> = ({ history }: IProductsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<IProduct[] | []>([]);
  // const [userEdit, setUserEdit] = useState<IUserDbProps | undefined>();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setData(ordenarLista(response, 'descripcion'));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleShowEdit = ({ id }: IProduct) => {
    history.push(`/product/${id}`);
  };

  const handleDelete = async ({ id }: IProduct) => {
    try {
      setLoading(true);
      await deleteProduct(id || '');
      const dataAux = data.filter((p: IProduct) => p.id !== id);
      setLoading(false);
      message({ type: 'error', text: 'Producto eliminado con éxito!' });
      setData(dataAux);
    } catch (error) {
      message({ type: 'error', text: 'Error eliminando el producto!', duration: 6000 });
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="custom-sales-container">
        <Title icon={<UsergroupDeleteOutlined />} title='Productos' />
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
              onClick={() => history.push('/product')}
              disabled={false}
            >
              Crear producto
            </Button>
          </Col>
        </Row>
        <ProductsList
          dataRequests={data || []}
          loadingRequests={loading}
          handleShowEdit={handleShowEdit}
          handleDelete={handleDelete}
        />
      </div>
    </Container>
  );
};

export default Products;
