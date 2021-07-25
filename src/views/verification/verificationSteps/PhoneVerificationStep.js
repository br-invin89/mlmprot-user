import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callPostApiWithAuth } from 'utils/api'
// import { SyncOutlined } from '@ant-design/icons'
// import { 
//   Container, 
//   Form, FormRow, Label, 
//   PhoneInput, PhoneInputExpanded, AuthCodeInput, SendMessageBtn, 
//   PhoneIssueDescription, SendMessageLink, SendCodeBtn,  
// } from './PhoneVerificationStep.styled'
// import {
//   WelcomeWrapper, WelcomeText, TicketIcon,
//   PageActionWrapper, NextBtn,
// } from './VerificationSteps.styled'
// import { message } from 'ui/components'
import { Button, Snackbar, Grid, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import SyncIcon from '@material-ui/icons/Sync';
import TextField from "components/inputs/TextField"
import successTicketIcon from 'assets/icons/confirmed.svg'

const PhoneVerificationStep = (props) => {
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)
  const [phone, setPhone] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [status, setStatus] = useState('initial')
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  useEffect(() => {
    if (myUser)
      setPhone(myUser.phone)
  }, [myUser])
  const sendMessage = () => {
    if (phone=='') {
      setErrorMessage('Please input your phone.')
      return
    }
    setIsSendingMessage(true)
    callPostApiWithAuth('verify/sms', { phone }, onDoneSendMessage, onFailSendMessage)
  }
  const onDoneSendMessage = () => {
    setIsSendingMessage(false)
    setStatus('sms_sent')
    setSuccessMessage('We have sent verification sms to you.')
  }
  const onFailSendMessage = () => {
    setIsSendingMessage(false)
    setSuccessMessage('Sorry, failed to send sms')
  }
  const sendAuthCode = () => {
    if (authCode=='') {
      setErrorMessage('You should input auth code.')
      return
    }
    setIsSendingCode(true)
    callPostApiWithAuth(`verify/code/0/${authCode}`, { phone, authCode }, onDoneSendAuthCode, onFailSendAuthCode)
  }
  const onDoneSendAuthCode = () => {
    setIsSendingCode(false)
    setStatus('confirm_success')
    setSuccessMessage('Your phone number has been verified.')
  }
  const onFailSendAuthCode = () => {
    setIsSendingCode(false)
    setErrorMessage('Your code is wrong.')
  }

  return (
    <React.Fragment>
      {status!='confirm_success' &&
        <div className={classes.contentRoot}>
          <Grid container
            alignItems='center'
          >
            <label className={classes.formLabel}>Phone:</label>
            {status=='initial' &&
              <TextField 
                className={classes.formInput}
                value={phone} 
                onChange={e=>setPhone(e.target.value)} 
              />
            }
            {status=='sms_sent' && 
              <TextField 
                className={classes.formInput}
                value={phone} 
                onChange={e=>setPhone(e.target.value)} 
              />
            }
            {status=='initial' && 
              <Button
                color='primary'
                onClick={sendMessage} 
                disabled={isSendingMessage}
              >
                {isSendingMessage?'Sending...':'Send'}
              </Button>
            }
          </Grid>          
          {status=='sms_sent' &&
            <Grid container
              alignItems='center'
            >
              {!isSendingMessage &&
                <p className={classes.descText}>
                  You still not got sms? Please&nbsp;
                  <span className={classes.sendLink} onClick={sendMessage}>
                    try
                  </span>
                  &nbsp;again.
                </p>
              }
              {isSendingMessage &&
                <p className={classes.descText}>
                  <SyncIcon spin />&nbsp;
                  Sending sms again...
                </p>
              }
            </Grid>
          }
          {status=='sms_sent' &&
            <Grid container
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
        </div>
      }
      {status=='confirm_success' &&
        <Grid>
          <img className={classes.icon} src={successTicketIcon} />Great! You have verified your phone number.
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

export default PhoneVerificationStep

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
