import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "../shared/common";

export interface ILoginProps extends RouteComponentProps<MatchParams> {
  setAuthentication?: any
}

export interface ILoginFormProps {
  handleSubmit: Function,
  loading: boolean,
}

export interface ILoginValues {
  email: string,
  password: string,
}

export interface IUser {
  _id: string,
  email: string,
  password: string,
  status: boolean,
  roles?: any[],
  createdOn?: any,
  __v?: number
}
export interface IAuthProps {
  auth: true,
  token: string,
  user: IUser
}

export interface IUseAuthenticationProps {
  loading: boolean,
  logged: boolean,
  user: IUser | undefined,
}
