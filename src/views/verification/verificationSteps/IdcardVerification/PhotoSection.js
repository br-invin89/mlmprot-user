import React, { useState } from 'react'
// import styled from 'styled-components'
// import { OutlineBtn, Upload } from 'ui/components'
import { Button, Grid, Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import nophotoIcon from 'assets/images/nophoto.jpg'

const PhotoSection = (props) => {
  const classes = useStyles()
  const [photoPreview, setPhotoPreview] = useState(undefined)

  const onUploadPhoto = (e) => {    
    let files = e.target.files
    if (files.length==0) return

    var reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      let base64 = e.target.result
      setPhotoPreview(base64)
      base64 = base64.split(';base64,')[1]
      props.onUploadImage(base64)
    }
  }

  return (
    <Box>
      <Grid container
        justify='space-between'
        alignItems='center'
      >
        <h4>Photo</h4>
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={onUploadPhoto}
          />
          <Button 
            variant="contained" 
            component="span"
            size={'small'}
          >
            Upload
          </Button>
        </label>
      </Grid>
      <Grid>
        <div className={classes.previewImageWrapper}>
          {photoPreview &&
            <img className={classes.previewImage} src={photoPreview} />
          }
        </div>
      </Grid>
    </Box>
  )
}

export default PhotoSection

const useStyles = makeStyles((theme) => ({
  previewImageWrapper: {
    width: '100%',
    height: '180px',
    border: `1px solid ${theme.palette.border.active}`,
    borderRadius: 6,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  }
}))
