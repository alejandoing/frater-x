import { USER_STORAGE, SAVE_USER, REMOVE_USER, UPDATE_MESSAGES } from './constants'

export default {
  getMessages ({ commit }, messages) {
    commit(UPDATE_MESSAGES, messages)
  },
  saveUser ({ commit }, user) {
    commit(SAVE_USER, user)
    localStorage.setItem(USER_STORAGE, JSON.stringify(user))
  },
  removeUser ({ commit }) {
    commit(REMOVE_USER)
    localStorage.removeItem(USER_STORAGE)
  }
}
