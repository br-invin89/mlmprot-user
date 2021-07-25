import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { 
  Divider, Input, Button, 
  CircularProgress,
  Dialog, DialogTitle, DialogActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CancelIcon from '@material-ui/icons/Cancel';
import NoPhotoIcon from 'assets/images/nophoto.jpg'
import { callPostApiWithAuth } from 'utils/api'

const MessagePostForm = props => {
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [needsConfirm, setNeedsConfirm] = useState(false)

  const openSelectFile  = () => {
    fileInputRef.current.click()    
  }
  const onSelectFile = (e) => {
    let files_ = [...files]
    for (let file of e.target.files) {
      files_.push(file)
    }
    setFiles(files_)
  }
  const handleSubmit = () => {
    if (message=='') {
      props.onErrorMessage('Please input message field')
      return
    }
    setMessage('')
    setFiles([])
    setIsSubmiting(true)
    let query = {
      ticket_id: props.ticketId,
      message
    }
    callPostApiWithAuth(`tickets/message`, query, onSubmitDone, onSubmitFail)
  }
  const onSubmitDone = () => {
    setIsSubmiting(false)
    props.loadTicketInfo()
    props.loadTicket()
  }
  const onSubmitFail = () => {
    setIsSubmiting(false)
  }
  const removeFile = (index) => {
    let files_ = [...files]
    files_.splice(index, 1)
    setFiles(files_)
  }

  return (
    <div className={classes.root}>
      <Divider />
      <div className={classes.formBody}>
        <img src={myUser && myUser.image?myUser.image:NoPhotoIcon}
          className={classes.userAvatar}
        />
        <Input className={classes.inputField} 
          value={message}
          onChange={e=>setMessage(e.target.value)}
          multiline
          rows={4}
          disableUnderline
        />
        <input type="file" onChange={onSelectFile}
          style={{display: 'none'}}
          ref={fileInputRef}
        />
      </div>
      <div className={classes.formActions}>
        <div>
          {files.map((file, index) => 
            <a className={classes.fileName} key={index}>
              {file.name}&nbsp;&nbsp;
              <CancelIcon fontSize={'small'} onClick={() => removeFile(index)} 
                style={{ cursor: 'pointer' }}
              />
            </a>
          )}
        </div>
        <div>
          {/* <Button color={'primary'}
            style={{ marginRight: 8 }}
            onClick={openSelectFile}
          >
            <AttachFileIcon />
            Attach File
          </Button> */}
          <Button color={'primary'} variant={'contained'}
            onClick={() => setNeedsConfirm(true)}
            disabled={isSubmiting}
          >
            {isSubmiting && <CircularProgress size={16} color={'#fff'} style={{marginRight: 8}} />}
            Submit
          </Button>
          <Dialog 
            open={needsConfirm}
            onClose={()=>setNeedsConfirm(false)}
          >
            <DialogTitle>
              Are you sure?
            </DialogTitle>
            <DialogActions>
              <Button color='secondary'
                onClick={()=>setNeedsConfirm(false)}
              >
                No
              </Button>
              <Button color='primary'
                onClick={()=>{
                  setNeedsConfirm(false)
                  handleSubmit()
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default MessagePostForm

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
  },
  formBody: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'space-between'
  },
  userAvatar: {
    width: 37, 
    height: 37,
    borderRadius: '50%',
    marginRight: 10,
  },
  inputField: {
    width: 'calc(100% - 45px)',
    border: `1px solid ${theme.palette.border.panel}`,
    padding: 12,
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  fileName: {
    fontSize: 12,
    color: `${theme.palette.text.secondary}`,
    marginRight: 20,
  }
}))
