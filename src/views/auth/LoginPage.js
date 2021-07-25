import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import LoginForm from './login/LoginForm'
import PreLoginForm from './login/PreLoginForm'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import NavLogo from 'assets/images/navLogo.png'

const LoginPage = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('login')

  return (
    <div className={classes.pageContent}>
      <div className={classes.formGroup}>
        <img 
          className={classes.logoImage}
          src={NavLogo}
        />
        {/* <div>
          <Tabs 
            className={classes.tabs}
            value={selectedTab} 
            onChange={(_, tab)=>setSelectedTab(tab)} 
            aria-label=""
          >
            <Tab className={classes.tab} label="Sign In" value="login" />
            <Tab className={classes.tab} label="Pre-Enrollee Signin" value="pre-enrollee-login" />
          </Tabs>
        </div>
        <TabPanel selectedTab={selectedTab} tab={'login'}> */}
          <LoginForm />
        {/* </TabPanel>
        <TabPanel selectedTab={selectedTab} tab={'pre-enrollee-login'}>
          <PreLoginForm />
        </TabPanel> */}
      </div>
    </div>
  )
}

export default LoginPage

const TabPanel = ({ children, selectedTab, tab }) => (
  <div 
    role="tabpanel"
    hidden={selectedTab !== tab}
    style={{ height: '200px'}}
  >
    {children}
  </div>
)

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
