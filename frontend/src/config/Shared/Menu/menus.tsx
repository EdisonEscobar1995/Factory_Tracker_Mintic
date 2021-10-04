import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createMenu } from '../../../utils/common';

const menus = () => ({
  header: [],
  primary: [
    createMenu('Inicio', '/home', <HomeOutlined className="custom-menu-icon" />, 'home', true),
    // createMenu('Usuarios', '/users', <HomeOutlined className="custom-menu-icon" />, 'home', true),
    createMenu('Ventas', '/sales', <UserOutlined className="custom-menu-icon" />, 'sales', true),
  ],
});

export default menus;
