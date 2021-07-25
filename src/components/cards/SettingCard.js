import React from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

export default ({ children, className, title, openEdition }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)}>
      <CardHeader
        className={classes.cardHeader}
        classes={{
          title: classes.title,
        }}
        action={
          openEdition?
          <IconButton aria-label="settings" >
            <SettingsRoundedIcon color="primary" onClick={openEdition} className={classes.settingIcon} />
          </IconButton>
          : ''
        }
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Divider />
        {children}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  cardHeader: {
    padding: theme.spacing(2, 3, 0, 3),
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  cardContent: {
    paddingTop: 11,
  },
  settingIcon: {
    width: 20,
    height: 20
  }
}));
