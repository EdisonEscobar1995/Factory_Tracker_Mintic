import React, { FC } from 'react';
import { Result } from 'antd';

const NotFound404: FC = () => {

  return (
    <Result
      status="404"
      title="404"
      subTitle={'Página no encontrada! | 404'}
    />
  );
};

export default NotFound404;