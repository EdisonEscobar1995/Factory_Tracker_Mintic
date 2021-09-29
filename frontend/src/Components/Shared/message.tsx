import { FC } from 'react';
import { Modal } from 'antd';
import { IMessageProps } from '../../Interfaces/shared/common';

const message: FC<IMessageProps> = ({ type = 'info', title = '', text = ''}: IMessageProps) => {
  let modal: any;
  const config = {
    title,
    content: text,
  };

  switch (type) {
    case 'succes':
      modal = Modal.success(config);
      break;
    case 'error':
      modal = Modal.error(config);
        break;
    case 'warning':
      modal = Modal.warning(config);
      break;
    default:
      modal = Modal.info(config);
      break;
  }

  setTimeout(() => modal.destroy(), 5000);
  return null;
};

export default message;