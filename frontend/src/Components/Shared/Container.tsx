import React from 'react';
import { IContainerProps } from '../../Interfaces/shared/common';

const Container: React.FC<IContainerProps> = ({ children, className }: IContainerProps) => (
  <div className={`custom-component-container ${className}`}>{children}</div>
);

export default Container;