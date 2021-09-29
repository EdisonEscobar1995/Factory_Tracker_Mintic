import instance from './instance';
import { ILoginValues } from '../Interfaces/Login/login';

const login = (data: ILoginValues) => {
    return instance.post('login', data);
};

export {
  login
}
