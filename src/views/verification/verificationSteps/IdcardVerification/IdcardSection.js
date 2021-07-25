import React, { useState, useEffect } from 'react'
import { Button, Snackbar, Grid, Box } from '@material-ui/core'
// import styled from 'styled-components'
// import { OutlineBtn, Upload, Select } from 'ui/components'
// import nophotoIcon from 'assets/icons/nophoto.jpg'
// import { UploadOutlined } from '@ant-design/icons'
// import { Container, 
//   Row, HeadRow,
//   PreviewCardWrapper, PreviewCard, BlankImage,
//   UploadBtn, Legend,
//   CardSelect, CardTypeWrapper
// } from './PhotoSection.styled'
import SelectField from "components/inputs/SelectField";
import { makeStyles } from "@material-ui/styles";

const IdcardSection = (props) => {
  const classes = useStyles()
  const [idcardFrontPreview, setIdcardFrontPreview] = useState(undefined)
  const [cardType, setCardType] = useState('DrivingLicence')
  // const uploadProps = {
  //   accept: '.jpg,.jpeg,.png',
  //   beforeUpload: file => {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file)
  //     reader.onload = (e) => {
  //       let base64 = e.target.result
  //       setIdcardFrontPreview(base64)
  //       base64 = base64.split(';base64,')[1]
  //       props.onUploadIdcardFront(base64)
  //     }
  //     return false
  //   },
  //   showUploadList: false,
  // }

  const onUploadPhoto = (e) => {    
    let files = e.target.files
    if (files.length==0) return

    var reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      let base64 = e.target.result
      setIdcardFrontPreview(base64)
      base64 = base64.split(';base64,')[1]
      props.onUploadIdcardFront(base64)
    }
  }

  useEffect(() => {
    props.onChangeCardType(cardType)
  }, [cardType])

  return (
    <Box>
      <Grid container
        justify='space-between'
        alignItems='center'
        style={{ marginTop: 20, marginBottom: 12 }}
      >
        <div>
          <SelectField 
            label={'Card'}
            size={'small'}
            value={cardType} 
            onChange={e=>setCardType(e.target.value)}
            options={[
              { label: 'Driver License', value: 'DrivingLicence' },
              { label: 'National ID Card', value: 'IdentityCard' },
              { label: 'Passport', value: 'Passport' },
            ]}
          />
        </div>
        <label htmlFor="upload-idcard">
          <input
            style={{ display: 'none' }}
            id="upload-idcard"
            name="upload-idcard"
            type="file"
            onChange={onUploadPhoto}
          />
          <Button variant="contained"   
            component="span"
            size={'small'}
          >
            Upload
          </Button>
        </label>
        
        {/* <Upload {...uploadProps}>
          <UploadBtn icon={<UploadOutlined />} size={'small'}>Upload</UploadBtn>
        </Upload> */}
      </Grid>
      <Grid>
        <div className={classes.previewImageWrapper}>
          {idcardFrontPreview &&
            <img className={classes.previewImage} src={idcardFrontPreview} />
          }
        </div>
      </Grid>
    </Box>
  )
}

export default IdcardSection

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
