import Request from '../utils/request'

const request = Request('/api')

export function login(loginInfo) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginInfo,
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get',
  })
}
