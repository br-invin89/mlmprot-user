import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { callGetApiWithAuth } from 'utils/api'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Card from "components/cards/Card";
import loadingImage from 'assets/images/slider-skelton.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { asDate, asDate2, asTime } from 'utils/text';

export default function BannerSection() {
  const classes = useStyles()
  const [qualificationUpdatedAt, setQualificationUpdatedAt] = useState(undefined)
  const [rankUpdatedAt, setRankUpdatedAt] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const getUpdateDate = () => {
    setIsLoading(true)
    callGetApiWithAuth('dashboard/qualification_dates', onGetDate, onFailDate)
  }

  const onGetDate = (data) => {
    setIsLoading(false)
    setQualificationUpdatedAt(data.data.qualification_updated_at)
    setRankUpdatedAt(data.data.rank_updated_at)
  }

  const onFailDate = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    getUpdateDate()
  }, [])

  return (
    isLoading ?
      <div className={classes.loadingWrapper}>
        <img className={classes.loadingImage} src={loadingImage} />
        <CircularProgress size={20} />
      </div>
    :
      (qualificationUpdatedAt || rankUpdatedAt)?
      <Card className={classes.root}>
        <div className={classes.notificationCard}>
          <div className={classes.notificationContainer}>
            <InfoOutlinedIcon className={classes.infoIcon} />
          </div>
          <div style={{paddingLeft: '10px'}}>
            {qualificationUpdatedAt && 
            <>
              Last qualifications updated on <span className={classes.highlightedText}>{asDate2(qualificationUpdatedAt)}</span> at <span className={classes.highlightedText}>{asTime(qualificationUpdatedAt)}</span>. 
            </>}
            {rankUpdatedAt && 
            <>
              <span className={classes.space}/>Last rank updated on <span className={classes.highlightedText}>{asDate2(rankUpdatedAt)}</span> at <span className={classes.highlightedText}>{asTime(rankUpdatedAt)}</span>.
            </>}
          </div>
        </div>
      </Card>
      : <></>
  )
}

const useStyles = makeStyles(theme => ({
  loadingImage: {
    width: '100%',    
    position: 'absolute'
  },
  loadingWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    display: 'flex'
  },
  infoIcon: {
    color: theme.palette.primary.main,
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
  notificationContainer: {
    paddingTop: 3
  },
  highlightedText: {
    color: 'red'
  },
  space: {
    width: 30,
    display: 'inline-block'
  }
}))
