import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Chart from "./earnigs/Chart";
import ChartCard from "components/cards/ChartCard";
import EarningsSummaryCard from "./earnigs/EarningsSummaryCard";
import EarningTable from "./earnigs/EarningTable";
import DetailModal from './earnigs/DetailModal'

export default function EarningsPage() {
  const [selectedId, setSelectedId] = useState(undefined)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <EarningsSummaryCard />
      </Grid>
      <Grid item xs={12}>
        <ChartCard title="Earnings Growth">
          <Chart />
        </ChartCard>
      </Grid>
      <Grid item xs={12}>
        <EarningTable 
          setSelectedId={setSelectedId}         
        />
        {selectedId &&
          <DetailModal selectedId={selectedId} 
            setSelectedId={setSelectedId}
          />
        }
      </Grid>
    </Grid>
  );
};
