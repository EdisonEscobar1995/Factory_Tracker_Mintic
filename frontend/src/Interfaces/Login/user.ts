import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from '../shared/common';

export interface IUserProps extends RouteComponentProps<MatchParams> {
  user?: any,
  [rest: string]: any
}
