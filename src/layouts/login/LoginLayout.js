import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import { getToken } from 'utils/auth'
import LoadInit from './LoadInit'
import BgImage from 'assets/images/login-bg.png'

const LoginLayout = ({ children }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
		<div className={classes.root}>
      <Helmet>
        <title>Aluva Backoffice</title>
      </Helmet>
      <LoadInit />
      <div className={classes.leftWrapper}>&nbsp;</div>
      <div className={classes.rightWrapper}>
        <main className={classes.content}>
          {children}
        </main>
      </div>
		</div>
	)
}

export default LoginLayout

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh"
  },
  leftWrapper: {
    width: "60%",
    height: "100vh",
    backgroundImage: `url(${BgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  rightWrapper: {
    width: "40%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "rgb(255, 255, 255)",    
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    }
  },
  content: {
    flexGrow: 1,
  }
}));
