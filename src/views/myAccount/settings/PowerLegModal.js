import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Modal,
  Fade,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core'
import Popconfirm from 'components/confirm/Popconfirm'
import { callPutApiWithAuth } from 'utils/api'
import CloseIcon from '@material-ui/icons/Close'

export default function PowerLegModal({
  data,
  isOpened,
  closeEdition,
  afterUpdateSuccess,
}) {
  const classes = useStyles()

  const [powerLeg, setPowerLeg] = useState(undefined)
  const [updatingEl, setUpdatingEl] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!data) return

    setPowerLeg(data.power_leg)
  }, [data])

  const updatePowerLeg = () => {
    setIsUpdating(true)
    callPutApiWithAuth(
      'profile/power_leg',
      { power_leg: powerLeg },
      onDoneChangeLeg,
      () => setIsUpdating(false)
    )
  }
  const onDoneChangeLeg = (data) => {
    setIsUpdating(false)
    afterUpdateSuccess('Power leg changed')
    closeEdition()
  }

  return (
    <Modal open={isOpened} onClose={closeEdition}>
      <Fade in={isOpened}>
        <div className={classes.modalRoot}>
          <Typography component={'h2'}>Update Traffic Rotator</Typography>
          <IconButton
            component='span'
            className={classes.close}
            onClick={closeEdition}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.form}>
            <FormControl className={classes.formControl} variant={'outlined'}>
              <InputLabel className={classes.label}>Traffic Rotator:</InputLabel>
              <Select
                value={powerLeg}
                onChange={(e) => setPowerLeg(e.target.value)}
                className={classes.selectRoot}
              >
                <MenuItem value={1}>Leg 1</MenuItem>
                <MenuItem value={2}>Leg 2</MenuItem>
                <MenuItem value={3}>Leg 3</MenuItem>
                <MenuItem value={4}>Let 4</MenuItem>
                <MenuItem value={5}>Alternative</MenuItem>
                <MenuItem value={6}>Lesser</MenuItem>
                <MenuItem value={7}>Holding Tank</MenuItem>
                
              </Select>
            </FormControl>
            <div className={classes.actionGroup}>
              <div className={classes.btnWrapper}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                  onClick={(e) => setUpdatingEl(e.currentTarget)}
                  disabled={isUpdating}
                >
                  {isUpdating ? <CircularProgress size={24} /> : 'Update'}
                </Button>
                <Popconfirm
                  anchorEl={updatingEl}
                  onConfirm={() => {
                    updatePowerLeg()
                    setUpdatingEl(null)
                  }}
                  onCancel={() => setUpdatingEl(null)}
                />
              </div>
              {/* <div className={classes.btnWrapper}>
                <Button 
                  className={classes.btn}
                  onClick={closeEdition}
                >
                  Close
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none',
    },
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
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
  },
  selectRoot: {
    '& label': {
      background: '#fff',
    },
    '& .MuiSelect-select': {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  label: {
    background: '#fff',
    paddingRight: 6,
  },
}))
