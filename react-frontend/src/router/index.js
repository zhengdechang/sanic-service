/* eslint-disable import/extensions */
import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nprogress from '@/components/nprogress'
import config from './config'
import getPageTitle from '@/utils/get-page-title'

import { useTranslation } from 'react-i18next'
import { useAccessStore } from '@/store'

const whiteList = ['/login'] // no redirect whitelist

const renderRoutes = (routes, token, t) => {
  if (!Array.isArray(routes)) {
    return null
  }

  const hasToken = token

  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          )
        }
        //no token redirect to /login
        if (
          !hasToken &&
          route.path !== '/login' &&
          !whiteList.includes(route.path)
        ) {
          return (
            <Redirect
              key={route.path}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={`/login?redirect=${route.path}`}
            />
          )
        }
        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            name={route.name}
            render={() => {
              const renderChildRoutes = renderRoutes(
                route.childRoutes,
                token,
                t
              )
              if (route.component) {
                document.title = getPageTitle(route.meta?.title, t)
                return (
                  <Suspense fallback={<Nprogress route={route} />}>
                    <route.component route={route}>
                      {renderChildRoutes}
                    </route.component>
                  </Suspense>
                )
              }
              return renderChildRoutes
            }}
          />
        )
      })}
    </Switch>
  )
}

const AppRouter = () => {
  const { t } = useTranslation()
  const [token] = useAccessStore((state) => [state.token])
  console.log('token: ', token)
  return <Router>{renderRoutes(config, token, t)}</Router>
}

export default AppRouter
