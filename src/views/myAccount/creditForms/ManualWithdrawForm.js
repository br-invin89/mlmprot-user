import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TextField from 'components/inputs/TextField'
import NumericField from 'components/inputs/NumericField'
import { callPostApiWithAuth } from 'utils/api'

export default function ManualWithdrawForm({ setShouldLoad }) {
  const classes = useStyle()
  const history = useHistory()
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [amount, setAmount] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const withdraw = () => {
    if (!amount || amount <= 0) {
      setErrorMessage('Please input amount as price value and must be greater than 0')
      return
    }
    setIsWithdrawing(true)
    callPostApiWithAuth('wallet/request_withdraw', { amount }, onSuccessWithdraw, onFailWithdraw)
  }
  const onSuccessWithdraw = () => {
    setSuccessMessage('Withdraw request has been sent.')
    setIsWithdrawing(false)
    setShouldLoad(true)
    setAmount('')
  }
  const onFailWithdraw = (errMessage) => {
    setErrorMessage(errMessage)
    setIsWithdrawing(false)
    // if (errMessage == 'Please select your payout option first.') {
    //   setTimeout(() => {
    //     history.push('/payment-options')
    //   }, 1000)
    // }
  }

  return (
    <>
      <form className={classes.root}>
        <label>Amount:</label>
        <NumericField
          variant="outlined"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          className={classes.input}
        />
        <Button
          variant='contained'
          size='small'
          color='primary'
          className={classes.btn}
          onClick={withdraw}
          disabled={isWithdrawing}
        >
          {isWithdrawing?<CircularProgress size={24} />:'Withdraw'}
        </Button>        
      </form>
      <div className={classes.descRoot}>
        Daily withdrawal amount is $9,500/day.  Deposits will be available in your PAYPER account in 1-2 business days.
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={successMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == 'timeout') setSuccessMessage(undefined)
        }}
      >
        <Alert
          severity='success'
          variant='filled'
          onClose={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == 'timeout') setErrorMessage(undefined)
        }}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  descRoot: {
    fontSize: 14,
    marginTop: 20,
    color: theme.palette.text.secondary
  },
  input: {
    width: 116,
    marginLeft: 4,
    marginRight: 16,    
  },
  btn: {
    textTransform: 'capitalize',
    minWidth: 96,
  },
}))
