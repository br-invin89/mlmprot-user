import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import InputField from "./InputField";
import Button from "./Button";

export default () => {
  const [value, setValue] = useState("");
  const classes = useStyle();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    // TODO implemennt api
  };
  return (
    <div className={classes.main}>
      <InputField
        className={classes.input}
        placeholder='Leave your comment..'
        value={value}
        onChange={handleChange}
      />
      <Button label='Submit' color='default' onClick={handleSubmit} />
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    width: "100%",
    height: 32,
    [theme.breakpoints.up("md")]: {
      width: 522,
    },
  },
}));
