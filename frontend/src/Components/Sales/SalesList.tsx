import React from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../Shared';

const columns = {
  valorTotal: 'Valor total',
  nombreCliente: 'Cliente',
  indentificacionCliente: 'Identificación de cliente',
  fechaRegistro: 'Fecha de venta'
};

interface ISalesListProps {
  handleView?: Function,
  handleShowOperator?: Function,
  loadingRequests?: boolean,
  dataRequests: any,
  requestPages?: any,
  handleRequestsTable?: Function,
  handleFinishIntegration?: Function
}

const SalesList: React.FC<ISalesListProps> = ({
  handleView,
  dataRequests,
  handleRequestsTable,
  handleFinishIntegration
}: ISalesListProps) => {
  const renders = [
    {
      key: 'name',
      render: (text: string, { rspp }: any) => `${rspp.gab.name}`,
    },
    {
      key: 'owner',
      render: (text: string, { rspp }: any) => `${rspp.company.name}`
    }
  ];
  return (
    <div>
      <Loading loading={false} custom='custom-component-spin'>
        <Table
          rowKey='rsppId'
          data={(Array.isArray(dataRequests) ? dataRequests : dataRequests?.paginateIntegrations?.items || [])}
          titles={columns}
          renders={renders}
          /* pagination={{
            ...requestPages,
            total: 0,
          }} */
          handleTable={handleRequestsTable}
          widthActions={200}
          actions={[
            ({ record }: any) => (
              <ActionButton
                key='view'
                icon={<EyeOutlined />}
                type='primary'
                text='Ver venta'
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
                text='Eliminar venta'
                confirm
                confirmText='¿Está seguro que desea eliminar esta venta?'
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

export default SalesList;
