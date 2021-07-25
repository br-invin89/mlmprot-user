import React from "react";
import clsx from "clsx";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { asDate } from 'utils/text';
import { ReactComponent as ConfirmCheckIcon } from "assets/icons/confirm_check.svg";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

export default function ConfirmationCard ({ children, className, title, subTitle, isFlagged,confirmResult }) {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)}>
      <CardContent className={classes.content}>
        <div className={classes.message}>
          {isFlagged == 2 ?
            <CheckCircleIcon className={classes.svgSuccessIcon} /> :
            <ErrorIcon className={classes.svgErrorlIcon} />
          }
          <Typography component="h2" variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Typography component="p" className={classes.subtitle}>
            {subTitle}
          </Typography>
        </div>
        <div className={classes.orderStatus}></div>
        {isFlagged == 2 ?
          <Typography component="p">Ordered</Typography> :
          <Typography component="p">Falgged</Typography> 
        }
        <Typography component="p" color="textSecondary">
          {asDate(confirmResult.order.created_at)}
        </Typography>
        {/*
        <Grid container spacing={3} className={classes.actions}>
          <Grid item xs={12} md={6} lg={6}>
            <Button fullWidth color="primary" variant="contained">
              Purchase
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Button fullWidth color="primary" variant="contained">
              Purchase
            </Button>
          </Grid>
        </Grid>
        */}
        {children}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  content: {
    padding: theme.spacing(2, 4, 3, 3),
  },
  title: {
    fontWeight: 500,
    width: "50%",
    textAlign: "center",
    margintop: theme.spacing(2),
  },
  subtitle: {
    fontWeight: 500,
    color: theme.palette.text.disabled,
    textAlign: "center",
    margintop: theme.spacing(1),
  },
  message: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  orderStatus: {
    position: "relative",
    height: 20,

    background: "#E4F1FF",
    borderRadius: 10.5,
    marginTop: theme.spacing(4),
  },
  actions: {
    marginTop: theme.spacing(3),
  },
  svgErrorlIcon: {
    fontSize: 50,
    color: '#F56B6E',
  },
  svgSuccessIcon: {
    fontSize: 50,
    color: '#45B854',
  },
}));
