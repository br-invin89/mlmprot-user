import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Select, MenuItem } from '@material-ui/core'

const NumberRange = (props) => {
  const classes = useStyles()
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  useEffect(() => {
    let value = props.value.split('|')
    setFrom(value[0])
    setTo(value[1])
  }, [props.value])

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <label>{props.label}</label>
      </div>
      <div className={classes.row}>
        <Select className={classes.input} 
          value={from} onChange={e=>{
            setFrom(e.target.value)
            props.onChange(e.target.value+'|'+to)
          }}
        >
          <MenuItem value={0}>&nbsp;</MenuItem>
          {props.options.map(option => 
          <MenuItem value={option.value}>{option.label}</MenuItem>
          )}
        </Select>
        <span className={classes.delimeter}>~</span>
        <Select className={classes.input} 
          value={to} onChange={e=>{
            setTo(e.target.value)
            props.onChange(from+'|'+e.target.value)
          }}
        >
          <MenuItem value={0}>&nbsp;</MenuItem>
          {props.options.map(option => 
          <MenuItem value={option.value}>{option.label}</MenuItem>
          )}
        </Select>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex'
  },
  delimeter: {
    width: 80,
    textAlign: 'center'
  },
  input: {
    '& input': {
      textAlign: 'center'
    }    
  }
}))

export default NumberRange
