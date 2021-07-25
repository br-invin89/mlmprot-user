import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Input, MenuItem, Snackbar
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import clsx from 'clsx'
import { callGetApiWithAuth } from 'utils/api'
import useStyles from './SearchBar.style'

export default function SearchBar( props ) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)
  const [searchInput, setSearchInput] = useState('')
  const [downlines, setDownlines] = useState([])  
  
  const onChangeSearch = (e) => {
    setSearchInput(e.target.value)
  }
  const handleSearch = (userInput) => {
    if (!userInput) {
      props.setErrorMessage('Input username')
      return 
    }
    if (isNaN(userInput)) {
      props.setErrorMessage('Input ID as number')
      return 
    }
    setDownlines([])
    props.search(userInput)
  }
  const searchDownline = (q) => {
    if (!q) return    
    callGetApiWithAuth(`common/search_downline/${q}`, onGetDownlines)
  }
  const onGetDownlines = (data) => {
    setDownlines(data.data)
    if (data.data.length==0) {
      props.setErrorMessage('Incorrect username')
    } else {
      props.search(data.data[0].downline_id)
    }
  }
  const loadRoot = () => {
    setDownlines([])
    props.loadRoot()
  }
  const loadParent = () => {
    setDownlines([])
    props.loadParent()
  }

  return (
    <div className={classes.root}>
      <div className={classes.searchRoot}>
        <div style={{display: 'flex'}}>
          <Input 
            value={searchInput}
            onChange={onChangeSearch}
            className={classes.searchInput}
            placeholder='Search Username...' 
          />
          <Button className={classes.searchBtn2}
            variant={'outlined'}
            onClick={()=>searchDownline(searchInput)}
          >
            <SearchOutlinedIcon />
          </Button>
        </div>
        {/*
        downlines.length>0 &&
          <ul className={classes.searchResults}>
            {downlines.map((user, index)=>(
              <MenuItem key={index} onClick={()=>handleSearch(user.downline_id)}>
                {`${user.downliner.first_name} ${user.downliner.last_name}`}
              </MenuItem>
            ))}
          </ul>
        */}

        <div style={{display: 'flex'}}>          
          <Button className={classes.searchBtn}
            variant={'outlined'}
            size={'small'}
            onClick={loadParent}
            disabled={myUser && props.treeData && myUser.id==props.treeData.id}
          >
            Up 1 Level
          </Button>
          <Button className={classes.searchBtn}
            variant={'outlined'}
            onClick={loadRoot}
            size={'small'}
          >
            Top
          </Button>
        </div>
      </div>
      <div className={classes.descBox}>
        <div className={classes.descTextRoot}>
          <div className={clsx(classes.descTextIcon, classes.userType1Color)} 
          />
          Affiliate
        </div> 
        <div className={classes.descTextRoot}>
          <div className={clsx(classes.descTextIcon, classes.userType2Color)} 
          />
          Customer
        </div> 
      </div>
      
    </div>
  )
}
