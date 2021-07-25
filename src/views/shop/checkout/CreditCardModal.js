import React, { useEffect, useState } from "react";
import payment from 'payment';
import {
  Modal,
  Fade,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Skeleton, Alert } from "@material-ui/lab";
import Popconfirm from "components/confirm/Popconfirm";
import { countryStates, statesByCountry } from "config/var";
import { callPutApiWithAuth } from "utils/api";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import CreditCardInput from 'react-credit-card-input';

export default function CreditCardModal({
  data,
  isOpened,
  afterUpdateSuccess,
  onErrorMessage,
  closeEdition,
  isSelectedTab,
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    cc_name: '',
    cc_type: '',
    cc_number: '',
    cc_cvv: '',
    billing_country: '',
    billing_city: '',
    billing_state: '',
    billing_address: '',
    billing_address_line2: '',
    billing_zipcode: '',
  });
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [updatingInfoEl, setUpdatingInfoEl] = useState(null);
  const [updatingAddrEl, setUpdatingAddrEl] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState(undefined);
  const [cardType, setCardType] = useState('');
  const cardTypeOptions = [
    {
      value: 1,
      label: "Visa",
    },
    {
      value: 2,
      label: "Mastercard",
    },
    {
      value: 3,
      label: "Discover",
    },
    {
      value: 4,
      label: "Amex",
    },
    {
      value: 5,
      label: "Diners",
    },
  ];

  const varValue = (label) => {
    let value = 0;
    cardTypeOptions.forEach((el) => {
      if (el.label.toLowerCase() === label) {
        value = el.value;
      }
    });
    return value;
  };

  const MONTHS = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const getYears = () => {
    const max = new Date().getFullYear().toString().substr(-2);
    const years = [];
    for (let i = parseInt(max); i <= parseInt(max) + 10; i++) {
      years.push(i.toString());
    }
    return years;
  };

  useEffect(() => {
    if (!data) return;
    if (data.billing_detail.cc_exp_date) {
      setCardExpMonth(data.billing_detail.cc_exp_date.split("/")[0]);
      setCardExpYear(data.billing_detail.cc_exp_date.split("/")[1]);
    } else {
      setCardExpMonth('');
      setCardExpYear('');
    }
    
    setFormData({
      cc_name: data.billing_detail.cc_name,
      cc_type: data.billing_detail.cc_type,
      cc_number: data.billing_detail.cc_number,
      cc_cvv: data.billing_detail.cc_cvv,
      billing_country: data.billing_detail.billing_country,
      billing_city: data.billing_detail.billing_city,
      billing_state: data.billing_detail.billing_state,
      billing_address: data.billing_detail.billing_address,
      billing_address_line2: data.billing_detail.billing_address_line2,
      billing_zipcode: data.billing_detail.billing_zipcode,
    });
    setSelectedTab(isSelectedTab);
  }, [data]);

  const updateAddress = () => {
    if (
      !formData.billing_zipcode ||
      !formData.billing_country ||
      !formData.billing_city ||
      !formData.billing_state ||
      !formData.billing_address
    ) {
      onErrorMessage(
        "Billing Address, zip code, country, state, address, city are required."
      );
      return;
    }
    setIsUpdating(true);
    callPutApiWithAuth(
      "profile/billing_address",
      formData,
      onDoneUpdateAddress,
      onFailUpdateAddress
    );
  };
  const onDoneUpdateAddress = (data) => {
    setIsUpdating(false);
    afterUpdateSuccess("Billing info updated.");
    closeEdition();
  };
  const onFailUpdateAddress = (errorMessage) => {
    onErrorMessage(errorMessage);
    setIsUpdating(false);
  };

  const updateCredit = () => {
    if (
      formData.cc_name == '' ||
      formData.cc_type == 0 ||
      formData.cc_number == '' ||
      formData.cc_cvv == ''
    ) {
      onErrorMessage(
        "Credit card owner name, type, number, expiry date, cvv are required."
      );
      return;
    }
    let regex = /^\d{3}$/i;
    if (regex.exec(formData.cc_cvv) == null) {
      onErrorMessage("CVV Number should be 3 digit numbers");
      return;
    }
    formData.cc_exp_date = formData.cc_exp_date.replace( /\s/g, '')
    setIsUpdating(true);
    callPutApiWithAuth(
      "profile/credit_card",
      formData,
      onDoneUpdateCredit,
      onFailUpdateCredit
    );
  };

  const onDoneUpdateCredit = (data) => {
    setIsUpdating(false);
    afterUpdateSuccess("Credit card info updated.");
    closeEdition();
  };
  const onFailUpdateCredit = (errorMessage) => {
    onErrorMessage(errorMessage);
    setIsUpdating(false);
  };

  return (
    <Modal open={isOpened} onClose={closeEdition}>
      <Fade in={isOpened}>
        <div className={classes.modalRoot}>
          <Typography component={"h2"}>Update Billing Info</Typography>
          <IconButton
            component="span"
            className={classes.close}
            onClick={closeEdition}
          >
            <CloseIcon />
          </IconButton>
          <div>
            <Tabs
              className={classes.tabs}
              value={selectedTab}
              onChange={(_, tab) => setSelectedTab(tab)}
              aria-label=""
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                className={classes.tab}
                label="Billing Address"
                value="address"
              />
              <Tab
                className={classes.tab}
                label="Credit Card Info"
                value="info"
              />
            </Tabs>
          </div>
          <TabPanel selectedTab={selectedTab} tab="address">
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} className={classes.inputForm}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel>Address Line 1:</InputLabel>
                    {formData ? (
                      <OutlinedInput
                        labelWidth={70}
                        value={formData.billing_address}
                        inputProps={{
                          className: classes.inputField,
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_address: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={12} className={classes.inputForm}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel>Address Line 2:</InputLabel>
                    {formData ? (
                      <OutlinedInput
                        labelWidth={70}
                        value={formData.billing_address_line2}
                        inputProps={{
                          className: classes.inputField,
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_address_line2: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputForm}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel>City:</InputLabel>
                    {formData ? (
                      <OutlinedInput
                        labelWidth={35}
                        value={formData.billing_city}
                        inputProps={{
                          className: classes.inputField,
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_city: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputForm}>
                  <FormControl
                    className={classes.formControl}
                    variant={"outlined"}
                  >
                    <InputLabel className={classes.label}>
                      State/Province:
                    </InputLabel>
                    {formData ? (
                      <Select
                        value={formData.billing_state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_state: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                        className={classes.selectRoot}
                      >
                        {statesByCountry(formData.billing_country).map(
                          (state, k) => (
                            <MenuItem value={state["name"]} key={k}>
                              {state["name"]}
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
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel>Zip/Postal Code:</InputLabel>
                    {formData ? (
                      <OutlinedInput
                        labelWidth={75}
                        value={formData.billing_zipcode}
                        inputProps={{
                          className: classes.inputField,
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_zipcode: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputForm}>
                  <FormControl
                    className={classes.formControl}
                    variant={"outlined"}
                  >
                    <InputLabel className={classes.label}>Country:</InputLabel>
                    {formData ? (
                      <Select
                        value={formData.billing_country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billing_country: e.target.value,
                          })
                        }
                        className={classes.selectRoot}
                      >
                        {countryStates.map((country, k) => (
                          <MenuItem value={country["code2"]} key={k}>
                            {country["name"]}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <div className={classes.actionGroup}>
                <div className={classes.btnWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={(e) => setUpdatingAddrEl(e.currentTarget)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Save Billing Address"
                    )}
                  </Button>
                  <Popconfirm
                    anchorEl={updatingAddrEl}
                    onConfirm={() => {
                      updateAddress();
                      setUpdatingAddrEl(null);
                    }}
                    onCancel={() => setUpdatingAddrEl(null)}
                  />
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel selectedTab={selectedTab} tab="info">
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                  <FormControl
                    className={classes.cardNameFormControl}
                    variant="outlined"
                  >
                    <InputLabel>Name on Card:</InputLabel>
                    {formData ? (
                      <OutlinedInput
                        labelWidth={110}
                        value={formData.cc_name}
                        inputProps={{
                          className: classes.inputField,
                        }}
                        onChange={(e) =>
                          setFormData({ ...formData, cc_name: e.target.value })
                        }
                      />
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </FormControl>
                  <CreditCardInput
                    cardNumberInputProps={{ value: formData.cc_number, onChange: (e) =>
                      setFormData({
                        ...formData,
                        cc_number: e.target.value,
                        cc_type: varValue(payment.fns.cardType(e.target.value)),
                      })
                    } }
                    cardExpiryInputProps={{ value: formData.cc_exp_date, onChange: (e) => {
                      setFormData({
                        ...formData,
                        cc_exp_date: e.target.value,
                      });
                    } }}
                    cardCVCInputProps={{ value: formData.cc_cvv, onChange:  (e) =>
                      setFormData({
                        ...formData,
                        cc_cvv: e.target.value,
                      })
                    }}
                    fieldClassName={"input", classes.creditCardForm}
                  />
                </Grid>
              </Grid>
              <div className={classes.actionGroup}>
                <div className={classes.btnWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={(e) => setUpdatingInfoEl(e.currentTarget)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Save Credit Card Info"
                    )}
                  </Button>
                  <Popconfirm
                    anchorEl={updatingInfoEl}
                    onConfirm={() => {
                      updateCredit();
                      setUpdatingInfoEl(null)
                    }}
                    onCancel={() => setUpdatingInfoEl(null)}
                  />
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.btn}
                    component={Link}
                    to={"/shop/home"}
                    onClick={closeEdition}
                  >
                    Later
                  </Button>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </Fade>
    </Modal>
  );
}

const TabPanel = ({ children, selectedTab, tab }) => (
  <div role="tabpanel" hidden={selectedTab !== tab}>
    {children}
  </div>
);

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: "5px",
    padding: theme.spacing(2, 3, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.only("xs")]: {
      width: "80%",
      left: "3%",
      top: "1%",
      transform: `translate(0, 20px)`,
    },
    [theme.breakpoints.only('sm')]: {
      width: '550px',
      left: '50%',
      top: '50%',
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
  creditCardForm: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.6)',
    },
    '&:focus': {
      border: '1px solid #30c450',
    },
    '&:active': {
      border: '1px solid #30c450',
    },
    [theme.breakpoints.only('sm')]: {
      width: '375px',
      marginLeft: '3px',
    },
    [theme.breakpoints.up('md')]: {
      width: '395px',
      marginLeft: '3px',
    },
  },
  close: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  tabs: {
    minHeight: "32px",
    padding: "20px 0 0 0",
  },
  tab: {
    minHeight: "32px",
    minWidth: "auto",
    textTransform: "capitalize",
  },
  form: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  formControl: {
    width: "100%",
    marginBottom: 8,
    "& label": {
      transform: "translate(14px, 14px) scale(1)",
      background: "#fff",
      paddingRight: 6,
    },
  },
  cardNameFormControl: {
    marginBottom: 8,
    "& label": {
      transform: "translate(14px, 14px) scale(1)",
      background: "#fff",
      paddingRight: 6,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.only('sm')]: {
      width: '150px',
    },
    [theme.breakpoints.up('md')]: {
      width: '175px',
      marginLeft: '3px',
    },
  },
  btn: {
    width: "100%",
  },
  btnProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  btnWrapper: {
    position: "relative",
  },
  actionGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
  },
  inputField: {
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  selectRoot: {
    "& label": {
      background: "#fff",
    },
    "& .MuiSelect-select": {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  label: {
    background: "#fff",
    paddingRight: 6,
  },
}));
