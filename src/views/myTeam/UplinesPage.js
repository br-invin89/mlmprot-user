import React, { useEffect, useState } from 'react'
import { Card, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth } from 'utils/api'
import UserCard from './uplines/UserCard'

export default function Uplines() {
  const classes = useStyles()
  const [uplines, setUplines] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUplines = () => {
    setIsLoading(true)
    callGetApiWithAuth(`myteam/uplines`, onGetUplines, onFailUplines)
  }
  const onGetUplines = (data) => {
    setIsLoading(false)
    setUplines(data.data)
  }
  const onFailUplines = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    loadUplines()
  }, [])

  return (
    <div className={classes.root}>      
      {uplines.slice(0, 2).map((user, index) => 
        <UserCard data={user} key={index} prevUser={index>0?uplines[index-1]:undefined} />
      )}
      {!isLoading && uplines.length==0?
        <Card>
          <p style={{ textAlign: 'center'}}>No Sponsor</p>
        </Card>
      : ''}
      {isLoading && 
        <div className={classes.loadingRoot}>
          <CircularProgress size={48} />
        </div>
      }
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  loadingRoot: {
    width: '100%',
    height: '100%',
    minHeight: 300,        
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

