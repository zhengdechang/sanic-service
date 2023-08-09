/*
 * @Description:
 * @Author: Devin
 * @Date: 2023-08-10 14:37:04
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translation_en from './en'
import translation_zh from './zh'

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
}

const language = JSON.parse(localStorage.getItem('setting'))?.state?.language

i18n.use(initReactI18next).init({
  resources,
  lng: language ? language : 'zh',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
