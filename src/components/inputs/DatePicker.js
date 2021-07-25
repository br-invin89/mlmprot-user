import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function DatePickerField({ selectedDate, handleDateChange, className }) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        variant="inline"
        autoOk
        format="MMM DD"
        value={selectedDate}
        onChange={handleDateChange}
        className={className}
        InputProps={{
          classes: { root: classes.inputRoot },
        }}
        inputProps={{
          className: classes.inputField,
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRoot: {},
  focused: {},
  inputField: {
    padding: 6,
  },
}));

export default DatePickerField;
