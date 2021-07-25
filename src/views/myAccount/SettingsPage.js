import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Grid, Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { callGetApiWithAuth } from 'utils/api'
import { refreshStorage } from 'utils/auth'
import MyAccountCard from './settings/MyAccountCard'
import ShippingAddressCard from './settings/ShippingAddressCard'
import CreditCard from './settings/CreditCard'
import CreditWalletCard from './settings/CreditWalletCard'
import TrafficRotatorCard from './settings/TrafficRotatorCard'
import UpgradeTypeCard from './settings/UpgradeTypeCard'
import ProductCreditCard from './settings/ProductCreditCard'
import ShippingAddressModal from './settings/ShippingAddressModal'
import CreditCardModal from './settings/CreditCardModal'
// import PowerLegModal from './settings/PowerLegModal'
import UpgradeTypeModal from './settings/UpgradeTypeModal'
import ProfileEditionModal from './settings/ProfileEditionModal'
import ContactVisibilityCard from './settings/ContactVisibilityCard'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(undefined)
  const [currentBalance, setCurrentBalance] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [isOpenedShippingEdition, setIsOpenedShippingEdition] = useState(false)
  const [isOpenedCreditEdition, setIsOpenedCreditEdition] = useState(false)
  const [isOpenedPowerLegEdition, setIsOpenedPowerLegEdition] = useState(false)
  const [isOpenedTypeEdition, setIsOpenedTypeEdition] = useState(false)
  const [isOpenedProfileEdition, setIsOpenedProfileEdition] = useState(false)

  useEffect(() => {
    loadUserData()
    loadBalanceData()
  }, [])

  const loadUserData = () => {
    callGetApiWithAuth('profile', onGetUserData)
  }
  const onGetUserData = (data) => {
    setUserData(data.data)
    dispatch({
      type: 'auth.REFRESH',
      payload: { user: data.data }
    })
    refreshStorage(data.data)
  }
  const loadBalanceData = () => {
    callGetApiWithAuth('wallet/amount', onGetBalance)
  }
  const onGetBalance = (data) => {
    setCurrentBalance(data.data.current_balance)
  }

  const afterUpdateSuccess = (successMessage) => {
    loadUserData()
    setSuccessMessage(successMessage)
  }
  const onErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage)
  }

  /*
  const openProfileEdition = () => {
    setIsOpenedProfileEdition(true)
  }
  const closeProfileEdition = () => {
    setIsOpenedProfileEdition(false)
  }
  const openShippingEdition = () => {
    setIsOpenedShippingEdition(true)
  }
  const closeShippingEdition = () => {
    setIsOpenedShippingEdition(false)
  }
  const openCreditCardEdition = () => {
    setIsOpenedCreditCardEdition(true)
  }
  const closeCreditCardEdition = () => {
    setIsOpenedCreditCardEdition(false)
  }
  */
  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={6} spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ShippingAddressCard data={userData} openEdition={()=>setIsOpenedShippingEdition(true)} />
          </Grid>
          <Grid item xs={12}>
            <CreditCard data={userData} openEdition={()=>setIsOpenedCreditEdition(true)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}  md={12} lg={6} xl={6} className="grid-settings">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <Grid container spacing={3}>
              {(userData && userData.type==1)?
              <Grid item xs={12}>
                <CreditWalletCard currentBalance={currentBalance} />                
              </Grid>
              : ''}
              {/*
              (userData && userData.type==1)?
              <Grid item xs={12} >
                <TrafficRotatorCard data={userData} 
                  openEdition={()=>setIsOpenedPowerLegEdition(true)}
                />
              </Grid>
              : ''
              */}
              {/*
              <Grid item xs={12}>
                <UpgradeTypeCard data={userData} 
                  openEdition={()=>setIsOpenedTypeEdition(true)} 
                />                
              </Grid>
              */}
              <Grid item xs={12}>
                <ProductCreditCard data={userData} />
              </Grid>
              <Grid item xs={12}>
                <ContactVisibilityCard data={userData} 
                  openEdition={()=>setIsOpenedTypeEdition(true)}
                  loadUserData={loadUserData} 
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <MyAccountCard data={userData} 
              openEdition={()=>setIsOpenedProfileEdition(true)} 
            />
          </Grid>
        </Grid>
      </Grid>
      <ShippingAddressModal isOpened={isOpenedShippingEdition} 
        data={userData} afterUpdateSuccess={afterUpdateSuccess}
        closeEdition={()=>setIsOpenedShippingEdition(false)}
        onErrorMessage={onErrorMessage}
      />
      <CreditCardModal isOpened={isOpenedCreditEdition} 
        data={userData} afterUpdateSuccess={afterUpdateSuccess}
        closeEdition={()=>setIsOpenedCreditEdition(false)}
        onErrorMessage={onErrorMessage}
      />
      {/* <PowerLegModal isOpened={isOpenedPowerLegEdition} 
        data={userData} afterUpdateSuccess={afterUpdateSuccess}
        closeEdition={()=>setIsOpenedPowerLegEdition(false)}
        onErrorMessage={onErrorMessage}
      /> */}
      <UpgradeTypeModal isOpened={isOpenedTypeEdition} 
        userData={userData} afterUpdateSuccess={afterUpdateSuccess}
        closeEdition={()=>setIsOpenedTypeEdition(false)}
        onErrorMessage={onErrorMessage}
      />
      <ProfileEditionModal isOpened={isOpenedProfileEdition} 
        userData={userData} afterUpdateSuccess={afterUpdateSuccess}
        closeEdition={()=>setIsOpenedProfileEdition(false)}
        onErrorMessage={onErrorMessage}
      />
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
    </Grid>
  )
}
