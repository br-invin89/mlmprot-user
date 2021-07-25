import React, { useState, useEffect } from 'react'
import {
  List, ListItem, ListItemIcon,
  ListItemText, ListItemSecondaryAction,
  IconButton, 
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import DateRangeIcon from '@material-ui/icons/DateRange'
import clsx from 'clsx'
import { callGetApiWithAuth } from 'utils/api'

export default({ handleSearch, searchParam }) => {
  const classes = useStyles()
  const [months, setMonths] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadMonths()    
  }, [])
  const loadMonths = () => {
    setIsLoading(true)
    callGetApiWithAuth('events/months', onGetMonths, ()=>setIsLoading(false))
  }
  const onGetMonths = (data) => {
    setIsLoading(false)
    setMonths(data.data)
  }

  return (
    <List component='nav' className={classes.listSection}>
      {isLoading? [...Array(6).keys()].map(index => 
        <ListItem
          key={index}
          button
        >
          <ListItemIcon className={classes.listIcon}>
            <Skeleton variant={'rect'} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={<Skeleton />}
            classes={{
              primary: classes.listText,
            }}
          />
          <ListItemSecondaryAction>
            <Skeleton variant={'circle'} width={12} height={14} />
          </ListItemSecondaryAction>
        </ListItem>
      ) : months.map((month, index) => (
        <ListItem
          key={index}
          button
          className={classes.dateSection}
          // selected={selectedIndex === 0}
          // onClick={(event) => handleListItemClick(event, 0)}
          onClick={() => handleSearch(month.value)}
        >
          <ListItemIcon className={classes.listIcon}>
            <DateRangeIcon color={searchParam.month==month.value?'primary':'textPrmary'} />
          </ListItemIcon>
          <ListItemText
            primary={month.label}
            className={clsx(classes.listText, 
              searchParam.month==month.value && classes.listActiveText
            )}
          />
          <ListItemSecondaryAction>
            <IconButton edge='end' className={classes.newsCount} style={{backgroundColor: searchParam.month==month.value?'#30c450':'#ADB0C2'}}>
              {month.count}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 40,
  },
  dateSection: {
    width: '200px',

  },
  listSection: {
    display: 'flex',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      height: 5
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#8c8c8c',
      borderRadius: '4px'
    },
  },
  listText: {
    fontSize: 14,
    fontWeight: 500,
  },
  listActiveText: {
    color: theme.palette.primary.main,
  },
  newsCount: {
    width: 24,
    height: 24,
    color: 'white',
    borderRadius: '50%',
    fontSize: 14,
  },

}))