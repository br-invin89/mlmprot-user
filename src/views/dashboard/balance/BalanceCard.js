import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, CardContent, Typography, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Card from "components/cards/Card";
import { ReactComponent as WalletIcon } from "assets/icons/wallet.svg";
import { ReactComponent as ReloadIcon } from "assets/icons/reload.svg";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from "utils/api";

export default () => {
  const classes = useStyles();
  const [totalAmount, setTotalAmount] = useState(undefined);
  const [withdrawnAmount, setWithdrawnAmount] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    callGetApiWithAuth("wallet/amount", onGetBalance, () =>
      setIsLoading(false)
    );
  };
  const onGetBalance = (data) => {
    setIsLoading(false);
    setTotalAmount(data.wallet.current_balance);
    setWithdrawnAmount(data.wallet.withdrawn_amount);
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} justify="center" className={classes.walletRoot}>
          <WalletIcon />
          <Typography component="p" className={classes.linkWrapper}>
            <Link
              to="/credit-wallet/transfer-commissions"
              className={classes.link}
            >
              Credit Wallet <br/>Balance
            </Link>
          </Typography>
          <Typography component="p" className={classes.amount}>
            {totalAmount !== undefined ? (
              asPrice(totalAmount)
            ) : (
              <Skeleton variant="text" width={60} />
            )}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} justify="center" className={classes.withDrawnRoot}>
          <ReloadIcon />
          <Typography component="p" className={classes.linkWrapper}>
            <Link
              to="/credit-wallet/transfer-commissions"
              className={classes.link}
            >
              Total <br/>withdrawn
            </Link>
          </Typography>
          <Typography component="p" className={classes.amount}>
            {withdrawnAmount !== undefined ? (
              asPrice(withdrawnAmount)
            ) : (
              <Skeleton variant="text" width={60} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  walletRoot: {
    textAlign: "center",
  },
  link: {
    textDecoration: "underline",
    fontSize: 14,
    color: theme.palette.info.main,
  },
  linkWrapper: {
    lineHeight: 1.2,
  },
  amount: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    display: "flex",
    justifyContent: "center",
  },
  withDrawnRoot: {
    textAlign: "center",
    paddingTop: theme.spacing(1.8),
  },
  divider: {
    width: "100%",
  },
}));
