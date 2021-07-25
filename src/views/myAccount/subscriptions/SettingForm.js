import React, { useEffect, useState } from 'react'
import { 
  CircularProgress, Snackbar, Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth, callPutApiWithAuth } from 'utils/api'
import SelectField from 'components/inputs/SelectField'
import { asPrice } from 'utils/text'

export default function SettingForm () {
  const classes = useStyles()
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [settingData, setSettingData] = useState({
    pay_type: 1
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [creditAmount, setCreditAmount] = useState(0)
  const [lessCredit, setLessCredit] = useState(false)
  const [upcomingDate, setUpcomingDate] = useState('')

  useEffect(() => {
    loadSetting()
    checkLessCredit()
  }, [])
  const loadSetting = () => {
    callGetApiWithAuth('subscription_setting/setting', onGetSettingData)
  }
  const onGetSettingData = (data) => {
    setSettingData({
      ...settingData,
      pay_type: data.data.pay_type,
    })
  }
  const checkLessCredit = () => {
    callGetApiWithAuth('subscription_setting/check_credit', onCheckCredit)
  }
  const onCheckCredit = (data) => {
    setCreditAmount(data.data.creditAmount)
    setLessCredit(data.data.lessCredit)
    setUpcomingDate(data.data.upcomingDate)
  }
  const onChangePayType = (pay_type) => {
    const settingData_ = {
      ...settingData,
      pay_type,
    }
    setSettingData(settingData_)    
  }
  const handleSave = () => {
    setIsUpdating(true)
    callPutApiWithAuth('subscription_setting/setting', settingData, onSettingUpdate, onSettingFail)
  }
  const onSettingUpdate = (data) => {
    setIsUpdating(false)
    setSuccessMessage(data.message)
  }
  const onSettingFail = () => {
    setIsUpdating(false)
  }

  return (
    <>
      <div className={classes.payLeftRoot}>
        <div className={classes.payTypeRoot}>
          <label>Payment Method:</label>
          <SelectField className={classes.payTypeSelect}
            value={settingData.pay_type}
            onChange={e=>onChangePayType(e.target.value)}
            options={[
              { label: 'Credit Card', value: 1 },
              { label: 'Credit Wallet', value: 3 },
            ]}
          />
          <Button 
            variant="contained"
            color="primary"
            size="small"
            className={classes.btn}
            onClick={handleSave}
          >
            {isUpdating && 
            <CircularProgress size={24}
            />
            }
            Save
          </Button>
        </div>   
        {(settingData.pay_type==3 && lessCredit) && 
        <div className={classes.creditInfo}>
          Your current Credit Wallet balance of {asPrice(creditAmount)} is not sufficient to process the payment for your upcoming order on {upcomingDate}. 
          <br/>
          If there are insufficient funds on the order date ALUVA will use your credit card on file to complete the transaction.
        </div>
        }     
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
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  payLeftRoot: {
    width: 'calc(100% - 180px)'
  },
  payTypeRoot: {
    display: 'flex',
    alignItems: 'center',
    '& label': {
      marginRight: '4px',
      fontSize: '14px'
    }
  },
  btn: {
    marginLeft: "12px"
  },
  creditInfo: {
    color: theme.palette.text.secondary,
    fontSize: '12px',
    marginTop: '8px',
  }
}))
