import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Menu, Tooltip } from 'antd';
import Loading from './Loading';

const MenuPrimary = ({
  pathname, menus, data, loading, Link
}) => {
  const [myMenu, setMyMenu] = useState([]);

  console.log('pathname == ', pathname);

  const getMenu = (menus, dataMyMenu) => (menus || []).map((menu) => {
    const dataMenu = (dataMyMenu || []).find(({ index }) => menu.key === index);
    if (dataMenu) {
      menu.submenu = (menu.items || []).reduce((result, { key, ...rest }) => {
        const find = (menus || []).find(({ id }) => key === id);
        if (find) return result.concat([{ ...find, ...rest, key }]);
        return result;
      }, []);
      return menu;
    }
    return { ...menu, path: '' };
  });

  useEffect(() => {
    if (data) {
      setMyMenu(getMenu(menus || [], data || []));
    }
  }, [data]);

  return (
    <Loading loading={loading} custom="custom-component-spin">
      <Menu mode="inline" selectedKeys={[pathname]}>
        {myMenu?.map(
          ({
            path, submenu, icon, label, key, description, replace
          }, index) => (path ? (
            <Menu.Item key={key}>
              <Tooltip placement="right" title={description}>
                {replace ? (
                  <a href={path}>
                    {icon}
                    <span className="nav-text">{label}</span>
                  </a>
                ) : (
                  <Link to={path}>
                    {icon}
                    <span className="nav-text">{label}</span>
                  </Link>
                )}
              </Tooltip>
            </Menu.Item>
          ) : (
            submenu?.length > 0 && (
              <Menu.SubMenu
                key={index}
                title={(
                  <span>
                    {icon}
                    <span>{label}</span>
                  </span>
                )}
              >
                {submenu.map((x) => (
                  <Menu.Item key={x.key} className="custom-menu-item">
                    <Tooltip placement="right" title={x.description}>
                      {x.replace ? (
                        <a href={x.path}>
                          {x.icon}
                          <span className="nav-text">{x.label}</span>
                        </a>
                      ) : (
                        <Link to={x.path}>
                          {x.icon}
                          <span className="nav-text">{x.label}</span>
                        </Link>
                      )}
                    </Tooltip>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          ))
        )}
      </Menu>
    </Loading>
  );
};

MenuPrimary.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  menus: PropTypes.array,
  pathname: PropTypes.string,
  data: PropTypes.array,
  Link: PropTypes.any,
};

export default MenuPrimary;
