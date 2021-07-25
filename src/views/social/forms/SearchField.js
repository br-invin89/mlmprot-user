import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export default (props) => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      InputProps={{
        classes: { root: classes.inputRoot },
        disableUnderline: true,
      }}
      inputProps={{
        className: classes.inputField,
      }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    border: `1px solid ${theme.palette.border.search}`,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: theme.palette.background.search,
    fontSize: "14px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {},
    "&$focused": {
      borderColor: theme.palette.border.search,
    },
  },
  focused: {},
  inputField: {
    padding: theme.spacing(0, 2),
    height: 32,
  },
}));
