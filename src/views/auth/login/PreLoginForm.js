import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  TextField, Button, Snackbar
} from '@material-ui/core'
import { 
  Alert
} from '@material-ui/lab'
import useStyles from './LoginForm.styled'
import { saveStorage } from 'utils/auth'
import { callPostApi } from 'utils/api'

export default function PreLoginForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleLogin = () => {
    if (formData.email=='') {
      setErrorMessage('Please input email')
      return
    }
    setLoadingMessage('Logging now...')
    const data = {
      email: formData.email.toLowerCase().trim()
    }
    callPostApi('prospect/login', data, onLoginSuccess, onLoginFailure)
  }
  const onLoginSuccess = (res) => {
    // saveStorage(data.data, data.token)
    // dispatch({ type: 'auth.SET_LOGGED_IN', payload: { user: data.data } })
    // setLoadingMessage('Logged in Successfully')
    setTimeout(() => {
      window.location = `${process.env.REACT_APP_TOUR}/?token=${res.data.token}`
    }, 500)
  }
  const onLoginFailure = (errorMessage) => {
    setErrorMessage("Your credentials are invalid")
    setLoadingMessage('')
  }
  
  return (
    <div className={classes.container}>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textInput}
          label="Email"
          placeholder="email"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          variant={'outlined'}
          value={formData.email}
          onChange={e=>setFormData({...formData, email: e.target.value})}
          onKeyPress={(e)=>{if (e.key === 'Enter') handleLogin()}}
        />
        <TextField
          style={{display: 'none'}}
        />
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
        open={errorMessage}
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
