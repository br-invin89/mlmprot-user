import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
  Radio, RadioGroup, 
  FormControlLabel, Button, Snackbar,
  CircularProgress
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TextField from 'components/inputs/TextField'
import NumericField from 'components/inputs/NumericField'
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'

export default function SettingsForm() {
  const classes = useStyle()
  const [withdrawSetting, setWithdrawSetting] = useState({
    type: 2,
    keep_percent: ''
  })
  const [isLoadingSetting, setIsLoadingSetting] = useState(false)
  const [isUpdatingSetting, setIsUpdatingSetting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)

  useEffect(() => {
    setIsLoadingSetting(true)
    callGetApiWithAuth('wallet/withdraw_setting', onGetSetting, onFailSetting)
  }, [])
  const onGetSetting = (data) => {
    setIsLoadingSetting(false)
    let form = {
      ...data.data,
    }
    if (!data.data.keep_percent) {
      form['keep_percent'] = ''
    }
    setWithdrawSetting(form)
  }
  const onFailSetting = (data) => {
    setIsLoadingSetting(false)
  }
  const saveSetting = () => {
    if (!withdrawSetting) return
    if (!withdrawSetting.type) {
      setErrorMessage('Please select one method')
    }
    if (withdrawSetting.type==3) {
      if (!withdrawSetting.keep_percent || isNaN(withdrawSetting.keep_percent) || withdrawSetting.keep_percent <= 0 || withdrawSetting.keep_percent>100) {
        setErrorMessage('Please input park percent correctly')
        return
      }
    }
    setIsUpdatingSetting(true)
    callPostApiWithAuth('wallet/withdraw_setting', withdrawSetting, onSavedSetting, onFailSaveSetting)
  }
  const onSavedSetting = () => {
    setIsUpdatingSetting(false)
    setSuccessMessage('Setting saved successfully.')
  }
  const onFailSaveSetting = (errMessage) => {
    setIsUpdatingSetting(false)
    setErrorMessage(errMessage)
  }
  return (
    <div className={classes.root}>
      {withdrawSetting && 
      <form >
        <RadioGroup
          aria-label='creditOptions'
          name='creditOption'
          value={withdrawSetting.type}
          onChange={e=>{
            setWithdrawSetting({...withdrawSetting, type:e.target.value})
          }}
          className={classes.checkboxForm}
        >
          <FormControlLabel
            value={2}
            className={classes.labelRoot1}            
            control={<Radio color='primary' checked={withdrawSetting.type==2} />}
            label='By-pass Credit Wallet and allow earnings to my active payment option.'
          />
          <FormControlLabel
            value={1}
            className={classes.labelRoot1}            
            control={<Radio color='primary' checked={withdrawSetting.type==1} />}
            label='Park 100% of earnings in Credit Wallet'
          />
          <FormControlLabel
            className={classes.labelRoot}
            value={3}
            control={<Radio color='primary' checked={withdrawSetting.type==3} />}
            label={
              <div className={classes.checkText}>
                <span>Park (<NumericField
                  variant="outlined"
                  value={withdrawSetting.keep_percent}
                  onChange={(e) => {
                    const isNum = /^\d+$/.test(e.target.value)
                    const value = e.target.value
                    if (isNum && value<=100 && value>=0) {
                      setWithdrawSetting({ ...withdrawSetting, keep_percent: value })
                    } else {
                    }
                  }}
                  className={classes.input}
                  style={{width: 80}}
                />)% <span>of earnings in Credit Wallet</span></span>
              </div>
            }
          />
        </RadioGroup>
        <Button
          variant='contained'
          size='small'
          color='primary'
          className={classes.btn}
          onClick={saveSetting}
          disabled={isUpdatingSetting}
        >
          {isUpdatingSetting?<CircularProgress size={24} />:'Save'}
        </Button>
      </form>
      }
      {(isLoadingSetting) &&
        <div className={classes.loadingRoot}>
          <CircularProgress size={48} />
        </div>
      }

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
    </div>
  )
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 82,
    width: '100%',
    borderRadius: 10,
    position: 'relative'
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  amount: {
    fontSize: 18,
    fontWeight: 500,
  },
  input: {
    width: 116,
    margin: '-3px 5px 0',
  },
  checkText: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 4
  },
  btn: {
    textTransform: 'capitalize',
    width: 92,
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-start',
      marginTop: 5,
      '& .MuiIconButton-root': {
        padding: '5px 9px 9px !important'
      }
    },
  },
  labelRoot1: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      marginTop: 5,
      '& .MuiIconButton-root': {
        padding: '1px 9px 9px !important'
      }
    },
  },
  loadingRoot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  }
}))
