import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider } from "@material-ui/core";
import Card from "components/cards/Card";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import moment from "moment";
import venueIcon from 'assets/icons/location.svg'

export default function EventCard({ data }) {
  const classes = useStyles();

  return (
    <Card contentStyle={clsx(classes.content)} className={classes.root}>
      <div className={classes.header}>
        <Typography component="h2" variant="h6" className={classes.title}>
          {data.title}
        </Typography>
        <div className={classes.authorright}>
          <Typography
            component="h3"
            variant="h6"
            className={classes.author}
          >
            <span className={classes.authorname}>{moment(data.created_at).format("MMM D, YYYY")}</span>
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.venueContainer}>
        <div className={classes.venueBox}>
          <div className={classes.venueIconContainer}>
            <img src={venueIcon} className={classes.venueIcon} />
            <Typography className={classes.venueLabel}>
              Venue:
            </Typography>  
          </div>
          <div className={classes.venueContent}>
            <Typography className={classes.venueText}>
              {data.venue}
            </Typography>  
          </div>
        </div>
        <div className={classes.venueBox}>
          <div className={classes.venueIconContainer}>
            <img className={classes.venueIcon} />
            <Typography className={classes.venueLabel}>
              Street:
            </Typography>  
          </div>
          <div className={classes.venueContent}>
            <Typography className={classes.venueText}>
              {data.street}
            </Typography>  
          </div>
        </div>
      </div>
      <Divider />
      <div className={clsx(classes.body)}>
        <Typography dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
    height: 375,
  },
  divider: {
    marginTop: 10,
  },
  root: {
    border: '1px solid #E5E9F2',
    boxShadow: 'none',
  },
  header: {
    // display: "flex",
    // justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  author: {
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  body: {
    marginTop: 8,
    fontWeight: "normal",
    textAlign: "justify",
    overflowX: 'auto',
    height: '54%',
    '&::-webkit-scrollbar': {
      width: 3,
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#8c8c8c',
      borderRadius: '4px'
    },
  },
  authorright: {
    display: 'flex',
    alignItems: 'center',
  },
  authorname: {
    color: '#ADB0C2',
    fontSize: 12
  },
  footer: {
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  street: {
    marginLeft: theme.spacing(3),
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    }
  },
  address: {
    fontSize: 14,
  },
  venueContainer: {
    padding: '12px 0px 2px',
  },
  venueBox: {
    display: 'flex',
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  venueIconContainer: {
    display: 'flex',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueIcon: {
    width: 25,
  },
  venueLabel: {
    fontSize: '14px',
    fontWeight: 500,
  },
  venueContent: {
  },
  venueText: {
    fontSize: '14px',
    fontWeight: 500,
    paddingLeft: '10px',
  }
}));
