import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4';
import { getProductById, updateProduct } from '../../api/product';
import ProductForm from '../../Components/Products/ProductForm';
import { Container, Loading } from '../../Components/Shared';
import message from '../../Components/Shared/message';
import Title from '../../Components/Shared/Title';
import { IProduct, IRegisterProductProps } from '../../Interfaces/product';

const RegisterProduct: React.FC<IRegisterProductProps> = ({ history, match, user }: IRegisterProductProps) => {

  const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = match.params;

  useEffect(() => {
    const getDisabledByRol = () => {
      if (user) {
        const rol = Object.keys(user.rol).find(item => item === 'admin');
        if (!rol) {
          history.push('/products');
        }
      }
    };
    getDisabledByRol();
  }, [user])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await getProductById(id || '');
        if (product) {
          const { codigo, descripcion, valorUnitario, estado } = product;
          setCurrentProduct({
            id,
            estado,
            descripcion,
            valorUnitario,
            codigo
          });
        }
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

  const handleCreate = async (product: IProduct) => {
    try {
      setLoading(true);
      let uid = uuid();
      let mensaje = 'Producto creado con éxito!';
      if (id && currentProduct) {
        uid = id;
        mensaje = 'Producto actualizado con éxito!';
      }
      await updateProduct(product, uid);
      message({ type: 'succes', text: mensaje, duration: 8000 });
      setLoading(false);
      history.push('/products');
    } catch (error) {
      console.log('error = ', error);
      message({ type: 'error', text: 'Error creando el producto!', duration: 8000 });
      setLoading(false);
    }
  };

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
            handleCreate={handleCreate}
          />
        </div>
      </Loading>
    </Container>
  )
}

export default RegisterProduct;
