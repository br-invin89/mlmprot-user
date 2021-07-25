import React, { useState, useEffect } from 'react'
import clsx from "clsx";
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/styles";
import { 
  Grid, Button, Typography,
  Snackbar, Backdrop, CircularProgress,
  Dialog, DialogTitle, DialogActions,   
} from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { callPostApiWithAuth } from 'utils/api'
import Card from "components/cards/Card";
import checkIcon from 'assets/icons/tick_square.svg';
import Dropzone from 'react-dropzone'
import frameIcon from 'assets/icons/frame.svg';
import upgradeIcon from 'assets/icons/Upgrade.svg';
import { MicNone } from '@material-ui/icons';

export default function AccountVerificationPage() {
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [needsUpdateConfirm, setNeedsUpdateConfirm] = useState(false)
  const [files, setFiles] = useState([]);
  const [photo, setPhoto] = useState();
  const [credit, setCredit] = useState();

  const handleSubmit = () => {
    if (!validateForm()) return
    const formData = {
      id_photo: photo.preview,
      cc_photo: credit.preview,
    }
    setIsUpdating(true)
    callPostApiWithAuth('verification/upload', formData, onUploadSuccess, onUploadFail)
  }
  const validateForm = () => {
    if (!photo || 
      !credit
    ) {
      setErrorMessage('Please input id card & credit card photo')
      return false
    }
    return true
  }
  const onUploadSuccess = () => {
    setIsUpdating(false)
    setSuccessMessage('Verification images uploaded successfully')
    setTimeout(() => {
      history.push('/logout');
    }, 1000)
  }
  const onUploadFail = (errorMessage) => {
    setIsUpdating(false)
    setErrorMessage(errorMessage)
  }

  const handlePhotoUpload = (acceptedFiles) => {
    let imageData;
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        imageData = Object.assign(file, {
          preview: reader.result,
        });
        setPhoto(imageData)
      }
      // reader.readAsArrayBuffer(file)
    })
  } 

  const handleCreditUpload = (acceptedFiles) => {
    let imageData;
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        imageData = Object.assign(file, {
          preview: reader.result,
        });
        setCredit(imageData)
      }
      // reader.readAsArrayBuffer(file)
    })
  } 
  
  useEffect(() => {
    if (!history.location.pathname.includes('verification')) {
      history.push('/verification')
    }
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card title="Note">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography className={classes.text}>
                Our Anti-Fraud system is to ensure that you are not a victim of credit card fraud, and its an extra layer of security to protect the company. It is completely safe to send in your Photo ID &amp; Credit Card to have your transaction cleared. After submitting your documents, your transaction will be cleared within 24 hours.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card title="Photo ID">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <label className={classes.permitted}>Permitted</label>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Driver's License</div>
              </Grid>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Passport</div>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Must Match Name On Account </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.bannerContainer}>
                {photo && photo.preview &&  <img src={photo.preview} className={classes.bannerImage} />}
              </div>
              <Dropzone accept="image/*" onDrop={acceptedFiles => handlePhotoUpload(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className={classes.dropzone}>
                    <div {...getRootProps()} style={{outline: 'none'}}>
                      <input {...getInputProps()} />
                      <Grid container direction="row" alignItems="center" width={'80%'}>
                        <img src={frameIcon} />
                        <p className={classes.dropzoneText}>
                          Drag &amp; Drop Photo or Select file.
                          <br/>
                          <button className={classes.chooseButton}>Choose File</button>
                        </p>
                      </Grid>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card title="Credit ID">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <label className={classes.permitted}>Permitted</label>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Front of Credit Card</div>
              </Grid>
            </Grid>
            <Grid item sm={12} lg={6}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Back of Credit Card</div>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container direction="row" alignItems="center">
                <img src={checkIcon} />
                <div className={classes.checktxt}>Must Be Credit Card Used For This Transaction</div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.bannerContainer}>
                {credit && credit.preview &&  <img src={credit.preview} className={classes.bannerImage} />}
              </div>
              <Dropzone accept="image/*" onDrop={acceptedFiles => handleCreditUpload(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className={classes.dropzone}>
                    <div {...getRootProps()} style={{outline: 'none'}}>
                      <input {...getInputProps()} />
                      <Grid container direction="row" alignItems="center" width={'80%'} style={{outline: 'none'}}>
                        <img src={frameIcon} />
                        <p className={classes.dropzoneText}>
                          Drag &amp; Drop Photo or Select file.
                          <br/>
                          <button className={classes.chooseButton}>Choose File</button>                        </p>
                      </Grid>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<img src={upgradeIcon} />}
          onClick={()=>setNeedsUpdateConfirm(true)}
        >
          Submit for Review
        </Button>

      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={errorMessage}
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
        open={successMessage}
        autoHideDuration={2000}
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
      <Dialog 
        open={needsUpdateConfirm}
        onClose={()=>{
          setNeedsUpdateConfirm(false)
        }}
      >
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogActions>
          <Button color='secondary'
            onClick={()=>{
              setNeedsUpdateConfirm(false)
            }}
          >
            No
          </Button>
          <Button color='primary'
            onClick={()=>{
              handleSubmit()
              setNeedsUpdateConfirm(false)
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {(isUpdating) &&
        <Backdrop open={true} className={classes.backdrop}>
          <CircularProgress color="secondary" />
        </Backdrop>
      }
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    minHeight: 200,
  },
  noteRoot: {
    padding: theme.spacing(3),
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    color: '#737685',
    marginTop: 10,
  },
  permitted: {
    color: "#6BBA21",
    fontSize: 13,
    fontWeight: 500,
    padding: "4px 8px",
    background: "#EEFBD2",
    borderRadius: 6,
  },
  checktxt: {
    fontSize: 14,
    fontWeight: 500,
    color: '#000000',
  },
  loadSpin: {
    position: "absolute",
    left: "calc(50% - 24px)",
    top: 100,
  },
  actionGroup: {
    display: "flex",
    justifyContent: "center",
  },
  dropzone: {
    background: "#FBFAFC",
    borderRadius: 6,
    padding: 20,
    outline: 'none',
  },
  dropzoneText: {
    color: "#2B2C34",
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  chooseButton: {
    color:'#8974EE',
    fontSize: 13,
    fontWeight: 500,
    background: '#FBFAFC',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.08)',
    borderRadius: '6px',
    padding: '8px 17px',
    border: '1px solid #D1D1E9',
    marginTop: 10,
    outline: 'none',
  },
  backdrop: {
    zIndex: 9999,
  },
  bannerContainer: {
    width: '100%',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '100%',
    width: 'auto',
    objectFit: 'cover',
  },
}));
