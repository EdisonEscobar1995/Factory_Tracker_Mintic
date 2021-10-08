import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from '../shared/common';
import { IRol } from "./login";

export interface IUserProps extends RouteComponentProps<MatchParams> {
  user?: any,
  [rest: string]: any
}

export interface IUsersProps extends RouteComponentProps<MatchParams> {
  user?: any,
}

export interface IUserDbProps {
  id?: string;
  displayName: string;
  email: string;
  roles: IRol;
}
