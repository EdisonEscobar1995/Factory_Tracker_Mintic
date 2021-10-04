import React from 'react';
import { SalesComponent } from '../../Components/Sales';
import { ISalesProps } from '../../Interfaces/Sale/sale';

const Sales: React.FC<ISalesProps> = ({ history }: ISalesProps) => {
  const handleCreate = () => {
    history.push('registerSale/_');
  };

  return (
    <>
      <SalesComponent
        handleCreate={handleCreate}
      />
    </>
  );
};

export default Sales;
