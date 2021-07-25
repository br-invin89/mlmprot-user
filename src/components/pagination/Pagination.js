import React from 'react'
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Pagination } from "@material-ui/lab";

export default ({ paginationParams, onPageChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      { paginationParams.total>0 && 
        <Typography component="p" className={classes.results}>
          {`Showing Results 
            ${(paginationParams.currentPage - 1)*paginationParams.perPage +1}-
            ${paginationParams.currentPage*paginationParams.perPage<paginationParams.total?paginationParams.currentPage*paginationParams.perPage:paginationParams.total} 0f ${
            paginationParams.total
          }`}{" "}
        </Typography>
      }
      {paginationParams.total>0 && 
        <Pagination
          count={Math.ceil(
            paginationParams.total / paginationParams.perPage
          )}
          page={paginationParams.currentPage}
          onChange={onPageChange}
          className={classes.pagination}
        />
      }
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 22,
    paddingLeft: 12,
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    },
  },
  pagination: {
    marginTop: -10,
    [theme.breakpoints.down('xs')]: {
      marginTop: '13px'
    }
  },
  results: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
}))
