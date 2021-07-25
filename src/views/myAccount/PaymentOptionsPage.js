import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth } from 'utils/api'
import HintCard from './paymentOptions/HintCard'
// import PaymentOptionCard from './paymentOptions/PaymentOptionCard'
import PayperOptionCard from './paymentOptions/PayperOptionCard'
import IpayoutOptionCard from './paymentOptions/IpayoutOptionCard'

export default function PaymentOptionsPage() {
  const classes = useStyles()
  const [providers, setProviders] = useState([])
  const [selectedProviderId, setSelectedProviderId] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  useEffect(() => {
    loadPaymentOptions()
  }, [])

  const loadPaymentOptions = () => {
    setIsLoading(true)
    callGetApiWithAuth('payout_settings', onGetProvidersData, () =>
      setIsLoading(false)
    )
  }
  const onGetProvidersData = (data) => {
    setIsLoading(false)
    setProviders(data.data.providers)
    if (data.data.actived_setting) {
      setSelectedProviderId(data.data.actived_setting.provider_id)
    }
  }
  const afterActive = () => {
    setSuccessMessage('Payment option selected.')
    loadPaymentOptions()
  }
  const afterCreate = () => {
    setSuccessMessage('Payout account has been created')
    loadPaymentOptions()
  }

  return (
    <Grid container className={classes.container} spacing={4}>
      <Grid item lg={12}>
        <HintCard />
      </Grid>
      {providers.map((provider) => (
        <Grid item xs={12}>
          {provider.method=='Ipayout' && 
          <IpayoutOptionCard
            provider={provider}
            selectedProviderId={selectedProviderId}
            afterActive={afterActive}
            afterCreate={afterCreate}
            onErrorMessage={setErrorMessage}
          />
          }
          {provider.method=='Payper' && 
          <PayperOptionCard
            provider={provider}
            selectedProviderId={selectedProviderId}
            afterActive={afterActive}
          />
          }
        </Grid>
      ))}
      {isLoading && <CircularProgress size={48} />}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={successMessage}
        autoHideDuration={2000}
        onClose={(_, r) => {
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(_, r) => {
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
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
}))
