import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  TextField, Button, Snackbar
} from '@material-ui/core'
import { 
  Alert
} from '@material-ui/lab'
import { saveStorage } from 'utils/auth'
import { callPostApi } from 'utils/api'
import { getToken } from 'utils/auth'

const LoadInit = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('autologin')) {
      const username = params.get('autologin')
      const password = atob(params.get('token'))
      onAutoLogin(username, password)
    } else if (params.has('auto-pre-enrollee-login')) {
      const token = params.get('token')
      const email = atob(params.get('token'))
      onAutoPreEnrolleeLogin(email)
    } else if (params.has('auto-token-login')) {      
      const token = params.get('token')
      onAutoTokenLogin(token)
    } else {
      if (getToken())
        history.push('/dashboard')
    }
  }, [])
  const onAutoLogin = (username, password) => {
    let formData = { username, password }
    setLoadingMessage('Logging now...')
    setErrorMessage('')
    callPostApi('auth/login', formData, onLoginSuccess, onLoginFailure)
  }
  const onLoginSuccess = (data) => {
    saveStorage(data.data.user, data.data.token)
    dispatch({ type: 'auth.SET_LOGGED_IN', payload: { user: data.data.user } })
    dispatch({ type: 'cart.EMPTY_CART' })
    setLoadingMessage('Logged in Successfully')
    setTimeout(() => {
      history.push('/home')
    }, 500)
  }
  const onLoginFailure = (errorMessage) => {    
    setErrorMessage(errorMessage)
    setLoadingMessage('')
  }  
  const onAutoPreEnrolleeLogin = (email) => {
    let formData = { email }
    setLoadingMessage('Logging now...')
    setErrorMessage('')
    callPostApi('auth/login/pre-enrollee', formData, onPreEnrolleeLoginSuccess, onPreEnrolleeLoginFailure)
  }
  const onPreEnrolleeLoginSuccess = (data) => {
    saveStorage(data.data, data.token)
    dispatch({ type: 'auth.SET_LOGGED_IN', payload: { user: data.data } })
    dispatch({ type: 'cart.EMPTY_CART' })
    setLoadingMessage('Logged in Successfully')
    setTimeout(() => {
      history.push('/home')
    }, 500)
  }
  const onPreEnrolleeLoginFailure = (errorMessage) => {
    setErrorMessage(errorMessage)
    setLoadingMessage('')
  }
  const onAutoTokenLogin = (token) => {
    let formData = { token }
    setLoadingMessage('Logging now...')
    setErrorMessage('')
    callPostApi('auth/login/token', formData, onTokenLoginSuccess, onTokenLoginFailure)
  }
  const onTokenLoginSuccess = (data) => {
    saveStorage(data.data.user, data.data.token)    
    dispatch({ type: 'auth.SET_LOGGED_IN', payload: { user: data.data.user } })
    dispatch({ type: 'cart.EMPTY_CART' })
    setLoadingMessage('Logged in Successfully')
    setTimeout(() => {
      history.push('/home')
    }, 500)
  }
  const onTokenLoginFailure = (errorMessage) => {
    setErrorMessage(errorMessage)
    setLoadingMessage('')
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={errorMessage!=''}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r=='timeout') setErrorMessage('')
        }}
      >
        <Alert severity="error" 
          variant="filled"
          onClose={()=>setErrorMessage('')}
        >
          {errorMessage}
          </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={loadingMessage}
      >
        <Alert severity="info" 
          variant="filled"
        >
          {loadingMessage}
          </Alert>
      </Snackbar>
    </>
  )
}

export default LoadInit
