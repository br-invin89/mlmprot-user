import { createReducer } from 'redux-create-reducer'

const initialState = {
  user: undefined,
}

export default createReducer(initialState, {
  [`auth.SET_LOGGED_IN`](state, action) {
    const { user } = action.payload
    return { ...state, user }    
  },
  [`auth.LOGOUT`](state, action) {
    return {
      ...state,
      user: undefined,
    }
  },
  [`auth.REFRESH`](state, action) {
    const { user } = action.payload
    return {
      ...state,
      user
    }
  },
})
