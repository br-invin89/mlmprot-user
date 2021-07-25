import React, { useState } from "react";
import { Grid, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TableChartIcon from "@material-ui/icons/TableChart";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import UnilevelTreePage from "./UnilevelTreePage";
import UnilevelGraphPage from "./BinaryTreePage";

export default function UnilevelPage() {
  const classes = useStyles();
  const [view, setView] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className={classes.iconContainer}>
          <span>List View</span>
          <Switch
            color="primary"
            checked={view}
            onChange={(e) => setView(e.target.checked)}
          />
          <span>Tree View</span>
          {/* <TableChartIcon
            onClick={() => setView("table")}
            className={classes.viewCardIcon}
            style={{ color: view === "table" ? "#1bdbbd" : "black" }}
          />
          <AccountTreeIcon
            onClick={() => setView("tree")}
            className={classes.viewCardIcon}
            style={{ color: view === "tree" ? "#1bdbbd" : "black" }}
          /> */}
        </div>
      </Grid>
      <Grid item xs={12}>
        {!view ? <UnilevelTreePage /> : <UnilevelGraphPage />}
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewCardIcon: {
    cursor: "pointer",
    marginLeft: 10,
    width: 30,
    height: 30,
  },
}));
