import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Card from "components/cards/Card";
import BinaryTable from "./BinaryTable";
import UnilevelTable from "./UnilevelTable";
import BinaryDiagram from './BinaryDiagram'
import { callGetApiWithAuth } from 'utils/api'

import Tabs from "./Tabs";
import UnilevelStat from "./UnilevelStat";
const plan = process.env.REACT_APP_COMPENSATION_PLAN;

const PlanStatsCard = () => {
  const [selectedTab, setSelectedTab] = useState("Unilevel");  

  return (
    <Card>
      {selectedTab=='Binary'?
        <Grid container>
          <Grid item xs={12} md={5} lg={5}>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <BinaryTable />
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <BinaryDiagram />
          </Grid>
        </Grid>
      : selectedTab=='Unilevel'?
        <Grid container>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />        
          <UnilevelStat />
          <Grid item xs={12} md={12} lg={12}>
            <UnilevelTable />
          </Grid>
        </Grid>
      : ''}
    </Card>
  );
};

export default PlanStatsCard
