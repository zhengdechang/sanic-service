// loading组件
import React, { useEffect } from 'react'
import { Spin } from 'antd'
import './index.less'
import { useTranslation } from 'react-i18next'

const Loading = (props) => {
  const { t } = useTranslation()
  return (
    <div className={`loading-mask loading-hidden`} id="loading-mask">
      <Spin spinning={false} id="loading-spin" tip={`${t('加载中')}......`} />
    </div>
  )
}
export default Loading
