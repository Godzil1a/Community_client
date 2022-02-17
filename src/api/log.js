import request from '../utils/request'

const login = (username, password, code, rememberMe) => {
  return request({
    url: '/community/login',
    method: 'post',
    data: {
      username: username,
      password: password,
      code: code,
      rememberMe: rememberMe
    }
  })
}

const logout = () => {
  return request({
    url: '/community/logout',
    method: 'get'
  })
}

export {login, logout}
