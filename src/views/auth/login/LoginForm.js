import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { 
  TextField, Button, Snackbar, Typography
} from '@material-ui/core'
import { 
  Alert
} from '@material-ui/lab'
import useStyles from './LoginForm.styled'
import { saveStorage } from 'utils/auth'
import { callPostApi } from 'utils/api'

export default function LoginForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',  password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleLogin = () => {
    if (formData.username=='' || formData.password=='') {
      setErrorMessage('Please input username and password')
      return
    }
    setLoadingMessage('Logging now...')
    const data = {
      username: formData.username.toLowerCase().trim(),
      password: formData.password
    }
    callPostApi('auth/login', data, onLoginSuccess, onLoginFailure)
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
  const onLoginFailure = () => {
    setErrorMessage('Incorrect username or password')
    setLoadingMessage('')
    setFormData({...formData, password: ''})
  }

  return (
    <div className={classes.container}>
      
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textInput}
          label="Username"
          placeholder="Username"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant={'outlined'}
          value={formData.username}
          onChange={e=>setFormData({...formData, username: e.target.value})}
        />
        <TextField
          className={classes.textInput}
          label="Password"
          type="password"
          placeholder="Password"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant={'outlined'}
          value={formData.password}
          onChange={e=>setFormData({...formData, password: e.target.value})}
          onKeyPress={(e)=>{if (e.key === 'Enter') handleLogin()}}
        />
        <Link to="/forgot-password" className={classes.forgotPassword}>
          Forgot Password?
        </Link>  
        <Button
          className={classes.submitBtn}
          color="primary"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>

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
    </div>
  )
}
