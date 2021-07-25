import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import SummaryCard from './summary/SummaryCard'
// import RankBarCard from "./rankbar/RankBarCard";
import RankBarCard from './rankbar/RankBarCard'
import BalanceCard from './balance/BalanceCard'
import PlanStatsCard from './planStats/PlanStatsCard'
import BinaryCard from './planStats/BinaryCard'
import UnilevelCard from './planStats/UnilevelCard'
import MyAccountCard from './myAccount/MyAccountCard'
import BannerSection from './banner/BannerSection'
import NotificationSection from './notification/NotificationSection'

export default function DashboardPage() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BannerSection />
        </Grid>
        <Grid item xs={12}>
          <NotificationSection />
        </Grid>
        <Hidden lgUp>
          <Grid item xs={12} sm={12}>
            <SummaryCard />
          </Grid>
          <Grid item xs={12} sm={12}>
            <UnilevelCard />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyAccountCard />
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <Grid item md={12} xs={12}>
            <SummaryCard />
          </Grid>
          <Grid item lg={9} xs={12}>
            <UnilevelCard />
          </Grid>
          <Grid item md={3} xs={12}>
            <MyAccountCard />
          </Grid>
        </Hidden>
      </Grid> 
    </div> 
  );
};
