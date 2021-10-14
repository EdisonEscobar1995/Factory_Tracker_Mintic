import React, { useState, useEffect } from 'react';
import { getSales } from '../../api/sale';
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

  return (
    <>
      <SalesComponent
        handleCreate={handleCreate}
        dataSales={dataSales}
        loadingRequests={loading}
      />
    </>
  );
};

export default Sales;
