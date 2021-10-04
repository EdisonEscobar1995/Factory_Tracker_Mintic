import React from 'react'
import SaleForm from '../../Components/Sales/SaleForm';
import { Container } from '../../Components/Shared';
import { IRegisterSaleProps } from '../../Interfaces/Sale/sale';

const RegisterSale: React.FC<IRegisterSaleProps> = ({ history }: IRegisterSaleProps) => {
  const handleCancel = () => {
    history.push('/sales');
  };
  return (
    <Container>
      <SaleForm
        handleCancel={handleCancel}
      />
    </Container>
  )
}

export default RegisterSale;
