import { SAVE_USER, REMOVE_USER, UPDATE_MESSAGES } from './constants'

export default {
  [SAVE_USER] (state, user) { state.user = user },
  [REMOVE_USER] (state) { state.user = {} },
  [UPDATE_MESSAGES] (state, messages) { state.messages = messages }
}
