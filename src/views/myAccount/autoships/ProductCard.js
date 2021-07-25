import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import moment from "moment";
import clsx from 'clsx';
import Card from "components/cards/Card";
import Popconfirm from "components/confirm/Popconfirm";
import { asPrice } from "utils/text";
import { callPostApiWithAuth, callPutApiWithAuth } from "utils/api";
import { autoshipStatusText } from 'config/var';

export default function ProductCard ({ data, openEdition, afterSuccessUpdate, onError }) {
  const classes = useStyles();
  const myUser = useSelector((state) => state.auth.user);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState(undefined);
  const [activatingEl, setActivatingEl] = useState(null);
  const [deactivatingEl, setDeactivatingEl] = useState(null);
  const [cancelingEl, setCancelingEl] = useState(null);

  const handleDeactivate = () => {
    setIsDeactivating(true);
    callPutApiWithAuth(
      `autoships/${data.id}/change_status`,
      { status: 2 },
      onDoneDeactivate,
      onFailDeactivate
    );
  };
  const onDoneDeactivate = () => {
    setIsDeactivating(false);
    afterSuccessUpdate("Autoship paused.");
  };
  const onFailDeactivate = () => {
    setIsDeactivating(false);
  };
  const handleActivate = () => {
    setIsActivating(true);
    callPutApiWithAuth(
      `autoships/${data.id}/change_status`,
      { status: 1 },
      onDoneActivate,
      onFailActivate
    );
  };
  const onDoneActivate = () => {
    setIsActivating(false);
    afterSuccessUpdate("Thank you for completing your order. Check the box to save this payment information to your ALUVA account for future orders.");
  };
  const onFailActivate = (errMessage) => {
    setIsActivating(false);
    onError(errMessage)
  };
  const handleCancel = () => {
    setIsCanceling(true);
    callPutApiWithAuth(
      `autoships/${data.id}/change_status`,
      { status: 3 },
      onDoneCancel,
      onFailCancel
    );
  };
  const onDoneCancel = () => {
    setIsCanceling(false);
    afterSuccessUpdate("Autoship cancelled.");
  };
  const onFailCancel = () => {
    setIsCanceling(false);
  };

  return (
    <Card>
      <div className={classes.productRoot}>
        <Grid container spacing={3}>
          {/*
          <Grid item xs={12} md={3} lg={3}>
            <div className={classes.imageRoot}>
              <img
                src={data.product.image}
                alt="product image"
                width={140}
                height={146}
              />
            </div>
          </Grid>
          */}
          <Grid item xs={12}>
            <div className={classes.productInfo}>
              {/*
              <Typography component="h2" className={classes.title}>
                {data.product.title}
              </Typography>
              */}
              <List dense className={classes.list1}>
                <ListItem className={classes.listItem}>
                  <ListItemText>
                    {data.details.map(el => (
                      <img className={classes.itemThumb} 
                        src={el.product.image}
                        alt={el.product.title}
                      />
                    ))}
                  </ListItemText>
                </ListItem>
                <ListItem
                  className={classes.listItem}
                >
                  <ListItemText primary="Billing Date" />
                  <ListItemSecondaryAction className={classes.listText}>
                    {data.status == 2 ? 'Failed' : ordinal_suffix_of(data.day_of_month) +' day of every month'}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Status"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    <span className={`${classes.statusBadge} ${data.status==2?classes.failedStatusBadge:''}`}>
                      {autoshipStatusText(data.status)}
                    </span>
                  </ListItemSecondaryAction>
                </ListItem>
                {(data.pc_amount*1+data.tc_amount*1)>0 && 
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Credits"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {data.pc_amount*1+data.tc_amount*1}
                  </ListItemSecondaryAction>
                </ListItem>
                }
                {data.tc_amount>0 && 
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary=""
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={clsx(classes.listText, classes.errorText)}>
                    * Not enough credits
                  </ListItemSecondaryAction>
                </ListItem>
                }
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Shipping"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {asPrice(data.shipping_price)}
                  </ListItemSecondaryAction>
                </ListItem>
                {data.handling_fee && 
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Handling Charge"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {asPrice(data.handling_fee)}
                  </ListItemSecondaryAction>
                </ListItem>
                }
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Tax"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {asPrice(data.tax_amount)}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Total"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={clsx(classes.listText, classes.totalAmount)}>
                    {asPrice(data.order_total_amount)}
                  </ListItemSecondaryAction>
                </ListItem>
                {/*
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Price"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {asPrice(
                      myUser.type == 1
                        ? data.product.member_price
                        : data.product.retail_price
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                */}
                {/*
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Quantity"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {data.quantity}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Products"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listHeading}>
                    Quantity
                  </ListItemSecondaryAction>
                </ListItem>
                {data.details.map(el=>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    className={classes.listText}
                  >
                    {el.product.title}
                  </ListItemText>
                  <ListItemSecondaryAction className={classes.listText}>
                    {el.quantity}
                  </ListItemSecondaryAction>
                </ListItem>
                )}
                */}
              </List>
              <Divider className={classes.divider} />
              <List dense>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Last Billing Date"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {data.last_billing_at
                      ? moment(data.last_billing_at).format("MMM D, YYYY")
                      : ""}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Next Billing Date"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {data.next_billing_at
                      ? moment(data.next_billing_at).format("MMM D, YYYY")
                      : ""}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Created On"
                    className={classes.listHeading}
                  />
                  <ListItemSecondaryAction className={classes.listText}>
                    {moment(data.created_at).format("MMM D, YYYY")}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <div className={classes.productAction}>
                <div className={classes.btnWrapperGroup}>
                  <div className={classes.btnWrapper}
                    style={{ marginRight: 8 }}
                  >
                    <Button
                      variant="contained"
                      className={classes.btn}
                      onClick={(e) => openEdition(data)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className={classes.btnWrapper}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={`${classes.btn}`}
                      onClick={(e) => setCancelingEl(e.currentTarget)}
                      disabled={isCanceling}
                    >
                      Cancel
                    </Button>
                    {isCanceling && (
                      <CircularProgress
                        color={"primary"}
                        size={24}
                        className={classes.btnProgress}
                      />
                    )}
                    <Popconfirm
                      anchorEl={cancelingEl}
                      onConfirm={() => {
                        handleCancel();
                        setCancelingEl(null);
                      }}
                      onCancel={() => setCancelingEl(null)}
                    />
                  </div>
                </div>
                <div className={classes.btnWrapperGroup}>
                  {data.status == 2 && 
                  <div className={classes.btnWrapper} style={{width: 120}}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={`${classes.btn} ${classes.dangerBtn}`}
                      onClick={(e) => setActivatingEl(e.currentTarget)}
                      disabled={isActivating}
                    >
                      Pay Now
                    </Button>
                    {isActivating && (
                      <CircularProgress
                        color={"primary"}
                        size={24}
                        className={classes.btnProgress}
                      />
                    )}
                    <Popconfirm
                      anchorEl={activatingEl}
                      onConfirm={() => {
                        handleActivate();
                        setActivatingEl(null);
                      }}
                      onCancel={() => setActivatingEl(null)}
                    />
                  </div>
                  }
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  productRoot: {
    display: "flex",
  },
  imageRoot: {
    display: "flex",
    paddingTop: 24,
    justifyContent: "center",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: 18,
    paddingLeft: theme.spacing(2),
  },
  list1: {
    paddingBottom: 0,
  },
  listHeading: {
    fontWeight: 500,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listText: {
    color: theme.palette.text.disabled,
     [theme.breakpoints.down('xs')]: {
      position: 'static',
      paddingLeft: 16,
      marginTop: 10
    },
  },
  totalAmount: {
    fontWeight: 600,
  },
  errorText: {
    fontSize: 13,
    color: theme.palette.error.main,
  },
  productAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: 10
  },
  btnWrapper: {
    width: 92,
    position: "relative",
  },
  btnWrapperGroup: {
    display: 'flex',    
  },
  btn: {
    width: "100%",
    textTransform: "capitalize",
    fontSize: 14,
  },
  btnProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  itemThumb: {
    width: "50px",
    height: "60px",
    marginRight: "12px"
  },
  statusBadge: {
    fontSize: '0.9em', 
    
  },
  failedStatusBadge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.inverted,
    padding: '3px 12px',
    borderRadius: '4px',
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  dangerBtn: {
    borderColor: theme.palette.error.main+'!important',
    color: theme.palette.error.main+'!important',
    '&:hover': {
      backgroundColor: theme.palette.error.main+'!important'
    }
  },
  successBtn: {
    borderColor: theme.palette.success.main+'!important',
    color: theme.palette.success.main+'!important',
    '&:hover': {
      backgroundColor: theme.palette.success.main+'!important'
    }
  }
}));

function ordinal_suffix_of(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}
