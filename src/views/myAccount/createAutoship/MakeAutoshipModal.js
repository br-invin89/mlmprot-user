import React, { useState, useEffect } from 'react'
import {
  Modal, 
  Select, Button, CircularProgress, MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'

export default function MakeAutoshipModal(props) {
  const classes = useStyles()

  const [autoshipData, setAutoshipData] = useState({
    day_of_month: ''
  })

  const handleAutoship = () => {
    if (!autoshipData.day_of_month) {
      props.setErrorMessage('Please input billing day every month')
      return
    }
    props.handleAutoship(autoshipData)
  }

  return (
    <Modal open={true}
      onClose={props.closeMakeModal}
    >
      <div className={classes.modalRoot}>
        <h2>Autoship</h2>
        <div className='form' style={{paddingTop: 12}}>
          <div>
            <p>Please use the following drop downs to make your new selections.</p>
            <p>When you select your day of the month, you will be billed on that day each month.</p>
          </div>
          <div className={classes.actionGroup}>
            <Select 
              className={classes.periodInput}
              value={autoshipData.day_of_month}
              onChange={e=>setAutoshipData({...autoshipData, day_of_month: e.target.value})}
            >
              {[...Array(28).keys()].map(i=>
              <MenuItem value={i+1}>{i+1}</MenuItem>
              )}
            </Select>
            <Button 
              variant={'contained'}
              color={'primary'}
              onClick={handleAutoship}
            >
              {props.isSubmiting &&
                <CircularProgress size={24} />
              }{' '}
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )  
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: `calc(50% - 315px)`,
    transform: `translate(-100px, -50% + 100px)`,
    '& h2': {
      fontSize: 18,
      margin: 0,
    },
    '& p': {
      fontSize: 14,
      margin: 0,
    },
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      width: '80%',
      left: '2%',
    },
  },
  periodInput: {
    width: 100,
    marginRight: 12,
    '& .MuiInput-input': {
      paddingLeft: 10
    }
  },
  actionGroup: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'flex-start',
  }
}))
