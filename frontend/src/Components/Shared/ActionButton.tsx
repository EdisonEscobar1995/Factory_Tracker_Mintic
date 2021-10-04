import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import { IActtionButtonProps } from '../../Interfaces/shared/common';

const ActionButton: React.FC<IActtionButtonProps> = ({
  type,
  readonly,
  loading,
  icon,
  text,
  handleClick,
  confirm,
  confirmText,
  className,
  labels,
  ...rest
}: IActtionButtonProps) => {
  const { ghost = false, danger = false, block = false } = rest;
  return (
    <Tooltip key={`${type}-${Math.random() * 9999}`} title={text}>
      {confirm && !readonly ? (
        <div>
          <Popconfirm
            placement="bottomRight"
            trigger="click"
            onConfirm={handleClick}
            title={confirmText}
            okText={labels?.common?.yes || 'Si'}
            cancelText={labels?.common?.no || 'No'}
          >
            <Button
              className={`custom-action-button ${className || ''}`}
              key={`${type}-${Math.random() * 9999}`}
              type={type}
              shape="circle"
              icon={icon}
              loading={loading || false}
              ghost={ghost}
              danger={danger}
              block={block}
            />
          </Popconfirm>
        </div>
      ) : (
        <Button
          className={`custom-action-button ${className || ''}`}
          key={`${type}-${Math.random() * 9999}`}
          type={type}
          onClick={handleClick}
          shape="circle"
          icon={icon}
          disabled={readonly}
          loading={loading || false}
        />
      )}
    </Tooltip>
  )
};

export default ActionButton;
