import React from 'react'
import { Typography, Button, Popover } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export default ({ anchorEl, onConfirm, onCancel, title }) => {
  const classes = useStyles()

  return (
    <Popover
      anchorEl={anchorEl}
      open={anchorEl}
      className={classes.modalRoot}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <>
        <Typography className={classes.description}>
          {title || 'Are you sure?'}
        </Typography>
        <Button
          color={'primary'}
          variant={'contained'}
          onClick={() => onConfirm()}
        >
          Yes
        </Button>
        <Button onClick={() => onCancel()}>No</Button>
      </>
    </Popover>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {

  },
  description: {
    padding: 10,
  },
}))
