import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { 
  Paper, Typography, Grid,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import { asNumber } from "utils/text";
import { callGetApiWithAuth } from 'utils/api'
import { ReactComponent as ArrowUpIcon } from "assets/icons/arrow-up.svg";

export default function SummaryCard () {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [statData, setStatData] = useState(undefined)

  const loadStatData = () => {
    setIsLoading(true)
    callGetApiWithAuth('myteam/stats', onGetStatData, ()=>setIsLoading(false))
  }
  const onGetStatData = (data) => {
    setStatData(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadStatData()
  }, [])

  return (
    <Paper className={classes.paper}>
      <Grid container>
        {/* <Grid item xs={12} md={6} lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Enroller Tree BV
          </Typography>
          <Typography component="h3" className={classes.value}>
            <Typography component="span">
              {data ? 
                asNumber(data.tree_bv) 
              : <Skeleton width={80} />
              }
            </Typography>
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={6} lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Enroller Tree CV This Month
          </Typography>
          <Typography component="h3" className={classes.value}>
            <Typography component="span">
              {statData ? 
                asNumber(statData.tree_bv_this_month) 
              : <Skeleton width={80} />}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}
          className={clsx(classes.paddedGrid, classes.borderGrid)}
        >
          <Typography component="p" className={classes.title}>
            Personally Enrolled Members
          </Typography>
          <Typography component="h3" className={classes.value}>
            {statData ? 
              asNumber(statData.personally_enrolled) 
            : <Skeleton width={80} />}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3} className={clsx(classes.paddedGrid, classes.borderGrid)}>
          <Typography component="p" className={classes.title}>
            New Distributors This Month
          </Typography>
          <Typography component="h3" className={classes.value}>
            <Typography component="span">
              {statData ? 
                asNumber(statData.new_affiliates_this_month) 
              : <Skeleton width={80} />}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3} className={classes.paddedGrid}>
          <Typography component="p" className={classes.title}>
            New Customers This Month
          </Typography>
          <Typography component="h3" className={classes.value}>
            <Typography component="span">
              {statData ? 
                asNumber(statData.new_customers_this_month) 
              : <Skeleton width={80} />}
            </Typography>
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
    [theme.breakpoints.down("md")]: {
      borderBottom: `1px solid #F5F0F0`,
    },
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.disabled,
  },
  value: {
    fontSize: 18,
    marginTop: 17,
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 500,
  },
  success: {
    color: theme.palette.success.light,
    fontSize: 14,
  },
  verticleMiddle: {
    verticalAlign: "middle",
  },
}));
