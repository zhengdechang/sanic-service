import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Divider, Form, Input, Checkbox, Button, message } from 'antd'
import { login } from '@/services'
import './index.less'
import { useLocation } from 'react-router'
import { useAccessStore } from '@/store'

const Login = () => {
  const history = useHistory()
  const location = useLocation()

  const updateToken = useAccessStore((state) => state.updateToken)

  const onFinish = async (values) => {
    login(values).then((res) => {
      const { data } = res
      updateToken(data.token)

      let redirect = location.search.replace('?redirect=', '') //router redirect
      history.push(redirect ?? '/')
      message.success('登录成功')
    })
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <div className="login-container">
      <div className="loginColumn">
        <div className="login-form">
          <div className="title-container">
            <h3 className="title">欢迎使用</h3>
          </div>
          <div className="jt-divider">
            <div className="jt-divider-text">Sanic React</div>
          </div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout={'vertical'}
            autoComplete="off"
          >
            <Form.Item
              label="ID"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="backgroundColumn"></div>
    </div>
  )
}

export default React.memo(Login)
