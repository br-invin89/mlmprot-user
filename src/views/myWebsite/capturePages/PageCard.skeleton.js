import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RawCard from 'components/cards/RawCard'
import { 
  CardContent, CardMedia,
  Button, Typography,
  Divider
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useStyles from './PageCard.style'

export default () => {  
  const classes = useStyles()

  return (
    <RawCard className={classes.root}>
      <Skeleton variant={'rect'} width={'100%'} height={'300'} className={classes.media} />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.resourceTitle}
        >
          <Skeleton />
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          component="a"
          className={classes.websiteLink}
        >
          <Skeleton />
        </Typography>
        <div className={classes.divider}>
          <Typography className={classes.shareText}>Share to</Typography>
        </div>
        <div className={classes.socialMedia}>
          <Skeleton variant={'rect'} width={32} height={32} />
          <Skeleton variant={'rect'} width={32} height={32} />
          <Skeleton variant={'rect'} width={32} height={32} />
          <Skeleton variant={'rect'} width={32} height={32} />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
        >
          &nbsp;
        </Button>
      </CardContent>
    </RawCard>
  );
}

