import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../../Shared';
import { receiveMessageOnPort } from 'worker_threads';

const columns = {
  name: 'Nombre',
  email: 'Correo'
};

interface IUsersListProps {
  loadingRequests?: boolean,
  dataRequests: any,
  handleRequestsTable?: Function,
  handleShowEdit: Function,
}

const UsersList: React.FC<IUsersListProps> = ({
  dataRequests,
  loadingRequests = false,
  handleRequestsTable,
  handleShowEdit
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
            ({ record }: any) => !record.superadmin && (
              <ActionButton
                key='edit'
                icon={<EditOutlined />}
                type='primary'
                text='Editar usuario'
                // handleClick={() => handleView(record.id)}
                handleClick={() => handleShowEdit(record)}
              />
            )
          ]}
        />
      </Loading>
    </div>
  );
};

export default UsersList;
