import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "../shared/common";

export interface ISalesProps extends RouteComponentProps<MatchParams> {
  user?: any,
  [rest: string]: any
}

export interface IRegisterSaleProps extends RouteComponentProps<MatchParams> {
}

export interface ISale {
  id?: string;
  estado: number;
  fechaVenta: any;
  idCliente: string;
  nombreCliente: string;
  valorTotal: number;
  productos: any[];
}
