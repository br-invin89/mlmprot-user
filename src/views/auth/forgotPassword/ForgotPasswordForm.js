import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  TextField, Button, Snackbar
} from '@material-ui/core'
import { 
  Alert
} from '@material-ui/lab'
import useStyles from './ForgotPasswordForm.styled'
import { callPostApi } from 'utils/api'

export default function ForgotPasswordForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleForgotPassowrd = () => {
    if (formData.username=='') {
      setErrorMessage('Please input username')
      return
    }
    setLoadingMessage('Loading...')
    const data = {
      username: formData.username.toLowerCase().trim(),
    }
    callPostApi('auth/forgot_password', data, onForgotPasswordSuccess, onForgotPasswordFailure)
  }
  const onForgotPasswordSuccess = (data) => {
    setLoadingMessage(data.message)
    setTimeout(() => {
      history.push('/')      
    }, 500)
  }
  const onForgotPasswordFailure = () => {
    setErrorMessage('Incorrect username')
    setLoadingMessage('')
    setFormData({ username: ''})
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
        <Button
          className={classes.submitBtn}
          color="primary"
          variant="contained"
          onClick={handleForgotPassowrd}
        >
          Reset Password
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
