/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { filterNull, errorHandle } from './toolkit'
import { message } from 'antd'
import { useAccessStore } from '@/store'

const setLoading = (key = true) => {
  const maskDom = document.getElementById('loading-mask')
  const spinDom = document.getElementById('loading-spin')

  if (key == false) {
    maskDom.classList.add('loading-hidden')
    spinDom.classList.remove('ant-spin-spinning')
    return
  }
  maskDom.classList.remove('loading-hidden')
  spinDom.classList.add('ant-spin-spinning')
}

function Request(baseURL) {
  const Request = axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    baseURL: baseURL,
    timeout: 30000, // request timeout
  })
  // 请求拦截器
  Request.interceptors.request.use(
    (config) => {
      config.loading = config.loading !== undefined ? config.loading : true
      !!config.loading && setLoading(true)
      const { token } = useAccessStore.getState()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // Message.error({
      //   message: '请求失败',
      //   center: true,
      // })
      return message.error(error)
    }
  )
  // 响应拦截器
  Request.interceptors.response.use(
    (response) => {
      setLoading(false)
      if (response.status === 200) {
        if (response.data.code === '0000') {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response.data.msg)
        }
      } else {
        return Promise.reject(response.data)
      }
    },
    (error) => {
      const status = error?.message?.replace(
        /Request failed with status code\s(\w+)/,
        '$1'
      )
      console.log('status: ', status, error?.message)
      setLoading(false)
      if (status) {
        // errorHandle(status, error.message)
        return Promise.reject(error.message)
      } else {
        return Promise.reject(error.message)
      }
    }
  )

  return Request
}

export default Request
