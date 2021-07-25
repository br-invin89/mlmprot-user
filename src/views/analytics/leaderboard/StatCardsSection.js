import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import Card from 'components/cards/Card'
import { asNumber, asPrice } from 'utils/text'
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoPhotoIcon from 'assets/images/nophoto.jpg'

const StatCardsSection = ({ statData, isLoading }) => {
  return (
    <Grid container spacing={3}>
      {statData?
      <>
        <Grid item sm={12} md={4}>
          <StatCard 
            title={'Highest Record of Earning'}
            userData={statData.earning}
            value={statData && statData.earning?asPrice(statData.earning.earning):'-'}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <StatCard 
            title={'Highest Record for Personal Enrollment'}
            userData={statData.pe}
            value={statData && statData.pe?asNumber(statData.pe.pe):'-'}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <StatCard 
            title={'Highest Record for Personal Enrollment Volume'}
            userData={statData.pev}
            value={statData && statData.pev?asNumber(statData.pev.pev):'-'}
          />
        </Grid>
      </> :
      <>
        {[...Array(3).keys()].map(index=>(
          <Grid item sm={12} md={4}>
            <StatCardSkeleton />
          </Grid>
        ))}
      </>}
    </Grid>
  )
}

export default StatCardsSection

const StatCard  = ({ title, userData, value, isLoading }) => {
  const classes = useStyles()

  return (
    <Card>
      <Box className={classes.cardRoot}>
        <LazyLoadImage effect="blur" src={userData && userData.image ?userData.image: NoPhotoIcon} className={classes.photo} />
        <Typography className={classes.name} component={'h4'}>
          {userData?userData.first_name+' '+userData.last_name: '-'}
        </Typography>
        <Typography className={classes.title} component={'p'}>
          {title}
        </Typography>
        <Typography className={classes.count} component={'h3'}>
          {value}
        </Typography>        
      </Box>
    </Card>
  )
}

const StatCardSkeleton = () => {
  const classes = useStyles()

  return (
    <Card>
      <Box className={classes.cardRoot}>
        <Skeleton variant={'circle'} width={74} height={74} />
        <Typography className={classes.name} component={'h4'}>
          <Skeleton width={80} />
        </Typography>
        <Typography className={classes.title} component={'p'}>
          <Skeleton width={120} />
        </Typography>
        <Typography className={classes.count} component={'h3'}>
          <Skeleton width={80} />
        </Typography>        
      </Box>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  photo: {
    width: 74,
    height: 74,
    border: '1px solid #fff',
    borderRadius: '50%',
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
  }, 
  title: {
    fontSize: 16,
    lineHeight: '1.5em',
    color: theme.palette.text.secondary,
    textAlign: 'center'
  },
  count: {
    fontSize: 22,
    lineHeight: '1.5em',    
  }
}))
