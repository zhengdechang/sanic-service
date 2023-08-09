import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const ACCESS_KEY = 'access'

export const useAccessStore = create()(
  persist(
    (set, get) => ({
      token: '',
      updateToken(token) {
        set((state) => ({ token }))
      },
    }),
    {
      name: ACCESS_KEY,
      version: 1,
    }
  )
)
