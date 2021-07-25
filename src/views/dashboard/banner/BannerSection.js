import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { callGetApiWithAuth } from 'utils/api'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import loadingImage from 'assets/images/slider-skelton.png'
import bannerImage from 'assets/images/banner-image.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function BannerSection() {
  const classes = useStyles()
  const [slides, setSlides] = useState(undefined)

  useEffect(() => {
    // callGetApiWithAuth('ui/sliders/1', onGetSliders)
    setSlides([{
      image: bannerImage
    }])
  }, [])
  const onGetSliders = (data) => {
    setSlides(data.data)
  }

  return (
    slides && slides.length>0?
      <div className={classes.sliderWrapper}>
        <Carousel>
          {slides.map((e, i) => (
            <div className={classes.sliderItem} key={i}>
              <img className={classes.sliderImage} src={e.image} />
            </div>
          ))}
        </Carousel>
      </div>
    :
    <div className={classes.loadingWrapper}>
      <img className={classes.loadingImage} src={loadingImage} />
      <CircularProgress size={48} />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  loadingImage: {
    width: '100%',    
    position: 'absolute'
  },
  loadingWrapper: {
    width: '100%',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      height: '150px',
    }
  },
  sliderItem: {
    overflow: 'hidden'
  },
  sliderWrapper: {
    width: '100%',
    '& .carousel .slider-wrapper': {
      borderRadius: 8
    },
    '& .carousel .slider': {
      height: '250px',
      [theme.breakpoints.down('md')]: {
        height: '150px',
      }
    },
    '& .carousel .slide': {
      backgroundColor: 'transparent'
    },
    '& .carousel .thumbs-wrapper': {
      display: 'none'
    }
  }
}))
