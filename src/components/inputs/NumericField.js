import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export default (props) => {
  const classes = useStyles();
  return (
    <TextField
      type={'number'}
      {...props}
      InputProps={{
        classes: { root: classes.inputRoot },
      }}
      inputProps={{
        className: classes.inputField,
      }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'transparent !important',
  },
  focused: {},
  inputField: {
    padding: 6,
  },
}));
