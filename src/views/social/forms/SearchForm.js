import React, { useState } from "react";
import { makeStyles, Button, Box } from "@material-ui/core";
import SearchField from "./SearchField";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeField from "components/inputs/DateRangeField";
import clsx from "clsx";

const SEARCH_FORM_DEF = [
  { name: "firstname", placeholder: "First name", type: "text" },
  { name: "lastname", placeholder: "Last name", type: "text" },
  { name: "username", placeholder: "Username", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "contact", placeholder: "Phone number", type: "number" },
];
export default ({}) => {
  const [values, setValue] = useState({});
  const [dateRange, setDateRange] = useState({});
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const onChangeDate = (e) => {
    setDateRange(e);
  };

  return (
    <>
      {SEARCH_FORM_DEF.map(({ name, placeholder, type }) => (
        <SearchField
          name={name}
          type={type}
          className={classes.input}
          placeholder={placeholder}
          value={values[name]}
          onChange={handleChange}
        />
      ))}
      <SearchField
        name='content'
        className={[classes.input, classes.contentField]}
        placeholder={"Content or Title"}
        value={values["content"]}
        onChange={handleChange}
      />
      <DateRangeField
        value={dateRange}
        placeholder='Start/End Date'
        disableUnderline={true}
        name='date_upgraded'
        className={clsx(classes.input)}
        handleChange={onChangeDate}
        showDropdownIcon={true}
        customClasses={{
          inputRoot: classes.inputRoot,
          inputField: classes.inputField,
          rootClass: classes.rootClass,
        }}
      />
      <SearchField
        name='likeRangeFrom'
        type='number'
        className={[classes.input]}
        placeholder={"Like Range From"}
        value={values["likeRangeFrom"]}
        onChange={handleChange}
      />
      <SearchField
        name='likeRangeTo'
        type='number'
        className={[classes.input]}
        placeholder={"Like Range To"}
        value={values["likeRangeTo"]}
        onChange={handleChange}
      />
      <Button
        startIcon={<SearchIcon fontSize='20px' />}
        className={classes.searchButton}
        variant='outlined'
        color='primary'
      >
        Search
      </Button>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: "10px",
  },
  contentField: {
    marginTop: "20px",
  },
  searchButton: {
    width: "100%",
    height: "32px",
    textTransform: "none",
  },
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
  inputField: {
    padding: theme.spacing(0, 2),
    height: 32,
  },
  rootClass: {
    width: "100%",
  },
}));
