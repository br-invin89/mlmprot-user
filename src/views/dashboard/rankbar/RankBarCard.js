import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Grid,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Card from "components/cards/Card";
import { Skeleton } from "@material-ui/lab";
import { callGetApiWithAuth } from "utils/api";
import { asNumber } from "utils/text";
import { ReactComponent as CircleBackground } from "assets/icons/circle.svg";
import ProgressBar from "components/progressBar/ProgressBar";
import useStyles from "./RankBarCard.style";
import { calculatePercent } from "./RankBarCard.func";
import { FormatListBulletedSharp } from "@material-ui/icons";

export default () => {
  const classes = useStyles();
  const [data, setData] = useState(undefined);
  const [calculatedData, setCalculatedData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(FormatListBulletedSharp)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true)
    callGetApiWithAuth("profile", onGetUserData, ()=>setIsLoading(false));
  };
  const onGetUserData = (data) => {
    setIsLoading(false)
    setData(data.user);
    setCalculatedData(calculatePercent(data.user));
  };

  return (
    <Card>
      <div>
        <Typography component="p" className={classes.textContainer}>
          <Typography component="span" className={classes.textCurrentRank}>
            {isLoading ? <Skeleton variant="text" width={100} />
            : data && data['rank'] ? data["rank"]["name"]
            : '-'}
          </Typography>
          <Typography component="span" className={classes.textVolume}>
            {isLoading?  <Skeleton variant="text" width={120} />
            : calculatedData?
              (calculatedData["totalLimit"] - calculatedData["totalArchived"]) + " volume till next rank"
            : ''}
          </Typography>
          <Typography component="span" className={classes.textNextRank}>
            {isLoading ? <Skeleton variant="text" width={100} />
            : data && data['next_rank'] ? data["next_rank"]["name"]
            : '-'}
          </Typography>
        </Typography>
        <ProgressBar value={calculatedData ? calculatedData.totalPercent : 0} />
      </div>
      <Grid container className={classes.statRoot}>
        <Grid item key={"pv"} className={classes.circle}>
          <div className={classes.circleContainer}>
            <CircleBackground />
            <Typography component="p" className={clsx(classes.score)}>
              {isLoading? <CircularProgress size={24} />
              : data ? (
                asNumber(data['qualifications']['pv']) + "/" + asNumber(data['next_rank']['settings']['pv'])
              ) : '-'}
            </Typography>
            <Typography component="p" className={classes.text1}>
              {"Personal Volume"}
            </Typography>
          </div>
        </Grid>
        <Grid item key={"gv"} className={classes.circle}>
          <div className={classes.circleContainer}>
            <CircleBackground />
            <Typography component="p" className={clsx(classes.score)}>
              {isLoading? <CircularProgress size={24} />
              : data ? (
                asNumber(data['qualifications']['gv']) + "/" + asNumber(data['next_rank']['settings']['gv'])
              ) : '-'}
            </Typography>
            <Typography component="p" className={classes.text1}>
              {"Group Volume"}
            </Typography>
          </div>
        </Grid>
        <Grid item key={"pe"} className={classes.circle}>
          <div className={classes.circleContainer}>
            <CircleBackground />
            <Typography component="p" className={clsx(classes.score)}>
              {isLoading? <CircularProgress size={24} />
              : data ? (
                asNumber(data['qualifications']['pe']) + "/" + asNumber(data['next_rank']['settings']['pe'])
              ) : '-'}
            </Typography>
            <Typography component="p" className={classes.text1}>
              {"Personal Enrollments"}
            </Typography>
          </div>
        </Grid>
        <Grid item key={"left_brand_partners"} className={classes.circle}>
          <div className={classes.circleContainer}>
            <CircleBackground />
            <Typography component="p" className={clsx(classes.score)}>
              {isLoading? <CircularProgress size={24} />
              : data ? (
                asNumber(data['qualifications']['left_brand_partners']) + "/" + asNumber(data['next_rank']['settings']['left_brand_partners'])
              ) : '-'}
            </Typography>
            <Typography component="p" className={classes.text1}>
              {"Left Brand Partners"}
            </Typography>
          </div>
        </Grid>
        <Grid item key={"right_brand_partners"} className={classes.circle}>
          <div className={classes.circleContainer}>
            <CircleBackground />
            <Typography component="p" className={clsx(classes.score)}>
              {isLoading? <CircularProgress size={24} />
              : data ? (
                asNumber(data['qualifications']['right_brand_partners']) + "/" + asNumber(data['next_rank']['settings']['right_brand_partners'])
              ) : '-'}
            </Typography>
            <Typography component="p" className={classes.text1}>
              {"Right Brand Partners"}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
