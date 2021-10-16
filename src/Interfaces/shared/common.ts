import { ButtonType } from "antd/lib/button";
import { ReactNode } from "react";

export interface MatchParams {
  id?: string;
}

export interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export interface IContainerTitleProps {
  type: string;
  children: ReactNode;
}

export interface IResultTitleProps {
  type: string;
}

export interface IRawContainerProps {
  children: ReactNode;
}

export interface IMessageProps {
  type: string;
  text: string;
  title?: string;
  duration?: number;
}

export interface ITitleProps {
  title: string;
  icon?: ReactNode;
}

export interface ITableProps {
  data?: any;
  titles: any;
  renders?: any;
  actions?: any;
  pagination?: any;
  rowKey: string;
  footer?: any;
  rowSelection?: any;
  handleTable?: any;
  [rest: string]: any;
}

export interface IActtionButtonProps {
  type: ButtonType;
  readonly?: boolean;
  loading?: boolean;
  icon: ReactNode;
  text: string;
  handleClick: ((e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void) | undefined
  confirm?: boolean;
  confirmText?: string;
  className?: string;
  labels?: any;
  [rest: string]: any;
}
