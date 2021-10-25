import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../Shared';

const columns = {
  codigo: 'Código',
  descripcion: 'Descripción',
  valorUnitario: 'Valor unitario',
  estado: 'Estado'
};

interface IProductsListProps {
  loadingRequests?: boolean,
  dataRequests: any,
  handleRequestsTable?: Function,
  handleDelete: Function,
  handleShowEdit: Function,
  showActions: boolean,
}

const ProductsList: React.FC<IProductsListProps> = ({
  dataRequests,
  loadingRequests = false,
  handleRequestsTable,
  handleDelete,
  handleShowEdit,
  showActions
}: IProductsListProps) => {
  
  const renders = [
    {
      key: 'estado',
      render: (text: string, { estado }: any) => estado === 1 ? 'Disponible' : 'No Disponible',
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
          actions={!showActions ? [
            ({ record }: any) => !record.superadmin && (
              <ActionButton
                key='edit'
                icon={<EditOutlined />}
                type='primary'
                text='Editar producto'
                handleClick={() => handleShowEdit(record)}
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
                handleClick={() => handleDelete(record)}
                // handleClick={() => handleShowEdit(record)}
              />
            )
          ] : []}
        />
      </Loading>
    </div>
  );
};

export default ProductsList;
