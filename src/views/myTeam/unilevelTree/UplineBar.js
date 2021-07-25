import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

export default function UplineBar(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {props.uplines.map((el, index) => 
        <>
          <div className={classes.breadcrumb}>
            <Typography
              onClick={() => props.goUser(el)}
              component={'a'}
            >
              {el.first_name+' '+el.last_name}
            </Typography>
          </div>
          {index<props.uplines.length-1 &&
            <div className={classes.breadcrumbSplit}>
              &gt;
            </div>
          }
        </>
      )}      
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  breadcrumb: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  breadcrumbSplit: {
    padding: '0 8px'
  }

}))
