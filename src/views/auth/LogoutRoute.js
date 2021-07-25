import React from 'react'
import { useDispatch } from 'react-redux'
import { removeStorage } from 'utils/auth'
import { useHistory } from 'react-router-dom'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  removeStorage()
  dispatch({ type: 'auth.LOGOUT' })
  history.push('/login')
  
  return <></>
}
