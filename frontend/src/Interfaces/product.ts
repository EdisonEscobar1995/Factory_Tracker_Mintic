import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "./shared/common";

export interface IProductsProps extends RouteComponentProps<MatchParams> {
}

export interface IRegisterProductProps extends RouteComponentProps<MatchParams> {
  id?: string;
}

export interface IProduct {
  id?: string;
  descripcion: string;
  estado: boolean | number;
  valorUnitario: number;
}

export interface IProductFormProps {
  id?: string;
  product?: IProduct;
  handleCancel: React.MouseEventHandler<HTMLElement> | undefined;
}