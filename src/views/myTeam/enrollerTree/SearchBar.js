import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import FormCard from 'components/cards/FormCard'
import SearchIcon from "@material-ui/icons/Search";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import DateRangeField from "components/inputs/DateRangeField";

export default function SearhBar(props) {
  const classes = useStyles();

  const [searchParam, setSearchParam] = useState({
    ...props.searchParam,
  });
  const [createdAtRange, setCreatedAtRange] = useState({
    startDate: "",
    endDate: "",
  });

  const handleSearch = () => {
    let created_at_range =
      createdAtRange.startDate && createdAtRange.endDate
        ? moment(createdAtRange.startDate).format("YYYY-MM-DD") +
          "|" +
          moment(createdAtRange.endDate).format("YYYY-MM-DD")
        : "";
    props.handleSearch({ ...searchParam, created_at_range });
  };

  return (
    <FormCard title={'Search Team Member'} className={classes.formCard}>
      <div className={classes.searchForm}>
        <TextField
          label="Search User ID..."
          name="id"
          value={searchParam.user_id}
          onChange={(e) =>
            setSearchParam({ ...searchParam, user_id: e.target.value })
          }
          className={clsx(classes.inputField, classes.searchUserID)}
        />
        <TextField
          label="Search Username..."
          name="username"
          value={searchParam.username}
          onChange={(e) =>
            setSearchParam({ ...searchParam, username: e.target.value })
          }
          className={clsx(classes.fieldMargin, classes.inputField, classes.searchUsername)}
        />
        <TextField
          label="Select Level"
          name="level"
          value={searchParam.level}
          onChange={(e) =>
            setSearchParam({ ...searchParam, level: e.target.value })
          }
          className={clsx(classes.fieldMargin, classes.inputField, classes.searchLevel)}
        />
        <DateRangeField
          label="Start/End Date"
          value={createdAtRange}
          showClearIcon={!!(createdAtRange.startDate && createdAtRange.endDate)}
          handleChange={(createdAtRange) => setCreatedAtRange(createdAtRange)}
          clearFunc={() => {
            setCreatedAtRange({
              startDate: '', endDate: '',
            });
            searchParam.created_at_range = "";
          }}
          customClasses={{rootClass: clsx(classes.fieldMargin, classes.inputField, classes.searchDateRange)}}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.submitBtn}
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </div>
    </FormCard>
  );
};

const useStyles = makeStyles((theme) => ({
  formCard: {
    marginBottom: theme.spacing(1)
  },
  fieldMargin: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  },
  searchForm: {
    flexWrap: "no-wrap",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      alignItems: "flex-start",
      display: "unset",
    },
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
      alignItems: "flex-start",
      display: "unset",
    },
  },
  submitBtn: {
    // marginLeft: theme.spacing(1),
    // marginTop: theme.spacing(1),
    height: '35px',
    marginTop: 10,
  },
  inputField: {
    minWidth: 150,
    marginRight: 10,
    marginTop: 10,
    "& label": {
      transform: "translate(12px, 12px) scale(1)",
    },
    [theme.breakpoints.down("md")]: {
      width: '45%',
      // margin: "3px 6px",
    },
    [theme.breakpoints.only("xs")]: {
      width: '100%',
    },
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
  selectField: {
    minWidth: 134,
    flexGrow: 1.2,
    [theme.breakpoints.down("md")]: {
      width: 250,
      margin: "3px 6px",
      flexGrow: 1,
    },
    "& .MuiTextField-root": {
      width: "100%",
    },
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
}));
