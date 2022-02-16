import request from '../utils/request'

const uploadHeader = (header) => {
  return request({
    url: '/community/user/uploadHeader',
    method: 'post',
    data: header,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {uploadHeader}
