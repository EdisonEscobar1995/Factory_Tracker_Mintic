import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

export interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
type MenuClickEventHandler = (info: MenuInfo) => void;

interface IUserMenu {
  handleLogout: MenuClickEventHandler,
  [rest: string]: any
}

interface IMenuProps {
  path: string,
  index: string,
  icon: any,
  title: string
}

const UserMenu: React.FC<IUserMenu> = ({ handleLogout, ...rest }: IUserMenu) => {
  const { menus, history } = rest;
  return (
    <Menu>
      {menus?.map(({
        path, index, icon, title
      }: IMenuProps) => (
        <Menu.Item key={index} onClick={() => history.push(path)}>
          {/* {icon && <Icon type={icon} />} */}
          {icon}
          {title}
        </Menu.Item>
      ))}
      <Menu.Item key={-1} onClick={handleLogout}>
        <LogoutOutlined />
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
