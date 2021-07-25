import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "components/inputs/TextField";

export default ({ handleSearch }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");

  const onEnterTitle = (e) => {
    if (e.keyCode == 13) {
      handleSearch(title);
    }
  };

  return (
    <div className={classes.searchForm}>
      <TextField
        label="Search Resources..."
        variant="outlined"
        size="small"
        name="id"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          handleSearch(e.target.value)
        }}
        className={classes.inputField}
        onKeyDown={(e) => onEnterTitle(e)}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginLeft: theme.spacing(2),
    minWidth: 36,
  },
  inputField: {
    width: 331,
    background: '#FBFAFC',
    borderRadius: 6,
    '& .MuiInputLabel-outlined': {
      color: '#ADB0C2',
      fontSize: 14,
      [theme.breakpoints.down('md')]: {
        fontSize: 11,
      }
    },
  },
  searchForm: {
    display: "flex",
  },
}));
