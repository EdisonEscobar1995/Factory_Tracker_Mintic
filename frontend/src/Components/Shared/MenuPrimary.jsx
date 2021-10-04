import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Menu, Tooltip } from 'antd';
import Loading from './Loading';

const MenuPrimary = ({
  pathname, menus, globalScope, loading, Link
}) => {
  const { companyId } = globalScope || {};
  const [myMenu, setMyMenu] = useState([]);

  console.log('pathname == ', pathname);

  const getMenu = (dataMyMenu) => (dataMyMenu || []).map((menu) => {
    menu.submenu = (menu.items || []).reduce((result, { key, ...rest }) => {
      const find = (dataMyMenu || []).find(({ id }) => key === id);
      if (find) return result.concat([{ ...find, ...rest, key }]);
      return result;
    }, []);
    return menu;
  });

  useEffect(() => {
    if (menus) {
      setMyMenu(getMenu(menus || []));
    }
  }, [menus]);

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
                  <a href={path.replace('$[{companyId}]', companyId || '_')}>
                    {icon}
                    <span className="nav-text">{label}</span>
                  </a>
                ) : (
                  <Link to={path.replace('$[{companyId}]', companyId || '_')}>
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
                        <a href={x.path.replace('$[{companyId}]', companyId || '_')}>
                          {x.icon}
                          <span className="nav-text">{x.label}</span>
                        </a>
                      ) : (
                        <Link to={x.path.replace('$[{companyId}]', companyId || '_')}>
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
  globalScope: PropTypes.object,
  data: PropTypes.object,
  Link: PropTypes.any,
};

export default MenuPrimary;
