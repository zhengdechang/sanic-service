import React, { lazy } from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'

const routerConfig = [
  { path: '/dashboard', name: '列表', component: 'dashboard' },
  {
    path: '/system', redirect: '/system/settings', exact: true,
    childRoutes: [
      { path: '/system/settings', name: '设置', component: 'settings' },
    ]
  },
  /* 在上方填写你的页面路由配置 **/
  { path: '/exception/404', name: '页面不存在', component: 'exception/404', exact: true, },
  { path: '/exception/403', name: '没有权限', component: 'exception/403', exact: true, },
  { path: '/exception/500', name: '服务器错误', component: 'exception/500', exact: true, },
  { path: '/', redirect: '/dashboard', exact: true, },
  { path: '*', redirect: '/exception/404', exact: true, },
]

const renderChild = (routerConfig, config = []) => {
  if (!Array.isArray(routerConfig)) {
    return null
  }
  routerConfig.map(item => {
    if (item.childRoutes) {
      config = renderChild(item.childRoutes, config)
    }
    config.push({
      path: item.path,
      name: item.name && item.name,
      exact: item.exact && item.exact,
      redirect: item.redirect && item.redirect,
      component: item.component && lazy(() => import(`@/views/${item.component}`)),
      meta: item.name && { title: item.name },
    })
  })
  return config
}

const config = [
  {
    path: '/login', // 路由路径
    name: '登录', // 菜单名称 (若不设置,则不展示在菜单栏中）
    component: lazy(() => import('@/views/login')), // 懒加载 路由组件
    meta: { title: '登录' },
  },
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/',
        component: BasicLayout, // 基本布局框架
        childRoutes: [
          ...renderChild(routerConfig),
        ],
      },
    ],
  },

]

export default config
