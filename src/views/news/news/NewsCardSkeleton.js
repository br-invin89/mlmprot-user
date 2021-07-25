import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { CardContent, Typography, Divider } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import Card from "components/cards/Card";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import moment from "moment";
import useStyles from './NewsCard.style'

export default ({ data }) => {
  const classes = useStyles();

  return (
    <Card contentStyle={clsx(classes.content)}>
      <div className={classes.header}>
        <Typography component="h2" variant="h6" className={classes.title}>
          <Skeleton width={200} />
        </Typography>
        <Typography component="h3" variant="h6" className={classes.author}>
          <Skeleton width={150} />
        </Typography>
      </div>

      <Divider className={classes.divider} />
      <div className={clsx(classes.body)}>
        <Skeleton variant={'rect'} width={'100%'} height={50} />
      </div>
    </Card>
  );
};
