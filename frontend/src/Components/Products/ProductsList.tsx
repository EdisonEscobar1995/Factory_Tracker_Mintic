import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../Shared';

const columns = {
  descripcion: 'Descripción',
  valorUnitario: 'Valor unitario',
  estado: 'Estado'
};

interface IProductsListProps {
  loadingRequests?: boolean,
  dataRequests: any,
  handleRequestsTable?: Function,
  handleShowEdit?: Function,
}

const ProductsList: React.FC<IProductsListProps> = ({
  dataRequests,
  loadingRequests = false,
  handleRequestsTable,
  handleShowEdit
}: IProductsListProps) => {
  
  const renders = [
    {
      key: 'estado',
      render: (text: string, { estado }: any) => estado ? 'Disponible' : 'No Disponible',
    }
  ];

  return (
    <div>
      <Loading loading={loadingRequests} custom='custom-component-spin'>
        <Table
          rowKey='id'
          data={(Array.isArray(dataRequests) ? dataRequests : [])}
          titles={columns}
          renders={renders}
          handleTable={handleRequestsTable}
          widthActions={200}
          actions={[
            ({ record }: any) => !record.superadmin && (
              <ActionButton
                key='edit'
                icon={<EditOutlined />}
                type='primary'
                text='Editar producto'
                handleClick={() => {}}
                // handleClick={() => handleShowEdit(record)}
              />
            ),
            ({ record }: any) => !record.superadmin && (
              <ActionButton
                key='delete'
                icon={<DeleteOutlined />}
                type='primary'
                danger
                text='Eliminar producto'
                confirm
                confirmText='¿Está seguro que desea eliminar este producto?'
                handleClick={() => {}}
                // handleClick={() => handleShowEdit(record)}
              />
            )
          ]}
        />
      </Loading>
    </div>
  );
};

export default ProductsList;
