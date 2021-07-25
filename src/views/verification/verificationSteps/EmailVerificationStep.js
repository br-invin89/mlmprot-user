import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callPostApiWithAuth } from 'utils/api'
import { Button, Snackbar, Grid, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import SyncIcon from '@material-ui/icons/Sync';
import TextField from "components/inputs/TextField"
import successTicketIcon from 'assets/icons/confirmed.svg'

const EmailVerificationStep = (props) => {
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [status, setStatus] = useState('initial')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  useEffect(() => {
    if (myUser){
      setEmail(myUser.email)
    }
  }, [myUser])
  const sendEmail = () => {
    if (email=='') {
      setErrorMessage('Please input your email.')
      return
    }
    setIsSendingEmail(true)
    callPostApiWithAuth('verify/email', { email }, onDoneSendAuthEmail, onFailSendAuthEmail)
  }
  const onDoneSendAuthEmail = () => {
    setIsSendingEmail(false)
    setStatus('email_sent')
    setSuccessMessage('We have sent verification email to you.')
  }
  const onFailSendAuthEmail = () => {
    setIsSendingEmail(false)
    setErrorMessage('Sorry, failed to send email')
  }
  const sendAuthCode = () => {
    if (authCode=='') {
      setErrorMessage('You should input auth code.')
      return
    }
    setIsSendingCode(true)
    callPostApiWithAuth(`verify/code/1/${authCode}`, { email, authCode }, onDoneSendAuthCode, onFailSendAuthCode)
  }
  const onDoneSendAuthCode = () => {
    setIsSendingCode(false)
    setStatus('confirm_success')
    setSuccessMessage('Your email has been verified.')
  }
  const onFailSendAuthCode = () => {
    setIsSendingCode(false)
    setErrorMessage('Your code is wrong.')
  }

  return (
    <React.Fragment>
      {status!='confirm_success' &&
        <Grid container 
          direction='column'
          className={classes.contentRoot}
        >
          <Grid container
            alignItems='center'
          >
            <label className={classes.formLabel}>Email:</label>
            {status=='initial' &&
              <TextField 
                className={classes.formInput}
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
              />
            }
            {status=='email_sent' &&
              <TextField 
                className={classes.formInput}
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
              />
            }
            {status=='initial' &&
              <Button
                color='primary'
                onClick={sendEmail} 
                disabled={isSendingEmail}
              >
                {isSendingEmail?'Sending...':'Send'}
              </Button>
            }
          </Grid>          
          {status=='email_sent' &&
            <Grid item 
              alignItems='center'
            >
              {!isSendingEmail &&
                <p className={classes.descText}>
                  You still not got email? Please&nbsp;
                  <span className={classes.sendLink} onClick={sendEmail}>
                    try
                  </span>
                  &nbsp;again.<br/>
                  Your code will be expired within 15 minutes.
                </p>
              }
              {isSendingEmail &&
                <p className={classes.descText}>
                  <SyncIcon spin />&nbsp;
                  Sending email again...
                </p>
              }
            </Grid>
          }
          {status=='email_sent' &&
            <Grid item 
              alignItems='center'
            >
              <label className={classes.formLabel}>Auth code:</label>
              <TextField 
                className={classes.formInput}
                value={authCode} 
                onChange={e=>setAuthCode(e.target.value)} 
              />
              <Button onClick={sendAuthCode} disabled={isSendingCode}>
                {isSendingCode?'Sending...':'Send'}
              </Button>
            </Grid>
          }
        </Grid>
      }
      {status=='confirm_success' &&
        <Grid>
          <p className={classes.descText}>
            <img className={classes.icon} src={successTicketIcon} />Great! You have verified your email.
          </p>
        </Grid>
      }
      <Box className={classes.stepActionsRoot}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={()=>props.goNextStep()} 
          disabled={status!='confirm_success'}
        >
          Next
        </Button>
      </Box>


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
        autoHideDuration={2000}
        open={successMessage}
        onClose={(e, r) => {
          if (r=='timeout') setSuccessMessage('')
        }}
      >
        <Alert severity="success" 
          variant="filled"
          onClose={()=>setSuccessMessage('')}
        >
          {successMessage}
          </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default EmailVerificationStep

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    '& .MuiInputLabel-outlined': {
      transform: 'translate(12px, 12px) scale(1)'      
    }
  },
  contentRoot: {
    width: 480,
  },
  formLabel: {
    width: 120,
    display: 'inline-block',
  },
  formInput: {
    width: 200,
  },
  descText: {
    fontSize: 14,
  },
  icon: {
    width: 32,
  },
  sendLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  stepActionsRoot: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  }
}));
