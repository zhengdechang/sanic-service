import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Icon, Row } from 'antd'

import './index.less'

const renderMenuItem = (target) => {
  return target
    .filter((item) => item.path && item.name)
    .map((subMenu) => {
      if (
        subMenu.childRoutes &&
        !!subMenu.childRoutes.find((child) => child.path && child.name)
      ) {
        return (
          <Menu.SubMenu
            key={subMenu.path}
            title={
              <div>
                {subMenu.icon && <Icon type={subMenu.icon} />}
                <span>{subMenu.name}</span>
              </div>
            }
          >
            {renderMenuItem(subMenu.childRoutes)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={subMenu.path}>
          <Link to={subMenu.path}>
            <span>
              {subMenu.icon && <Icon type={subMenu.icon} />}
              <span>{subMenu.name}</span>
            </span>
          </Link>
        </Menu.Item>
      )
    })
}

const SiderMenu = ({ routes }) => {
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {
    const list = pathname.split('/').splice(1)
    setOpenKeys(
      list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`)
    )
  }, [])

  const getSelectedKeys = useMemo(() => {
    console.log('getSelectedKeys')
    const list = pathname.split('/').splice(1)
    return list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`)
  }, [pathname])

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed=""
      className="main-left__slider"
    >
      <Link to="/">
        <Row type="flex" align="middle" className="main-left__slider-logo">
          <Icon type="car" style={{ color: '#13e367' }} />
          {/* {!globalStore.collapsed && (
            <span className="main-left__slider-logo-name">
              {globalStore.appTitle}
            </span>
          )} */}
        </Row>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-left__slider-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={getSelectedKeys}
      >
        {renderMenuItem(routes)}
      </Menu>
    </Layout.Sider>
  )
}

export default SiderMenu
