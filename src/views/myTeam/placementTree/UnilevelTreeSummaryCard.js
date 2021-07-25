import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Paper, Typography, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { callGetApiWithAuth } from "utils/api";
import { asPrice } from "utils/text";

export default ({ className }) => {
  const classes = useStyles();

  const [statData, setStatData] = useState(undefined);
  const [isLoadingStatData, setIsLoadingStatData] = useState(false);

  useEffect(() => {
    searchStatData();
  }, []);
  const searchStatData = () => {
    setIsLoadingStatData(true);
    callGetApiWithAuth("earnings/stats", onGetStatData, () =>
      setIsLoadingStatData(false)
    );
  };
  const onGetStatData = (data) => {
    setStatData(data.data);
    setIsLoadingStatData(false);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Personally Enrolled Affiliates
          </Typography>
          <Typography component="h3" className={classes.value}>
            {statData ? statData["7_days"] : <Skeleton width={80} />}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Personally Enrolled Customers
          </Typography>
          <Typography component="h3" className={classes.value}>
            {statData ? statData["30_days"] : <Skeleton width={80} />}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Total Affiliates
          </Typography>
          <Typography component="h3" className={classes.value}>
            {statData ? statData["total_earnings"] : <Skeleton width={80} />}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3} className={classes.paddedGrid}>
          <Typography component="p" className={classes.title}>
            Total Customers
          </Typography>
          <Typography component="h3" className={classes.value}>
            {statData ? statData["wallet"] : <Skeleton width={80} />}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  paddedGrid: {
    padding: theme.spacing(3.2, 3, 3.2, 3),
  },
  borderGrid: {
    borderRight: `1px solid #F5F0F0`,
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.disabled,
  },
  value: {
    fontSize: 18,
  },
}));
