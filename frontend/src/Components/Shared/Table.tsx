import React from 'react';
import {
  Col, Row, Table as AntTable, ConfigProvider, Empty
} from 'antd';
import locale from 'antd/es/locale/es_ES';
import { ITableProps } from '../../Interfaces/shared/common';

const Table: React.FC<ITableProps> = ({
  data,
  titles,
  renders,
  actions,
  pagination,
  rowKey,
  footer,
  rowSelection,
  handleTable = () => {},
  ...rest
}: ITableProps) => {
  const {
    hiddenPagination, widthActions, expandable = {}, scroll = undefined, sorters = undefined,
  } = rest;

  let columns: any = Object.keys(titles).map((x) => ({
    dataIndex: x,
    key: x,
    title: titles[x],
    sorter: sorters ? sorters[x] : false,
  }));

  if (renders?.length > 0) {
    for (const render of renders) {
      const record = columns.find(({ key }: any) => render.key === key);
      if (record) {
        const index = columns.indexOf(record);
        columns[index] = {
          ...record,
          ...render,
        };
      }
    }
  }

  if (actions) {
    const renderActions = (text: string, record: any) => (
      <div className="custom-table-buttons">
        <Row gutter={8}>
          {actions.map((x: any, index: number) => (
            <Col key={index}>
              {x({
                record,
                text,
              })}
            </Col>
          ))}
        </Row>
      </div>
    );
    columns = columns.concat([
      {
        dataIndex: '',
        key: 'actions',
        render: renderActions,
        title: 'Acciones',
        width: widthActions || 140,
      },
    ]);
  }

  return (
    <ConfigProvider locale={locale} renderEmpty={() => <Empty />}>
      <AntTable
        rowSelection={rowSelection}
        className="custom-table"
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        footer={footer}
        pagination={hiddenPagination ? false : { ...pagination, showSizeChanger: true }}
        onChange={handleTable}
        expandable={expandable}
        scroll={scroll}
      />
    </ConfigProvider>
  );
};

export default Table;
