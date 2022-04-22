import request from '../utils/request'

const queryDAU = (startDate, endDate) => {
  return request({
    url: '/community/data/dau',
    method: 'get',
    params: {
      startDate: startDate,
      endDate: endDate
    }
  })
}

const queryUV = (startDate, endDate) => {
  return request({
    url: '/community/data/uv',
    method: 'get',
    params: {
      startDate: startDate,
      endDate: endDate
    }
  })
}

export {queryDAU, queryUV}
