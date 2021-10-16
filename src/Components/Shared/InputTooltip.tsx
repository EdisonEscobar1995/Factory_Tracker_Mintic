import React, { FC, ReactNode } from 'react';
import { Tooltip } from 'antd';

interface IinputtooltipProps {
  text: string,
  icon: ReactNode,
  [rest: string]: any
}

const InputTooltip: FC<IinputtooltipProps> = ({ text, icon, ...rest }: IinputtooltipProps) => (
  <Tooltip title={text} {...rest}>
    {icon}
  </Tooltip>
);

export default InputTooltip;