import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select } from "@material-ui/core";

export default (props) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        select
        SelectProps={{
          native: true,
          classes: { root: classes.inputRoot, label: classes.labelField },
        }}
        // className={classes.inputRoot}
        inputProps={{
          className: classes.inputField
        }}
        InputLabelProps={{
          className: classes.labelRoot
        }}
        
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
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
    // backgroundColor: 'transparent !important'
  },  
  labelRoot: {
    transform: 'translate(14px, 10px) scale(1)'    
  },
  focused: {},
  inputField: {
    padding: '9px 6px',
  },
  errorMessage: {
    color: '#FF0000',
    paddingTop: '5px',
  },
}));
