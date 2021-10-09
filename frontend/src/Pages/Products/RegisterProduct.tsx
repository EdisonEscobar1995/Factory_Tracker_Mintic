import React, { useEffect, useState } from 'react'
import ProductForm from '../../Components/Products/ProductForm';
import { Container, Loading } from '../../Components/Shared';
import message from '../../Components/Shared/message';
import Title from '../../Components/Shared/Title';
import { IProduct, IRegisterProductProps } from '../../Interfaces/product';

const RegisterProduct: React.FC<IRegisterProductProps> = ({ history, match }: IRegisterProductProps) => {

  const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = match.params;
  console.log('id = ', id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error(error);
        message({ type: 'error', text: 'Error cargando el usuario!' });
      }
    };
    if (id) {
      setLoading(true);
      getProduct();
    }
  }, [id]);

  const handleCancel = () => {
    history.push('/products');
  };

  return (
    <Container>
      <Loading loading={loading} custom='custom-component-spin'>
        <div className="custom-sales-container">
          <Title title={currentProduct ? 'Editar producto' : 'Registrar producto'} />
          <ProductForm
            id={currentProduct ? id : undefined}
            product={currentProduct}
            handleCancel={handleCancel}
          />
        </div>
      </Loading>
    </Container>
  )
}

export default RegisterProduct;
