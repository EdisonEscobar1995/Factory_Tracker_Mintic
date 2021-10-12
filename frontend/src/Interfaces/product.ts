import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "./shared/common";

export interface IProductsProps extends RouteComponentProps<MatchParams> {
}

export interface IRegisterProductProps extends RouteComponentProps<MatchParams> {
  id?: string;
}

export interface IProduct {
  id?: string;
  codigo: number;
  descripcion: string;
  estado: number;
  valorUnitario: number;
}

export interface IProductFormProps {
  id?: string;
  product?: IProduct;
  handleCancel: React.MouseEventHandler<HTMLElement> | undefined;
  handleCreate: Function;
}

export interface IFilterProductsProps {
  setFilters: Function;
  filters: any;
}