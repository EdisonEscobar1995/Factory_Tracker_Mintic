import { RouteComponentProps } from 'react-router-dom';
import { MatchParams } from '../shared/common';

export interface ILoginProps extends RouteComponentProps<MatchParams> {
  setAuthentication?: any;
}

export interface IRegisterProps extends RouteComponentProps<MatchParams> {
}

export interface ILoginFormProps {
  handleSubmit: Function;
  handleLoginGoogle: React.MouseEventHandler<HTMLElement> | undefined;
  loading: boolean;
}

export interface ILoginValues {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
}

export interface IRol {
  admin?: boolean;
  seller?: boolean;
}
export interface IUser {
  id: string;
  email: string | null;
  displayName: string;
  roles?: IRol | {};
}

export interface IUserDb {
  providerData: string;
  uid: string;
  email: string;
}
export interface IUseAuthenticationProps {
  loading: boolean;
  logged: boolean;
  user: IUserDb | undefined;
}
