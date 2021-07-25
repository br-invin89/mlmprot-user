import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "components/cards/Card";
import InputField from "./InputField";
import Button from "./Button";
import UserAvatar from "../posts/UserAvatar";

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
    <Card contentStyle={classes.contentStyle}>
      <div className={classes.main}>
        <UserAvatar data={{ name: "Jafferay Long", avatar: "Jafferay Long" }} />
        <InputField
          className={classes.input}
          placeholder="What do you want to publish..."
          value={value}
          onChange={handleChange}
        />
        <Button label="Publish" onClick={handleSubmit} />
      </div>
    </Card>
  );
};

const useStyle = makeStyles((theme) => ({
  contentStyle: {
    paddingLeft: theme.spacing(3),
    paddingTop: 9,
    paddingBottom: "9px !important",
    paddingRight: 26,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    width: "100%",
    height: 32,
    [theme.breakpoints.up("md")]: {
      width: 492,
    },
  },
}));
