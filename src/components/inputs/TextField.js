import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export default (props) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        InputProps={{
          classes: { root: classes.inputRoot },
          endAdornment: props.endAdornment
        }}
        inputProps={{
          className: classes.inputField,
        }}
      />
      {props.errorMessage && props.errorMessage.length > 0 && (
        <>
          {props.errorMessage.map((el, index) => (
            <div className={classes.errorMessage} key={index}>{el.message}</div>
          ))}
        </>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'transparent !important',
  },
  focused: {},
  inputField: {
    padding: 10,
  },
  errorMessage: {
    color: '#FF0000',
    paddingTop: '5px',
  },
}));
