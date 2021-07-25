import React, { useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "components/inputs/TextField";
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
    <div className={classes.searchForm}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label="Search User ID..."
            name="id"
            value={searchParam.user_id}
            onChange={(e) =>
              setSearchParam({ ...searchParam, user_id: e.target.value })
            }
            className={clsx(classes.inputField, classes.searchUserID)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label="Search Username..."
            name="username"
            value={searchParam.username}
            onChange={(e) =>
              setSearchParam({ ...searchParam, username: e.target.value })
            }
            className={clsx(
              classes.fieldMargin,
              classes.inputField,
              classes.searchUsername
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DateRangeField
            label="Start/End Date"
            value={createdAtRange}
            showClearIcon={
              !!(createdAtRange.startDate && createdAtRange.endDate)
            }
            handleChange={(createdAtRange) => setCreatedAtRange(createdAtRange)}
            clearFunc={() => {
              setCreatedAtRange({
                startDate: "",
                endDate: "",
              });
              searchParam.created_at_range = "";
            }}
            customClasses={{
              rootClass: clsx(
                classes.fieldMargin,
                classes.inputFieldD,
                classes.searchDateRange
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.submitBtn}
            onClick={handleSearch}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formCard: {
    marginBottom: theme.spacing(1),
  },
  fieldMargin: {},
  searchForm: {
    marginBottom: 20,
  },
  submitBtn: {
    width: "100%",
    height: "35px",
  },
  inputField: {
    width: "100%",
    "& label": {
      transform: "translate(12px, 12px) scale(1)",
    },
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
  inputFieldD: {
    '& .MuiOutlinedInput-input': {
      padding: "10px 6px",
    },
    width: "100%",
    "& label": {
      transform: "translate(12px, 12px) scale(1)",
    },
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
  selectField: {
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
}));
