import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../Shared';
import moment from 'moment';

const columns = {
  fechaVenta: 'Fecha de venta',
  nombreCliente: 'Cliente',
  idCliente: 'Identificación de cliente',
  valorTotal: 'Valor total',
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
      key: 'fechaVenta',
      render: (text: string, { fechaVenta }: any) => {
        const fecha = new Date(fechaVenta.seconds * 1000 + fechaVenta.nanoseconds/1000000);
        console.log('fecha = ', moment(fecha).format("DD-MMM-YYYY"))
        return moment(fecha).format("DD-MM-YYYY");
      },
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
                key='edit'
                icon={<EditOutlined />}
                type='primary'
                text='Editar venta'
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
