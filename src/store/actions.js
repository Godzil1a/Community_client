import types from './mutation-types'
import {queryUnreadCnt} from '../api/message'

const actions = {
  login ({commit}, user) {
    commit(types.SET_LOGIN, true)
    commit(types.SET_USER, user)
  },
  logout ({commit}) {
    commit(types.SET_LOGIN, false)
    commit(types.SET_USER, {
      userId: '',
      username: '',
      header_url: ''
    })
  },
  setUser ({rootState, commit}, user) {
    commit(types.SET_USER, user)
  },
  setUnreadCnt ({commit}, userId) {
    queryUnreadCnt(userId)
      .then(res => {
        if (res.code === 200) {
          commit(types.SET_UNREAD_CNT, res.data)
        } else {
          throw new Error(res.msg)
        }
      })
      .catch(ex => {
        commit(types.SET_UNREAD_CNT, 0)
      })
  }
}

export default actions
