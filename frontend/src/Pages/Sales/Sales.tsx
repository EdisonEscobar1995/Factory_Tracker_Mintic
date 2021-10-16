import React, { useState, useEffect } from 'react';
import { deleteSale, getSales } from '../../api/sale';
import { SalesComponent } from '../../Components/Sales';
import message from '../../Components/Shared/message';
import { ISale, ISalesProps } from '../../Interfaces/Sale/sale';

const Sales: React.FC<ISalesProps> = ({ history }: ISalesProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [dataSales, setDataSales] = useState<ISale[] | []>([]);

  useEffect(() => {
    const getDataSales = async () => {
      try {
        setLoading(true);
        const result = await getSales();
        console.log('result = ', result);
        console.log('result fecha = ', result[0].fechaVenta);
        setDataSales(result);
        setLoading(false);
      } catch (error) {
        console.log('error getVentas = ', error);
        setLoading(false);
        message({ type: 'error', text: 'Error cargando las ventas!' });
      }
    };
    getDataSales();
  }, [])


  const handleCreate = () => {
    history.push('registerSale');
  };

  const handleView = (id: string) => {
    if (id) {
      history.push(`registerSale/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      debugger;
      setLoading(true);
      await deleteSale(id || '');
      const dataAux = dataSales.filter((p: ISale) => p.id !== id);
      setLoading(false);
      message({ type: 'succes', text: 'Venta eliminada con éxito!' });
      setDataSales(dataAux);
    } catch (error) {
      console.log('error == ', error);
      message({ type: 'error', text: 'Error eliminando la venta!', duration: 6000 });
      setLoading(false);
    }
  };

  return (
    <>
      <SalesComponent
        handleCreate={handleCreate}
        dataSales={dataSales}
        loadingRequests={loading}
        handleView={handleView}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Sales;
