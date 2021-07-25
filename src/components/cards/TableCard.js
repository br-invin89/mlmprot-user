 import React from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Pagination from "components/pagination/Pagination";

export default ({
  children,
  className,
  title,
  paginationParams,
  onPageChange,
  toolbar,
  cardHeaderClassName,
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)}>
      {title && (
        <CardHeader
          title={title}
          action={toolbar}
          // className={clsx(classes.header, cardHeaderClassName.rootClass || {})}
          className={classes.header}
          classes={{
            title: classes.title,
          }}
        />
      )}

      <CardContent className={classes.cardContent}>
        {children}
        <Divider />
      </CardContent>
      {paginationParams && (        
        <CardActions>
          <Pagination
            paginationParams={paginationParams}
            onPageChange={onPageChange}
          />
        </CardActions>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
    overflow: 'inherit',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '14px'
    },
  },
  cardContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: 34,
    paddingTop: 0,
  },
  header: {
    paddingLeft: theme.spacing(3),
    paddingRight: 34,
    '& .MuiCardHeader-action': {
      marginTop: 0
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },  
  
}));
