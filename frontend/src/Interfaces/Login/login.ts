import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "../shared/common";

export interface ILoginProps extends RouteComponentProps<MatchParams> {
}

export interface ILoginFormProps {
  handleSubmit: Function,
  loading: boolean,
}

export interface ILoginValues {
  email: string,
  password: string,
}