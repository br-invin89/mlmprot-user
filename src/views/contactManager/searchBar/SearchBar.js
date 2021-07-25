import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { userStatusOptions, userTypeOptions } from 'config/var';

export default function SearchBar(props) {
  const classes = useStyles();

  const [searchParam, setSearchParam] = useState(props.searchParam);
  const onChangeSearchParam = (field, value) => {
    let searchParam_ = { ...searchParam };
    searchParam_[field] = value;
    setSearchParam(searchParam_);
    props.setSearchParam(searchParam_)
  };
  const search = () => {
    props.onSearch(searchParam);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={11} direction='column'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <TextField
              label="Username"
              variant="outlined"
              size='small'
              name="username"
              value={searchParam.username}
              onChange={(e) => onChangeSearchParam("username", e.target.value)}
              className={clsx(classes.inputField)}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <TextField
              label="Email"
              variant="outlined"
              size='small'
              type="email"
              name="email"
              value={searchParam.email}
              onChange={(e) => onChangeSearchParam("email", e.target.value)}
              className={clsx(classes.inputField)}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <TextField
              label="First Name"
              variant="outlined"
              size='small'
              name="first_name"
              value={searchParam.first_name}
              onChange={(e) => onChangeSearchParam("first_name", e.target.value)}
              className={clsx(classes.inputField)}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <TextField
              label="Last Name"
              variant="outlined"
              size='small'
              name="last_name"
              value={searchParam.last_name}
              onChange={(e) => onChangeSearchParam("last_name", e.target.value)}
              className={clsx(classes.inputField)}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <SelectField
              label="Select Type"
              value={searchParam.type}
              onChange={(e) => onChangeSearchParam("type", e.target.value)}
              options={[
                { label: '', value: '' },
                ...userTypeOptions
              ]}
              className={clsx(classes.inputField)}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={2} sm={6} direction='column'>
            <SelectField
              label="Select Status"
              value={searchParam.status}
              onChange={(e) => onChangeSearchParam("status", e.target.value)}
              options={[
                { label: '', value: '' },
                ...userStatusOptions
              ]}
              className={clsx(classes.inputField)}
            />
          </Grid>
        </Grid>  
      </Grid>
      <Grid item md={2} direction='column' className={classes.btnGrid}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.submitBtn}
          onClick={search}
        >
          <SearchIcon />Search
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  searchForm: {
    flexWrap: 'no-wrap',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    }
  },
  fieldMargin: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    }
  },
  submitBtn: {
    width: '100%',
    padding: '8px 10px 4px',
    minWidth: 92,
    fontSize: '14px',
  },
  inputField: {
    width: '100%'
  },
  btnGrid: {
    paddingRight: '0px !important'
  }
}));
