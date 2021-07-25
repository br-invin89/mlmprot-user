import React, { useEffect, useState } from "react";
// import Swiper from "react-id-swiper";
// import SliderImage from "assets/images/slide-image.png";
// import "swiper/swiper-bundle.min.css";
import { Carousel } from 'react-responsive-carousel'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth } from 'utils/api'
import loadingImage from 'assets/images/slider-skelton.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Slider() {
  const classes = useStyles()
  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },

    spaceBetween: 30,
    loop: true,
    autoplay: true,
  };
  const [isLoading, setIsLoading] = useState(false)
  const [slides, setSlides] = useState(undefined)

  useEffect(() => {
    // setIsLoading(true)
    // callGetApiWithAuth('ui/sliders/3', onGetSliders, onFailSliders)
    setSlides([{
      image: 'https://nektar-assets.s3-us-west-2.amazonaws.com/backoffice/sliders/products.png'
    }])
  }, [])
  const onGetSliders = (data) => {
    setIsLoading(false)
    setSlides(data.data)
  }
  const onFailSliders = () => {
    setIsLoading(false)
  }
  
  return(
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
      <img className={classes.loadingImage} src={loadingImage} />
  )

  /*
  return (
    <Swiper {...params}>
      <div>
        <img src={SliderImage} alt="slider image" width="100%" />
      </div>
      <div>
        <img src={SliderImage} alt="slider image" width="100%" />
      </div>
      <div>
        <img src={SliderImage} alt="slider image" width="100%" />
      </div>
    </Swiper>
  );
  */
};

const useStyles = makeStyles(theme => ({
  loadingImage: {
    width: '100%',
    height: '250px'
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
