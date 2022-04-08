import types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_LOGIN] (state, status) {
    state.loginStatus = status
  },
  [types.SET_UNREAD_CNT] (state, unreadCnt) {
    state.unreadCnt = unreadCnt
  }
}

export default mutations
