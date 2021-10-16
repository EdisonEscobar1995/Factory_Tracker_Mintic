import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionButton, Loading, Table } from '../Shared';
import moment from 'moment';
import { estadosLista } from '../../utils/common';

const columns = {
  fechaVenta: 'Fecha de venta',
  nombreCliente: 'Cliente',
  idCliente: 'Identificación de cliente',
  valorTotal: 'Valor total',
  estado: 'Estado'
};

interface ISalesListProps {
  handleView: Function;
  loadingRequests?: boolean;
  dataRequests: any;
  requestPages?: any;
  handleRequestsTable?: Function;
  handleDelete: Function;
}

const SalesList: React.FC<ISalesListProps> = ({
  handleView,
  dataRequests,
  handleRequestsTable,
  handleDelete
}: ISalesListProps) => {
  const renders = [
    {
      key: 'fechaVenta',
      render: (text: string, { fechaVenta }: any) => {
        const fecha = new Date(fechaVenta.seconds * 1000 + fechaVenta.nanoseconds/1000000);
        return moment(fecha).format("DD-MM-YYYY HH:mm");
      },
    },
    {
      key: 'estado',
      render: (text: string, { estado }: any) => {
        const estadoA: any = estadosLista.find((e: any) => e.id === estado);
        return (<span style={{ color: '#fff', padding: '3px 6px', background: estadoA.color }}>{estadoA.name}</span>);
      },
    }
  ];
  return (
    <div>
      <Loading loading={false} custom='custom-component-spin'>
        <Table
          rowKey='id'
          data={(Array.isArray(dataRequests) ? dataRequests : dataRequests?.paginateIntegrations?.items || [])}
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
                text='Editar venta'
                handleClick={() => handleView(record.id)}
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
                handleClick={() => { handleDelete(record.id); }}
              />
            ),
          ]}
        />
      </Loading>
    </div>
  );
};

export default SalesList;
