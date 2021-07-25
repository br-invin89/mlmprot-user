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
    border: "1px solid #CED2DA",
    overflow: "hidden",
    borderRadius: 31.5,

    border: "none",
    backgroundColor: theme.palette.primary.inverted,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {},
    "&$focused": {
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
  inputField: {
    padding: theme.spacing(0, 2),
    height: 36,
  },
}));
