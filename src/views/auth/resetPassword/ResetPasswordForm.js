import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  TextField, Button, Snackbar
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import { LoadingOutlined } from "@ant-design/icons";
import useStyles from './ResetPasswordForm.styled'
import { saveStorage } from 'utils/auth'
import { callPostApi } from 'utils/api'

export default function ResetPasswordForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState({
    password: '', confirm_password: ''
  })
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleResetPassword = () => {
    // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    if (formData.password == '') {
      setErrorMessage('Please input password')
      return
    }
    if (!regex.test(formData.password)) {
      setErrorMessage('Password must contain Capital letters, Letters, Numbers and Special characters')
      return
    }
    if (formData.password.length <= 8) {
      setErrorMessage('Password should be more than 8 characters')
      return
    }

    if (formData.password != formData.confirm_password) {
      setErrorMessage('Password does not match with confirm password')
      return
    }
    setLoadingMessage('Loading now...')
    const data = {
      check_secret_key: key,
      password: formData.password,
    }
    callPostApi('auth/update_password', data, onResetPasswordSuccess, onResetPasswordFailure)
  }
  const onResetPasswordSuccess = (data) => {
    setLoadingMessage('Password Updated Successfully')
    setTimeout(() => {
      history.push('/')
    }, 1500)
  }
  const onResetPasswordFailure = () => {
    setFormData({ ...formData, password: '', confirm_password: '' })
  }

  const handleCheckKey = () => {
    setIsLoading(true)
    let check_secret_key = new URLSearchParams(history.location.search).get("key")
    let query = {
      check_secret_key
    }
    setKey(check_secret_key)
    callPostApi('auth/forgot_password/check_secret_key', query, onCheckKeySuccess, onCheckKeyFailed)
  }
  const onCheckKeySuccess = (data) => {
    setIsLoading(false)
  }
  const onCheckKeyFailed = (data) => {
    setIsLoading(false)
    setErrorMessage('The Key has either expired or invalid')
    setTimeout(() => {
      history.push('/')
    }, 1500)
  }

  useEffect(() => {
    handleCheckKey()
  }, [])

  return (
    <div className={classes.container}>
      {
        isLoading ?
          <div className={classes.loader}>
            <LoadingOutlined spin />
          </div>
          :
          <form noValidate autoComplete="off">
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
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <TextField
              className={classes.textInput}
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant={'outlined'}
              value={formData.confirm_password}
              onChange={e => setFormData({ ...formData, confirm_password: e.target.value })}
              onKeyPress={(e) => { if (e.key === 'Enter') handleResetPassword() }}              
            />
            <Button
              className={classes.submitBtn}
              color="primary"
              variant="contained"
              onClick={handleResetPassword}
            >
              Save
        </Button>
          </form>
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={errorMessage != ''}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == 'timeout') setErrorMessage('')
        }}
      >
        <Alert severity="error"
          variant="filled"
          onClose={() => setErrorMessage('')}
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
