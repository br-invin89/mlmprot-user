import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { CardContent, Typography, Divider } from "@material-ui/core";
import Card from "components/cards/Card";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";
import useStyles from "./NewsCard.style";

export default ({ data, openModal }) => {
  const classes = useStyles();

  return (
    <div onClick={() => openModal(data)}>
      <Card contentStyle={clsx(classes.content)} className={classes.root}>
        <div className={classes.header}>
          <Typography component="h2" variant="h6" className={classes.title}>
            {data.title}
          </Typography>
          <div className={classes.authorright}>
            <Typography component="h3" variant="h6" className={classes.author}>
              <span className={classes.authorname}>
                {moment(data.created_at).format("MMM D, YYYY")}
              </span>
            </Typography>
          </div>
        </div>

        <Divider className={classes.divider} />
        <div className={clsx(classes.body)}>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <p class={classes.readMore}></p>
        </div>
        <div class={classes.fadeout}></div>
      </Card>
    </div>
  );
};
