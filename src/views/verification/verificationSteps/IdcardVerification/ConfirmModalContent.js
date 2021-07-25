import React, { useState } from 'react'
// import styled from 'styled-components'
// import { SyncOutlined } from '@ant-design/icons'
// import { colors } from 'ui/config'
import { callPostApiWithAuth } from 'utils/api'
import { makeStyles } from "@material-ui/styles";
import SyncIcon from '@material-ui/icons/Sync'

const ConfirmModalContent = ({ 
  onClose, onSuccess, onFailure, 
  cardType, personInfo, location,
  photo, idcardFront, 
  photoFile,
}) => {
  const classes = useStyles()
  const [status, setStatus] = useState('prompt')

  const handleSubmit = () => {
    setStatus('checking')
    // setTimeout(()=>onDoneIdcardVerification({}), 5800)
    // return
    const data = {
      PersonInfo: personInfo, 
      Location: location,
      Document: {
        LivePhoto: photo,
        DocumentType: cardType,
        DocumentFrontImage: idcardFront,
      },
      photoFile,
    }
    callPostApiWithAuth(`verify/id`, data, onDoneIdcardVerification, onFailIdcardVerification)
  }
  const onDoneIdcardVerification = (data) => {    
    onSuccess()
    setStatus('prompt')
    onClose()
  }
  const onFailIdcardVerification = () => {
    onFailure()
    setStatus('prompt')
    onClose()
  }

  return (
    <div className={classes.contentRoot}>
      {status == 'prompt' &&
        <>
          <h3>Are you sure to submit?</h3>
          <div className='action-group'>
            <button onClick={handleSubmit}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </>
      }
      {status == 'checking' &&
        <>
          <p><SyncIcon spin />&nbsp;Please be patient, we are now checking your id card &amp; your personal informations.</p>
        </>
      }
    </div>
  )
}

export default ConfirmModalContent

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    border: '1px solid #fefdfc',
    padding: '30px',
    width: '300px',
    backgroundCcolor: '#28bae6',
    '& h3': {
      color: 'white',
      textAlign: 'center',
      lineHeight: '2em',
    },
    '& p': {
      color: 'white'
    }, 
    '& .action-group': {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
    '& button': {
      marginRight: '10px',
      marginLeft: '10px',
      color: 'white',
      backgroundColor: 'transparent',
      border: '1px solid white',
    }

  }
}))
