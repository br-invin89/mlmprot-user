import React from "react";
import { makeStyles } from "@material-ui/styles";
import ShareIcon from "@material-ui/icons/Share";
import { Typography } from "@material-ui/core";
import Card from "components/cards/Card";

export default ({ data, className }) => {
  const classes = useStyle();

  return (
    <Card contentStyle={classes.shareContentStyle} className={className}>
      <div className={classes.shareContent}>
        <Typography
          component='p'
          color='textSecondary'
          className={classes.shareText}
        >
          <ShareIcon color='textSecondary' style={{ fontSize: 20 }} />
          <Typography component='span' style={{ marginLeft: 8 }}>
            Share
          </Typography>
        </Typography>
      </div>
    </Card>
  );
};

const useStyle = makeStyles((theme) => ({
  shareContainer: {
    display: "flex",
  },
  shareContentStyle: {
    paddingLeft: 15,
    paddingTop: 6,
    paddingBottom: "6px !important",
    paddingRight: 10,
  },
  shareContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
  },
  shareText: {
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  shareCount: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));
