import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from '@material-ui/lab'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import resourceImage from "assets/images/resource_image.png";

export default function RecipeReviewCard({ data }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Skeleton className={classes.media} />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.resourceTitle}
        >
          <Skeleton />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
        >
          &nbsp;
        </Button>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: "50.25%", // 16:9
    borderRadius: 6,
  },
  downloadIcon: {
    paddingRight: 10,
  },
  root: {
    border: '1px solid #E5E9F2 !important',
    boxShadow: 'none !important',
    '& button': {
      fontSize: 14,
      textTransform: "capitalize",
      fontWeight: 500,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 6,
      paddingTop: 12,
      paddingBottom: 12,
      background: 'transparent',
      boxShadow: 'none',
      color: theme.palette.primary.main,
    },
    '& button:hover': {
      fontSize: 14,
      textTransform: "capitalize",
      fontWeight: 500,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 6,
      paddingTop: 12,
      paddingBottom: 12,
      background: 'transparent',
      boxShadow: 'none',
      color: theme.palette.primary.main,
    },
  },
  resourceTitle: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 500,
  },
}));
