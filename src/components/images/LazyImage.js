import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { makeStyles } from '@material-ui/styles'

export const LazyImage = (props) => {
  const classes = useStyles() 

  return (
    <div className={classes.imageRoot}>
      <LazyLoadImage effect={'blur'} {...props} />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  imageRoot: {
    width: '100%',
    height: '100%',
    '& span': {
      width: '100%',
      height: '100%',
      '& img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
      }
    }
  }
}))
