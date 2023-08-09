import React from 'react'
import ReactDom from 'react-dom'
import AppRouter from '@/router'
import { ConfigProvider } from 'antd'
import Loading from './components/loading'
import dayjs from 'dayjs'
import zhCN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_GB'
import { useSetting } from '@/store'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

import 'antd/dist/antd.css'
import '@/assets/styles/global.less'
import './style.less'
import './assets/styles/variable.less'
import './i18n/index.js'

dayjs.locale('zh-cn')
dayjs.locale('en')

const ConfigProviderApp = () => {
  const [language] = useSetting((state) => [state.language])
  return (
    <ConfigProvider locale={language == 'zh' ? zhCN : en_US}>
      <AppRouter />
    </ConfigProvider>
  )
}

const App = () => {
  return (
    <React.Fragment>
      <ConfigProviderApp />
      <Loading />
    </React.Fragment>
  )
}

ReactDom.render(<App />, document.getElementById('root'))

// 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
    }
    ReactDom.render(<App />, document.getElementById('root'))
  })
}
