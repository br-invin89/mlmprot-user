import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Typography, CircularProgress, Popover } from '@material-ui/core'
import { callGetApiWithAuth } from 'utils/api'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { ReactComponent as CircleIcon } from 'assets/icons/binary-circle.svg'
import useStyles from './BinaryDiagram.style'

const BinaryDiagram = () => {
  const classes = useStyles()
  const [data, setData] = useState(undefined)
  const [infoAnchor, setInfoAnchor] = useState(undefined)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    callGetApiWithAuth('dashboard/binary_stats', onGetData)
  }
  const onGetData = (data) => {
    setData(data.data)
  }

  return (
    data?
    <div className={classes.treeRoot}>
      <Typography component='p' className={classes.binaryText}>
        Binary Qualified? 
        &nbsp;
        <InfoOutlinedIcon className={classes.infoIcon}
          onClick={e=>setInfoAnchor(e.currentTarget)}
        />
        <Popover
          open={Boolean(infoAnchor)}
          anchorEl={infoAnchor}
          onClose={()=>setInfoAnchor(undefined)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.infoAlert}>To qualify for a binary check, you must have an active order and one personally enrolled Brand Ambassador on both your left and right leg with an active order. </Typography>
        </Popover>
      </Typography>
      <div className={classes.binaryData}>
        <div className={classes.circleRoot}>
          <CircleIcon />
          {data.binary_qualification.is_eligible && (
            <CheckCircleIcon className={classes.check} />
          )
          }
          <div className={clsx(classes.treeNode, classes.you)}>
            <Typography component='p' className={classes.title}>
              You
            </Typography>
            {/*
            <Typography component='h6' className={classes.score}>
              {data.binary_qualification.total}
            </Typography>
            */}
          </div>
          <div className={clsx(classes.treeNode, classes.leftLeg)}>
            <Typography component='p' className={classes.title}>
              Left
            </Typography>
            <Typography component='h6' className={classes.score}>
              {data.binary_qualification.left}
            </Typography>            
          </div>
          <div className={clsx(classes.treeNode, classes.rightLeg)}>
            <Typography component='p' className={classes.title}>
              Right
            </Typography>
            <Typography component='h6' className={classes.score}>
              {data.binary_qualification.right}
            </Typography>            
          </div>
        </div>
      </div>
      {data.binary_qualification.is_eligible && (
        <div className={classes.congratulationText}>
          <Typography component='p' className={classes.messageTitle}>
            Congratulations!
          </Typography>
          <Typography component='p' className={classes.messageSubTitle}>
            You're now Brand Qualified
          </Typography>
        </div>
      )}
    </div>
    :
    <div className={classes.loadingRoot}>
      <CircularProgress size={48} />
    </div>
  )
}

export default BinaryDiagram
