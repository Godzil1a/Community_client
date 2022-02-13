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

export {login}
