import { combineReducers } from 'redux'
import apiReducer from './api'
import authReducer from './auth'
import uiReducer from './ui'
import binaryTreeReducer from './binaryTree'
import cartReducer from './cart'

const rootReducer = combineReducers({
  api: apiReducer,
  auth: authReducer,
  ui: uiReducer,
  binaryTree: binaryTreeReducer,
  cart: cartReducer,
})

export default rootReducer
