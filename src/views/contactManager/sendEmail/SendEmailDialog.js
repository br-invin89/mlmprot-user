import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
  Modal, Fade, Typography,
  Select, MenuItem, FormControl, InputLabel, 
  Button, CircularProgress
} from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Popconfirm from 'components/confirm/Popconfirm'
import { callPostApiWithAuth } from 'utils/api'
import RichEditor from 'components/inputs/RichEditor'

export default ({ isOpenedSendEmail, closeSendEmail, sendEmail }) => {
  const classes = useStyles()
  const [text, setText] = useState('')

  useEffect(() => {
    setText('')
  }, [isOpenedSendEmail])

  return (
    <Modal open={isOpenedSendEmail} onClose={closeSendEmail}>
      <Fade in={isOpenedSendEmail}>
        <div className={classes.modalRoot}>
          <Typography component={'h2'}>Email Content</Typography>
          <div className={classes.form}>
            <RichEditor
              value={text} onChange={v=>setText(v)}
            />
            <div className={classes.actionGroup}>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => sendEmail(text)}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
          
  )
}

const useStyles = makeStyles(theme => ({
  modalRoot: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: `100px`,
    left: `calc(50% - 200px)`,
    transform: `translate(-200px, -50% + 200px)`,
  },
  form: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  formControl: {
    width: '100%',
  },
  btn: {
    width: '100%',
  },
  btnProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  btnWrapper: {
    position: 'relative',
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
  }
}))
