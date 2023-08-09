import React from 'react'

import { Layout } from 'antd'
import SiderMenu from '../SiderMenu'
import MainHeader from '../MainHeader'
// import MainFooter from "../MainFooter"

import './index.less'

const BasicLayout = ({ route, children }) => {
  return (
    <Layout className="main-layout">
      {/* <SiderMenu routes={route.childRoutes} /> */}
      {/* 左侧菜单导航 */}
      <Layout className="main-layout__right">
        <MainHeader />
        <Layout.Content className="main-layout__content">
          {children}
          {/* <MainFooter></MainFooter> */}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
