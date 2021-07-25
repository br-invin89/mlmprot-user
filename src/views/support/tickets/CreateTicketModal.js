import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Modal, Fade,
  Grid, Typography, Button, IconButton, 
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { callPostApiWithAuth } from 'utils/api'
import SelectField from 'components/inputs/SelectField'
import TextField from 'components/inputs/TextField'
import Popconfirm from 'components/confirm/Popconfirm'
import { ticketTypeOptions, ticketPriorityOptions } from 'config/var'
import CloseIcon from "@material-ui/icons/Close"

const CreateTicketModal = props => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    first_name: '', last_name: '',
    type: '', priority: '',
    subject: '', message: ''
  })
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [submitAnchor, setSubmitAnchor] = useState(null)
  const myUser = useSelector(state=>state.auth.user)

  const handleSubmit = () => {
    if (!formData.type || 
      !formData.priority ||
      !formData.subject ||
      !formData.message ) {
      props.onError('Please input all fields')      
      return
    }
    setIsSubmiting(true)
    callPostApiWithAuth('tickets', formData, onPostDone, onPostFail)
  }
  const onPostDone = () => {
    setIsSubmiting(false)
    props.closeModal()
    props.afterSuccessUpdate()
  }
  const onPostFail = (errMessage) => {
    setIsSubmiting(false)
    props.onError(errMessage)
  }

  useEffect(() => {
    if (myUser) {
      setFormData({
        ...formData,
        first_name: myUser.first_name,
        last_name: myUser.last_name,
      })
    }
  }, [myUser])

  return (
    <Modal open={true} onClose={props.closeModal}>
      <Fade in={true}>
        <div className={classes.modalRoot}>
          <IconButton
            component="span"
            className={classes.close}
            onClick={props.closeModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography component={'h2'}>Create a Ticket</Typography>
          <Grid container spacing={2} className={classes.form}>
            <Grid item md={12} lg={6}>
              <TextField
                label={'First Name'} 
                value={formData.first_name}
                disabled
                className={classes.formControl}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <TextField
                label={'Last Name'} 
                value={formData.last_name}
                disabled
                className={classes.formControl}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <SelectField
                label={'Type'}
                options={ticketTypeOptions}
                value={formData.type}
                onChange={e=>setFormData({...formData, type: e.target.value})}
                className={classes.selectControl}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <SelectField
                label={'Priority Level'}
                options={ticketPriorityOptions}
                value={formData.priority}
                onChange={e=>setFormData({...formData, priority: e.target.value})}
                className={classes.selectControl}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label={'Subject'}
                value={formData.subject}
                onChange={e=>setFormData({...formData, subject: e.target.value})}
                className={classes.inputControl}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label={'Message'}
                multiline
                rows={4}
                value={formData.message}
                onChange={e=>setFormData({...formData, message: e.target.value})}
                className={classes.inputControl}
              />
            </Grid>
            <Grid container lg={12} justify={'center'}>
              <div className={classes.btnWrapper}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                  onClick={(e) => setSubmitAnchor(e.currentTarget)}
                  disabled={isSubmiting}
                >
                  Submit
                </Button>
                <Popconfirm
                  anchorEl={submitAnchor}
                  onConfirm={() => {
                    handleSubmit()
                    setSubmitAnchor(null)
                  }}
                  onCancel={() => setSubmitAnchor(null)}
                />
                {isSubmiting && (
                  <CircularProgress
                    color={'primary'}
                    size={24}
                    className={classes.btnProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}

export default CreateTicketModal

const useStyles = makeStyles(theme => ({
  modalRoot: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: `calc(50% - 300px)`,
    transform: `translate(-150px, -50% + 150px)`,
    [theme.breakpoints.down('md')]: {
      width: '300px',
    },
  },
  close: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  form: {
    paddingTop: '24px',
    paddingBottom: '12px',
  },
  selectControl: {
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  inputControl: {
    width: '100%',
    '& label': {
      transform: 'translate(14px, 12px) scale(1)',
    }
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
    width: '80px',
    marginTop: '24px'
  },
  confirmModal: {
    padding: 10,
  },
}))
