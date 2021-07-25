import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { DateRangePicker } from "materialui-daterange-picker";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";

export default function DateRangeField(props) {
  const [open, setOpen] = React.useState(false);
  const {
    customClasses = {},
    showDropdownIcon = false,
    showClearIcon = false,
    disableUnderline = false,
    handleChange,
    clearFunc,
    className,
    ...rest
  } = props || {};
  const classes = useStyles();
  const setDateRange = (range) => {
    handleChange(range);
    setOpen(false);
  };
  const toggle = () => setOpen(!open);
  return (
    <div className={clsx(classes.root, customClasses.rootClass || {})}>
      <TextField
        {...rest}
        variant={"outlined"}
        value={
          props.value.startDate &&
          props.value.endDate &&
          `${moment(new Date(props.value.startDate)).format(
            "MMM D"
          )} - ${moment(new Date(props.value.endDate)).format("MMM D")}`
        }
        InputProps={{
          classes: {
            root: clsx(classes.inputRoot, customClasses.inputRoot || {}),
          },
          disableUnderline: disableUnderline || false,
        }}
        inputProps={{
          className: clsx(classes.inputField, customClasses.inputField || {}),
        }}
        onFocus={() => setOpen(true)}
        className={classes.searchInput}
      />
      {showDropdownIcon && (
        <ArrowDropDownIcon onClick={toggle} className={classes.caretDownIcon} />
      )}
      {showClearIcon && clearFunc && (
        <ClearIcon
          onClick={clearFunc}
          className={clsx(
            classes.caretDownIcon,
            customClasses.crossIconClass || {}
          )}
        />
      )}
      <DateRangePicker
        initialDateRange={props.value}
        open={open}
        toggle={toggle}
        onChange={(range) => setDateRange(range)}
        wrapperClassName={clsx(
          props.isToolbar ? classes.toolbarWrapper : classes.wrapper,
          props.leftAligned && classes.wrapperLeftAligned,
          props.bottomAligned && classes.wrapperBottomAligned
        )}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-flex",
  },
  searchInput: {
    width: '100%',
  },
  wrapper: {
    position: "absolute",
    left: -550,
  },
  toolbarWrapper: {
    position: "absolute",
    left: -695,
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
       left: -585,
      '& .MuiPaper-root > div': {
        flexDirection: 'column !important'
      },
    },
    [theme.breakpoints.down('xs')]: {
      left: -155,
      top: 40,
      '& .MuiPaper-root > div': {
        flexDirection: 'column !important'
      },
      '& .MuiPaper-root > div > div > div:first-child': {
        padding: '20px 12px',
      },
      '& .MuiPaper-root > div > div > div:nth-child(3)': {
        flexDirection: 'column !important'
      },
      '& .MuiPaper-root > div > div .MuiPaper-root > div > div > div:nth-child(3)': {
        flexDirection: 'row !important'
      },
      
      '& .MuiPaper-root > div > div .MuiPaper-root > div > div > div:first-child': {
        padding: '0px',
      },
    },
  },
  wrapperLeftAligned: {
    left: 0,
  },
  wrapperBottomAligned: {
    bottom: 0,
  },
  inputRoot: {},
  focused: {},
  inputField: {
    padding: "9px 6px",
  },
  caretDownIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
