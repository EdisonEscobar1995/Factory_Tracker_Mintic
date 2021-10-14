import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4';
import { getProducts } from '../../api/product';
import { getSaleById, setSale } from '../../api/sale';
import SaleForm from '../../Components/Sales/SaleForm';
import { Container, Loading } from '../../Components/Shared';
import message from '../../Components/Shared/message';
import Title from '../../Components/Shared/Title';
import { IProduct } from '../../Interfaces/product';
import { IRegisterSaleProps, ISale } from '../../Interfaces/Sale/sale';

const RegisterSale: React.FC<IRegisterSaleProps> = ({ history, match }: IRegisterSaleProps) => {

  const [currentSale, setCurrentSale] = useState<ISale | undefined>(undefined);
  const [listProducts, setListProducts] = useState<IProduct[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = match.params;

  useEffect(() => {
    const getListProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setListProducts(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        message({ type: 'error', text: 'Error cargando los productos!' });
      }
    };
    getListProducts();
  }, [])

  useEffect(() => {
    const getSale = async () => {
      try {
        const sale = await getSaleById(id || '');
        if (sale) {
          const { estado, fechaVenta, nombreCliente, idCliente, valorTotal, productos } = sale;
          setCurrentSale({
            estado,
            fechaVenta,
            idCliente,
            nombreCliente,
            valorTotal,
            productos
          });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        message({ type: 'error', text: 'Error cargando la venta!' });
      }
    };
    if (id) {
      setLoading(true);
      getSale();
    }
  }, [id]);

  const handleCreateSale = async (sale: ISale) => {
    try {
      setLoading(true);
      let uid = uuid();
      let mensaje = 'Venta creada con éxito!';
      if (id && currentSale) {
        uid = id;
        mensaje = 'Venta actualizada con éxito!';
      }
      await setSale(sale, uid);
      message({ type: 'succes', text: mensaje, duration: 8000 });
      setLoading(false);
      history.push('/sales');
    } catch (error) {
      console.log('error = ', error);
      message({ type: 'error', text: 'Error creando la venta!', duration: 8000 });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.push('/sales');
  };

  return (
    <Container>
      <div className="custom-sales-container">
        <Loading loading={loading} custom='custom-component-spin'>
          <Title title={currentSale ? 'Editar venta' : 'Registrar venta'} />
          <SaleForm
            id={currentSale ? id : undefined}
            handleCancel={handleCancel}
            handleCreateSale={handleCreateSale}
            disabled={(currentSale && id) ? true : false}
            listProducts={listProducts}
          />
        </Loading>
      </div>

    </Container>
  )
}

export default RegisterSale;
