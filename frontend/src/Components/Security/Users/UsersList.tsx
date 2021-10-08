import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../../Shared';

const columns = {
  name: 'Nombre',
  email: 'Correo'
};

interface IUsersListProps {
  loadingRequests?: boolean,
  dataRequests: any,
  handleRequestsTable?: Function,
}

const UsersList: React.FC<IUsersListProps> = ({
  dataRequests,
  loadingRequests = false,
  handleRequestsTable,
}: IUsersListProps) => {
  
  const renders = [
    {
      key: 'name',
      render: (text: string, { displayName }: any) => displayName.toUpperCase(),
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
            ({ record }: any) => (
              <ActionButton
                key='edit'
                icon={<EditOutlined />}
                type='primary'
                text='Editar usuario'
                // handleClick={() => handleView(record.id)}
                handleClick={() => {}}
              />
            ),
            ({ record }: any) => (
              <ActionButton
                key='delete'
                icon={<DeleteOutlined />}
                type='primary'
                danger
                text='Eliminar usuario'
                confirm
                confirmText='¿Está seguro que desea eliminar este usuario?'
                // handleClick={() => { handleFinishIntegration(record.id); }}
                handleClick={() => {}}
              />
            ),
          ]}
        />
      </Loading>
    </div>
  );
};

export default UsersList;
