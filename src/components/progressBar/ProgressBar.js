import React from "react";
import { makeStyles, withStyles } from "@material-ui/styles";

import { LinearProgress } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: (props) => props.height,
    borderRadius: 10.5,
  },
  colorPrimary: {
    backgroundColor: "#E4F1FF",
  },
  bar: {
    borderRadius: 10.5,
    backgroundColor: (props) => props.highlightColor,
  },
}));

export default ({ height = 20, highlightColor = "#4A90E2", value }) => {
  const classes = useStyle({ height, highlightColor });
  return (
    <LinearProgress
      variant="determinate"
      value={value}
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        bar: classes.bar,
      }}
    />
  );
};
