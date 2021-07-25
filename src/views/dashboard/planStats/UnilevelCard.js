import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Card from "components/cards/Card";
import UnilevelTable from "./UnilevelTable";
import { callGetApiWithAuth } from "utils/api";
import UnilevelStat from "./UnilevelStat";
import clsx from "clsx";
import { asPrice } from "utils/text";
import { Skeleton } from '@material-ui/lab'

export default function UnilevelCard() {
  const classes = useStyles()
  const [statData, setStatData] = useState(undefined);
  const [isLoadingStatData, setIsLoadingStatData] = useState(false);

  useEffect(() => {
    searchStatData();
  }, []);
  const searchStatData = () => {
    setIsLoadingStatData(true);
    callGetApiWithAuth("myteam/unilevel/stats", onGetStatData, () =>
      setIsLoadingStatData(false)
    );
  };
  const onGetStatData = (data) => {
    setStatData(data.data);
    setIsLoadingStatData(false);
  };

  return (
    <Card>
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          className={clsx(classes.paddedGrid, classes.centerGrid)}
        >
          <Typography component="h3" className={classes.value}>
          {statData ? statData["personal_affiliates"] : <Skeleton width={80} />}
          </Typography>
          <Typography component="p" className={classes.title}>
            Personally Enrolled Affiliates
          </Typography>
          
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          className={clsx(classes.paddedGrid, classes.centerGrid)}
        >
          <Typography component="h3" className={classes.value}>
          {statData ? statData["personal_customers"] : <Skeleton width={80} />}
          </Typography>
          <Typography component="p" className={classes.title}>
          Personally Enrolled Customers
          </Typography>
         
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          className={clsx(classes.paddedGrid, classes.centerGrid)}
        >
          <Typography component="h3" className={classes.value}>
          {statData ? statData["total_affiliates"] : <Skeleton width={80} />}
          </Typography>
          <Typography component="p" className={classes.title}>
          Total Affiliates
          </Typography>
          
        </Grid>
        <Grid item xs={12} md={3} lg={3} className={clsx(classes.paddedGrid, classes.centerGrid)}>
          <Typography component="h3" className={classes.value}>
          {statData ? statData["total_customers"] : <Skeleton width={80} />}
          </Typography>
          <Typography component="p" className={classes.title}>
          Total Customers
          </Typography>
          
        </Grid>
      </Grid>
      <Grid container> 
        <Grid item xs={12}>
          <Typography className={classes.totalStats}>Unilevel</Typography>
          <hr className={classes.horizontalBorder} />
        </Grid>
        {/* <UnilevelStat /> */}
        <Grid item xs={12} md={12} lg={12}>
          <UnilevelTable />
        </Grid>
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  totalStats: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#31394D",
  },
  horizontalBorder: {
    border: "1px solid #F1F1F1",
  },
  paper: {
    display: "flex",
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  paddedGrid: {
    padding: theme.spacing(3.2, 3, 3.2, 3),
  },
  centerGrid:{
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.disabled,
  },
  value: {
    fontSize: 18,
  },
}))
