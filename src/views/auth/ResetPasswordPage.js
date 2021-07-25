import React from 'react'
import { makeStyles } from '@material-ui/styles'
import ResetPasswordForm from './resetPassword/ResetPasswordForm'
import { AppBar } from '@material-ui/core'
import NavLogo from 'assets/images/navLogo.png'

const ResetPasswordPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContent}>
      <div className={classes.formGroup}>
        <img 
          className={classes.logoImage}
          src={NavLogo}
        />
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPasswordPage

const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  formGroup: {
    width: "320px",
  },
  tabs: {
    minHeight: "32px",

    padding: "20px 0"
  },
  tab: {
    minHeight: "32px",
    minWidth: "auto",
    textTransform: "capitalize",
  },
  logoImage: {
    height: "40px",
    marginBottom: 20,
    marginLeft: "50%",
    transform: "translateX(-50%)",
  }
}))
