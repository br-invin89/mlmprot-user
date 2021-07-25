import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Divider } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import InformationForm from './IdcardVerification/InformationForm'
import LocationForm from './IdcardVerification/LocationForm'
import PhotoSection from './IdcardVerification/PhotoSection'
import IdcardSection from './IdcardVerification/IdcardSection'
import ConfirmModalContent from './IdcardVerification/ConfirmModalContent'

/*
import { LayoutRow, LayoutCol, Button, confirmAlert, message } from 'ui/components'
import {
  WelcomeWrapper, WelcomeText, TicketIcon,
  PageActionWrapper, NextBtn,
} from './VerificationSteps.styled'
*/

import { Button, Snackbar, Grid, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import SyncIcon from '@material-ui/icons/Sync';
import TextField from "components/inputs/TextField"
import successTicketIcon from 'assets/icons/confirmed.svg'

const IdcardVerificationStep = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [personInfo, setPersonInfo] = useState(undefined)
  const [location, setLocation] = useState(undefined)
  const [photo, setPhoto] = useState(undefined)
  const [photoFile, setPhotoFile] = useState(undefined)
  const [idcardFront, setIdcardFront] = useState(undefined)
  const [cardType, setCardType] = useState(undefined)
  const [status, setStatus] = useState('initial')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const onChangePersonInfo = (formData) => {
    setPersonInfo(formData)
  }
  const onChangeLocation = (formData) => {
    setLocation(formData)
  }
  const onUploadPhoto = (photo, photoFile) => {
    setPhoto(photo)
    setPhotoFile(photoFile)
  }
  const onUploadIdcardFront = (idcardFront) => {
    setIdcardFront(idcardFront)
  }
  const onChangeCardType = (cardType) => {
    setCardType(cardType)
  }
  const onSubmit = () => {
    if (!checkValidation()) return
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmModalContent onClose={onClose} 
          cardType={cardType}
          personInfo={personInfo}
          location={location}
          photo={photo}
          photoFile={photoFile}
          idcardFront={idcardFront}
          onSuccess={onDoneVerification}
          onFailure={onFailVerification}
        />
      )
    })
  }
  const checkValidation = () => {
    if (!personInfo) {      
      setErrorMessage('You should input your information.')
      return false
    }
    if (personInfo) {
      if (!personInfo['FirstGivenName'] || 
        !personInfo['FirstSurName'] || 
        !personInfo['DayOfBirth'] || 
        !personInfo['MonthOfBirth'] || 
        !personInfo['YearOfBirth'] || 
        !personInfo['Gender']
      ) {
        setErrorMessage('Please input your information correctly.')
        return false
      }
    }
    if (!location) {
      setErrorMessage('You should input your location.')
      return false
    }
    if (location) {
      if (!location['Country'] || 
        !location['City'] || 
        !location['StreetName'] ||
        !location['PostalCode'] ||
        !location['BuildingNumber']
      ) {
        setErrorMessage('Please input your location information correctly.')
        return false
      }
    }
    if (!photo) {
      setErrorMessage('Please upload your photo.')
      return false
    }
    if (!idcardFront) {
      setErrorMessage('Please upload your id card captured image.')
      return false
    }
    return true
  }
  const onDoneVerification = () => {
    setStatus('confirmed')
    setSuccessMessage('Your id card information is correct. Thank you!')
  }
  const onFailVerification = () => {
    setErrorMessage('Your id document information verification is failed.')
  }
  const complete = () => {
    history.push('/logout')
  }

  return (
    <React.Fragment>
      {status=='initial' &&
        <Grid container
          className={classes.contentRoot}
          spacing={3}
        >
          <Grid item sm={12} md={6}>
            <InformationForm onChangeFormData={onChangePersonInfo} />
            <LocationForm onChangeFormData={onChangeLocation} />
          </Grid>
          <Grid item sm={12} md={6}>
            <PhotoSection 
              onUploadImage={onUploadPhoto}
            />
            <IdcardSection 
              onUploadIdcardFront={onUploadIdcardFront}
              onChangeCardType={onChangeCardType}
            />
          </Grid>
          <Divider />
          <Grid item container xs={12}
            alignItems='center'
            justify='center'
          >
            <Button 
              color={'primary'}
              onClick={onSubmit}
              variant={'contained'}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      }
      {status=='confirmed' &&
        <Grid item 
          alignItems='center'
        >
          <p className={classes.descText}>
            <img className={classes.icon} src={successTicketIcon} style={{width:32}} />
            Congratulations! You have verified your account fully.</p>
        </Grid>
      }
      {status=='confirmed' &&
        <Box className={classes.stepActionsRoot}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={()=>complete()} 
          >
            Complete
          </Button>
        </Box>
      }


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

export default IdcardVerificationStep

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    width: 840,
  },
}))
