import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import TextField from "components/inputs/TextField";

export default ({ onSearch }) => {
  const classes = useStyles();

  const [value, setValues] = React.useState("");
  
  const onEnterSearch = (e) => {
    if (e.keyCode==13) {
      onSearch(value)
    }
  }

  return (
    <div className={classes.searchForm}>
      <TextField
        id="outlined-basic"
        label="Search videos..."
        variant="outlined"
        size="small"
        name="id"
        value={value}
        onChange={(e) => setValues(e.target.value)}
        onKeyDown={onEnterSearch}
        className={classes.inputField}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        className={classes.submitBtn}
        onClick={() => onSearch(value)}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  searchForm: {
    marginTop: 14,
  },
  submitBtn: {
    marginLeft: theme.spacing(2),
    minWidth: 36,
    paddingTop: 6,
    paddingBottom: 6,
  },
  inputField: {
    maxWidth: '340px',
    width: 'calc(100% - 60px)',
  },
}));
