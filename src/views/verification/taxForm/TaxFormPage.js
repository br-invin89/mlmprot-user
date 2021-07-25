import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { 
  Grid, Button, 
  Snackbar, Backdrop, CircularProgress,
  Dialog, DialogTitle, DialogActions,  
} from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import FormCard from "components/cards/FormCard";
import IndividualForm from "./IndividualForm";
import DocumentDetailsForm from "./DocumentDetailsForm";
import BusinessForm from "./BusinessForm";
import BothForm from "./BothForm";
import { callPostApiWithAuth } from 'utils/api'

export default function TaxInfoPage() {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    ssn_tax_id: "",
    type: 1,
    first_name: "",
    last_name: "",
    middle_name: "",
    business_name: "",
    address: "",
    address_line2: "",
    state: "",
    city: "",
    zip_code: "",
    phone: "",
  });
  const [isUpdating, setIsUpdating] = useState(false)
  const [needsUpdateConfirm, setNeedsUpdateConfirm] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [snackErrorMessage, setSnackErrorMessage] = useState('')

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errorMessages0 = [];
    let isValid = true;
    if (!formData.ssn_tax_id) {
      errorMessages0.push({
        name: 'ssn_tax_id',
        message: 'Please input SSN Number/Tax ID',
      });
      isValid = false;
    }
    if (formData.type==1 && !formData.first_name) {
      errorMessages0.push({
        name: 'first_name',
        message: 'Please input First Name',
      });
      isValid = false;
    }
    // if (formData.type==1 && !formData.middle_name) {
    //   errorMessages0.push({
    //     name: 'middle_name',
    //     message: 'Please input Middle Name',
    //   });
    //   isValid = false;
    // }
    if (formData.type==1 && !formData.last_name) {
      errorMessages0.push({
        name: 'last_name',
        message: 'Please input Last Name',
      });
      isValid = false;
    }
    if (formData.type==2 && !formData.business_name) {
      errorMessages0.push({
        name: 'business_name',
        message: 'Please input Business Name',
      });
      isValid = false;
    }
    if (!formData.address) {
      errorMessages0.push({
        name: 'address',
        message: 'Please input Address Line 1',
      });
      isValid = false;
    }
    if (!formData.state) {
      errorMessages0.push({
        name: 'state',
        message: 'Please select State',
      });
      isValid = false;
    }
    if (!formData.city) {
      errorMessages0.push({
        name: 'city',
        message: 'Please input City',
      });
      isValid = false;
    }
    if (!formData.zip_code) {
      errorMessages0.push({
        name: 'zip_code',
        message: 'Please input Zip Code',
      });
      isValid = false;
    }
    if (!formData.phone) {
      errorMessages0.push({
        name: 'phone',
        message: 'Please input Phone',
      });
      isValid = false;
    }

    setErrorMessages(errorMessages0)
    
    return isValid
  }

  const handleSubmit = () => {
    if (!validateForm()) return 
    setIsUpdating(true)
    callPostApiWithAuth('tax_form/upload', formData, onUploadSuccess, onUploadFail)
  }

  const onUploadSuccess = () => {
    setIsUpdating(false)
    setSuccessMessage('Tax updated successfully')
    setTimeout(() => {
      history.push('/logout');
    }, 1000)
  }
  const onUploadFail = (snackErrorMessage) => {
    setIsUpdating(false)
    setSnackErrorMessage(snackErrorMessage)
  }

  useEffect(() => {
    if (!history.location.pathname.includes('tax-form')) {
      history.push('/tax-form')
    }
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormCard title="SNS Number and Type">
                <DocumentDetailsForm
                  handleChange={handleChange}
                  formData={formData}
                  errorMessages={errorMessages}
                />
              </FormCard>
            </Grid>
            {formData.type == 2 ? (
              <Grid item xs={12}>
                <FormCard title="For Business">
                  <BusinessForm
                    handleChange={handleChange}
                    formData={formData}
                    errorMessages={errorMessages}
                  />
                </FormCard>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <FormCard title="For Individual">
                  <IndividualForm
                    handleChange={handleChange}
                    formData={formData}
                    errorMessages={errorMessages}
                  />
                </FormCard>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormCard title="For Both">
                <BothForm handleChange={handleChange} formData={formData} errorMessages={errorMessages} />
              </FormCard>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setNeedsUpdateConfirm(true)}
              >
                Submit For Review
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={snackErrorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r=='timeout') setSnackErrorMessage('')
        }}
      >
        <Alert severity="error" 
          variant="filled"
          onClose={()=>setSnackErrorMessage('')}
        >
          {snackErrorMessage}
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
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: 23,
    paddingTop: theme.spacing(3),
    width: 324,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 500,
  },
  summaryCard: { height: "100%" },
  backdrop: {
    zIndex: 9999,
  },
}));