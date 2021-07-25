import React, { useState, useEffect } from "react";
import {
  CircularProgress
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import FadeIn from "react-fade-in";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import originImage from "assets/images/product_original.png";
import thumbImage from "assets/images/product_thumb.png";

export default function ImageSection ({ product }) {  
  const [images, setImages] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    if (!product) return
    let images_ = [{
      original: product.image,
      thumbnail: product.image
    }];

    for (let image of product.thumbnails) {
      images_.push({
        original: image.image,
        thumbnail: image.image,
      });
    }
    setImages(images_);
  }, [product]);

  return (
    <div className={classes.root}>
      {product?
      <FadeIn delay={1500}>
        <ImageGallery items={images} />
      </FadeIn>
      : 
      <div className={classes.skeletonWrapper}>
        <Skeleton variant={'rect'} width={'100%'} height={'100%'} />
      </div>
      }
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    '& .image-gallery-slide-wrapper': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
    },
    '& .image-gallery-slides': {
      paddingBottom: 60,
    }
  },
  loadSpin: {
    position: 'absolute',
    left: 'calc(50% - 24px)',
    top: 100,
  },
  skeletonWrapper: {
    width: 'calc(100% - 48px)',
    marginLeft: 24,
    marginTop: 24,
    height: '500px',    
  },
  productImage: {
    padding: 70,
  }
}))
