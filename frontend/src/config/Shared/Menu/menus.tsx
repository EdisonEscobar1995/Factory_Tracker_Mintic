import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createMenu } from '../../../utils/common';

const menus = () => ({
  header: [],
  primary: [
    createMenu('Inicio', '/home/$[{companyId}]', <HomeOutlined className="custom-menu-icon" />, 'home', true),
    createMenu('Ventas', '/profile/$[{companyId}]', <UserOutlined className="custom-menu-icon" />, 'profile', true),
  ],
});

export default menus;
