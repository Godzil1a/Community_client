import types from './mutation-types'

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
  }
}

export default actions
