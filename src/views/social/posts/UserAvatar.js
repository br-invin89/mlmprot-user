import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";

export default ({ data, width = 62, height = 62 }) => {
  const classes = useStyle({ width, height });

  return (
    <Avatar alt={data.name} src={data.avatar} className={classes.avatar} />
  );
};

const useStyle = makeStyles((theme) => ({
  avatar: {
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
}));
