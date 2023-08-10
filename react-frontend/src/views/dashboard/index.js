import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetting, useAccessStore } from '@/store'
import { logout } from '@/services'
import { message } from 'antd'

function Dashboard() {
  const { t } = useTranslation()
  const [language, updateLanguage] = useSetting((state) => [
    state.language,
    state.updateLanguage,
  ])
  const [updateToken] = useAccessStore((state) => [state.updateToken])

  return (
    <div>
      {t('dashboard')}
      <button
        onClick={() => {
          logout().then((res) => {
            message.success('退出登录成功')
            updateToken('')
          })
          // updateLanguage(language == 'en' ? 'zh' : 'en')
        }}
      >
        asdasdas
      </button>
    </div>
  )
}

export default Dashboard
