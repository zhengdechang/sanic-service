/*
 * @Description:
 * @Author: Devin
 * @Date: 2023-04-23 12:16:53
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from 'i18next' //语言切换

export const SETTING_KEY = 'setting'

export const useSetting = create()(
  persist(
    (set, get) => ({
      language: 'zh',
      updateLanguage(language) {
        i18n.changeLanguage(language)
        set((state) => ({ language }))
      },
    }),
    {
      name: SETTING_KEY,
      version: 1,
    }
  )
)
