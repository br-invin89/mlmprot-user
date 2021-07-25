import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import TextField from 'components/inputs/TextField'

export default ({ searchByTitle }) => {
  const classes = useStyles()
  const [title, setTitle] = React.useState('')
  const onEnterTitle = (e) => {
    if (e.keyCode == 13) {
      searchByTitle(title)
    }
  }

  return (
    <div className={classes.searchForm}>
      <TextField
        placeholder='Search Events...'
        name='id'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          searchByTitle(e.target.value)
        }}
        onKeyDown={(e) => onEnterTitle(e)}
        className={classes.inputField}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginLeft: theme.spacing(2),
  },
  inputField: {
    width: 331,
    background: '#FBFAFC',
    borderRadius: 6,
    '& .MuiInputLabel-outlined': {
      color: '#ADB0C2',
      fontSize: 14,
      [theme.breakpoints.down('md')]: {
        fontSize: 11,
      }
    },
  },
  selectField: {
    minWidth: 134,
  },
}))
