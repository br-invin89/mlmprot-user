import React from "react";
import { makeStyles } from "@material-ui/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { Typography } from "@material-ui/core";
import Card from "components/cards/Card";

export default ({ data, className }) => {
  const classes = useStyle();

  return (
    <Card contentStyle={classes.likeContentStyle} className={className}>
      <div className={classes.likeContent}>
        <Typography component="p" color="primary" className={classes.likesText}>
          <ThumbUpAltIcon color="primary" style={{ fontSize: 20 }} />
          <Typography component="span" style={{ marginLeft: 8 }}>
            Like
          </Typography>
        </Typography>
        <Typography component="p" className={classes.likeCount}>
          {data.post.likes}
        </Typography>
      </div>
    </Card>
  );
};

const useStyle = makeStyles((theme) => ({
  likeContentStyle: {
    paddingLeft: 15,
    paddingTop: 6,
    paddingBottom: "6px !important",
    paddingRight: 10,
  },
  likeContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 160,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  likeCount: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
}));
