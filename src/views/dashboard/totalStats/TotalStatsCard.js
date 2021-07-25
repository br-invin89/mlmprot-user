import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PeopleLogo from "../../../assets/People.svg";
import FlagLogo from "../../../assets/Flag.svg";
import StatsHandbag from "../../../assets/StatsHandbag.svg";
import BriefcaseLogo from "../../../assets/Briefcase.svg";
import { asPrice, asNumber } from "../../../utils/text";
import { callGetApiWithAuth } from '../../../utils/api'

export default function TotalStatsCard() {
  const classes = useStyles();
  const [stats, setStats] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadStats()
  }, []);

  const loadStats = () => {
    setIsLoading(true)
    callGetApiWithAuth('dashboard/header_stats', onGetStats, onFailStats)
  }
  const onGetStats = (data) => {    
    setIsLoading(false)
    setStats(data.data)
  }
  const onFailStats = () => {
    setIsLoading(false)
  }

  return (
    <div className={classes.card}>
      <Typography className={classes.totalStats}>Total Stats</Typography>
      <hr className={classes.horizontalBorder} />
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item xs={6}>
          <div className={classes.cardContent}>
            <img src={PeopleLogo} className={classes.peopleLogo} />
            <Typography className={classes.name}>Customers</Typography>
          </div>
        </Grid>
        <Grid item container justify='flex-end' alignItems='center' xs={6}>
          <div className={classes.statsChip}>
            {isLoading?<LoadingOutlined spin />:stats?asNumber(stats.users_count.total_customers):'-'}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cardContent}>
            <img src={FlagLogo} className={classes.flagLogo} />
            <Typography className={classes.name}>Affiliate</Typography>
          </div>
        </Grid>
        <Grid item container justify='flex-end' alignItems='center' xs={6}>
          <div className={classes.statsChip}>
            {isLoading?<LoadingOutlined spin />:stats?asNumber(stats.users_count.affiliate_users_count):'-'}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cardContent}>
            <img src={StatsHandbag} className={classes.statslogo} />
            <Typography className={classes.name}>Autoships</Typography>
          </div>
        </Grid>
        <Grid item container justify='flex-end' alignItems='center' xs={6}>
          <div className={classes.statsChip}>
            {isLoading?<LoadingOutlined spin />:stats?asNumber(stats.autoships):'-'}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.cardContent}>
            <img src={BriefcaseLogo} className={classes.briefLogo} />
            <Typography className={classes.name}>Commissions</Typography>
          </div>
        </Grid>
        <Grid item container justify='flex-end' alignItems='center' xs={6}>
          <div className={classes.statsChip}>
            {isLoading?<LoadingOutlined spin />:stats?asPrice(stats.commissions_earned):'-'}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};


const useStyles = makeStyles((theme) => ({
  card: {
    filter: "drop-shadow(10px 10px 10px #E5E9F2)",
    boxShadow: "0px 2px 10px #E5E9F2",
    padding: "16px",
    paddingLeft: "24px",
    paddingTop: "24px",
    padddingRight: "16px",
    paddingBottom: "36px",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    paddingLeft: "0px",
  },
  peopleLogo: {
    padding: "8px",
    borderRadius: "50%",
    background: "#F9F2FF",
    marginRight: "16px",
  },
  flagLogo: {
    padding: "10px",
    borderRadius: "50%",
    background: "#FFEFF6",
    marginRight: "16px",
  },
  statslogo: {
    padding: "10px",
    borderRadius: "50%",
    background: "#EEF3FF",
    marginRight: "16px",
  },
  briefLogo: {
    padding: "10px",
    borderRadius: "50%",
    background: "#E6FFF9",
    marginRight: "16px",
  },
  totalStats: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#31394D",
  },
  horizontalBorder: {
    border: "1px solid #F1F1F1",
  },
  chip: {
    background: "#97A1B9",
  },
  statsChip: {
    padding: "4px 28px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#97A1B9",
    color: "white",
    borderRadius: "50px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#31394D",
    fontStyle: "normal",
  },
}));
