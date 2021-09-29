import { ReactNode } from "react";

export interface MatchParams {
  id?: string,
  company?: string
}

export interface IContainerProps {
  children: ReactNode,
  className?: string
}

export interface IContainerTitleProps {
  type: string,
  children: ReactNode,
}

export interface IResultTitleProps {
  type: string,
}

export interface IRawContainerProps {
  children: ReactNode,
}

export interface IMessageProps {
  type: string,
  text: string,
  title?: string,
}
