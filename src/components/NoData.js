import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import MoodBadIcon from "@material-ui/icons/MoodBad";

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.noData}>
      <MoodBadIcon />
      <Typography component="p" color="textSecondary">
        No Data
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
}));
