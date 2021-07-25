import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export default ({ color = "primary", label, handleClick }) => {
  const classes = useStyle();
  return (
    <Button
      size="smal"
      color={color}
      variant="contained"
      endIcon={<SendIcon style={{ fontSize: 13 }} />}
      onClick={handleClick}
      className={classes.btn}
    >
      {label}
    </Button>
  );
};

const useStyle = makeStyles((theme) => ({
  btn: {
    minWidth: 100,
    height: 32,
    borderRadius: 5,
    textTransform: "capitalize",
  },
}));
