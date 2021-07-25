import React, { useEffect, useState } from 'react'
import {
  Modal,
  Fade,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
  CircularProgress,
  Snackbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton, Alert } from '@material-ui/lab'
import Popconfirm from 'components/confirm/Popconfirm'
import { countryStates, statesByCountry } from 'config/var'
import { callPutApiWithAuth } from 'utils/api'
import CloseIcon from '@material-ui/icons/Close'
// import { createMuiTheme } from '@material-ui/core/styles'

export default function ShippingAddressModal ({
  data,
  isOpened,
  afterUpdateSuccess,
  onErrorMessage,
  closeEdition,
}) {
  const classes = useStyles()
  const [formData, setFormData] = useState(undefined)
  const [updatingEl, setUpdatingEl] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [isUpdating, setIsUpdating] = useState(false)

  // const customTheme = createMuiTheme({
  //   breakpoints: {
  //     values: {
  //       xsm: 500,
  //     },
  //   },
  // })

  useEffect(() => {
    if (!data) return

    setFormData({
      shipping_address: data.shipping_detail.shipping_address,
      shipping_address_line2: data.shipping_detail.shipping_address_line2,
      shipping_country: data.shipping_detail.shipping_country,
      shipping_state: data.shipping_detail.shipping_state,
      shipping_city: data.shipping_detail.shipping_city,
      shipping_zipcode: data.shipping_detail.shipping_zipcode,
    })
  }, [data])

  const updateShipping = () => {
    if (
      !formData.shipping_address ||
      !formData.shipping_city ||
      !formData.shipping_state ||
      !formData.shipping_country ||
      !formData.shipping_zipcode
    ) {
      onErrorMessage(
        'Shipping country, state, city, address, postal code should be requred.'
      )
      return
    }
    setIsUpdating(true)
    callPutApiWithAuth(
      'profile/shipping_address',
      formData,
      onDoneUpdateShipping,
      onFailUpdateShipping
    )
  }
  const onDoneUpdateShipping = (data) => {
    setIsUpdating(false)
    afterUpdateSuccess('Shipping address updated.')
    closeEdition()
  }
  const onFailUpdateShipping = (errorMessage) => {
    onErrorMessage(errorMessage)
    setIsUpdating(false)
  }

  return (
    <Modal open={isOpened} onClose={closeEdition}>
      <Fade in={isOpened}>
        <div className={classes.modalRoot}>
          <Typography component={'h2'}>Update Shipping Address</Typography>
          <IconButton
            component='span'
            className={classes.close}
            onClick={closeEdition}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} className={classes.inputForm}>
                <FormControl
                  className={classes.formControl}
                  variant={'outlined'}
                >
                  <InputLabel className={classes.label}>Country:</InputLabel>
                  {formData ? (
                    <Select
                      value={formData.shipping_country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_state: statesByCountry(e.target.value)[0]
                            ?.name,
                          shipping_country: e.target.value,
                        })
                      }
                      className={classes.selectRoot}
                    >
                      {countryStates.map((country, k) => (
                        <MenuItem value={country['code2']} key={k}>
                          {country['name']}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} className={classes.inputForm}>
                <FormControl
                  className={classes.formControl}
                  variant={'outlined'}
                >
                  <InputLabel className={classes.label}>State/Province:</InputLabel>
                  {formData ? (
                    <Select
                      value={formData.shipping_state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_state: e.target.value,
                        })
                      }
                      disabled={isUpdating}
                      className={classes.selectRoot}
                    >
                      {statesByCountry(formData.shipping_country).map(
                        (state, k) => (
                          <MenuItem value={state['name']} key={k}>
                            {state['name']}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} className={classes.inputForm}>
                <FormControl className={classes.formControl} variant='outlined'>
                  <InputLabel>City:</InputLabel>
                  {formData ? (
                    <OutlinedInput
                      labelWidth={35}
                      value={formData.shipping_city}
                      inputProps={{
                        className: classes.inputField,
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_city: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} className={classes.inputForm}>
                <FormControl className={classes.formControl} variant='outlined'>
                  <InputLabel>Zip/Postal Code:</InputLabel>
                  {formData ? (
                    <OutlinedInput
                      labelWidth={105}
                      value={formData.shipping_zipcode}
                      inputProps={{
                        className: classes.inputField,
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_zipcode: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} className={classes.inputForm}>
                <FormControl className={classes.formControl} variant='outlined'>
                  <InputLabel>Address Line 1:</InputLabel>
                  {formData ? (
                    <OutlinedInput
                      labelWidth={70}
                      value={formData.shipping_address}
                      inputProps={{
                        className: classes.inputField,
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} className={classes.inputForm}>
                <FormControl className={classes.formControl} variant='outlined'>
                  <InputLabel>Address Line 2:</InputLabel>
                  {formData ? (
                    <OutlinedInput
                      labelWidth={120}
                      value={formData.shipping_address_line2}
                      inputProps={{
                        className: classes.inputField,
                      }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shipping_address_line2: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Skeleton height={24} />
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <div className={classes.actionGroup}>
              <div className={classes.btnWrapper}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                  onClick={(e) => setUpdatingEl(e.currentTarget)}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Save Shipping Address'
                  )}
                </Button>
                <Popconfirm
                  anchorEl={updatingEl}
                  onConfirm={() => {
                    updateShipping()
                    setUpdatingEl(null)
                  }}
                  onCancel={() => setUpdatingEl(null)}
                />
              </div>
              {/* <div className={classes.btnWrapper}>
                <Button 
                  className={classes.btn}
                  onClick={closeEdition}
                >
                  Close
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 3, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 60px)',
      left: '1%',
      top: '10%',
      transform: `translate(0, 20px)`,
    },
    [theme.breakpoints.only('sm')]: {
      left: '1%',
      top: '30%',
    },
  },
  inputForm: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      flexBasis: 'unset'
    },
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  form: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  formControl: {
    width: '100%',
    marginBottom: 8,
    '& label': {
      transform: 'translate(14px, 14px) scale(1)',
      background: '#fff',
      paddingRight: 6,
    },
  },
  btn: {
    width: '100%',
  },
  btnProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  btnWrapper: {
    position: 'relative',
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  inputField: {
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  selectRoot: {
    '& label': {
      background: '#fff',
    },
    '& .MuiSelect-select': {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  label: {
    background: '#fff',
    paddingRight: 6,
  },
}))
