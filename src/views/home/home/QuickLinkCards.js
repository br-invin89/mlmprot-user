import React from 'react'
import {
  Grid, IconButton, Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Card from 'components/cards/Card'
import RankIcon from 'assets/icons/rank.svg'
import EarningIcon from 'assets/icons/earning.svg'
import LeaderboardIcon from 'assets/icons/star.svg'
import WalletIcon from 'assets/icons/wallet-color.svg'
import MyTeamIcon from 'assets/icons/my-team.svg'
import CartIcon from 'assets/icons/cart.svg'
const plan = process.env.REACT_APP_COMPENSATION_PLAN

export default () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'#FFEFF6'} 
          icon={RankIcon}
          label={'Rank'} 
          link={'/analytics/rank'} 
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'rgba(73, 160, 255, 0.17)'} 
          icon={EarningIcon}
          label={'Earnings'} 
          link={'/analytics/earning-records'} 
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'rgba(255, 105, 19, 0.17)'} 
          icon={LeaderboardIcon}
          label={'Leaderboard'} 
          link={'/analytics/leaderboard'}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'rgba(88, 86, 214, 0.18)'} 
          icon={WalletIcon}
          label={'Credit Wallet'} 
          link={'/credit-wallet/transfer-commissions'} 
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'rgba(96, 255, 106, 0.1)'} 
          icon={MyTeamIcon}
          label={'My Team'} 
          link={plan != 'Binary' ? '/my-team/enroller-tree' : '/my-team/binary-tree'} 
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <QuickLinkCard iconBgColor={'rgba(255, 204, 0, 0.1)'} 
          icon={CartIcon}
          label={'Shopping'} 
          link={'/shop/home'} 
        />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  cardRoot: {
    marginBottom: '4px',
    '&:hover': {
      boxShadow: '0px 2px 10px #a5a9bf'
    }
  },
  cardContentRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconRoot: {
    width: '60px', height: '60px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center', alignItems: 'center'
  },
  icon: {
    width: '28px', height: '28px'
  }, 
  label: {
    fontSize: '14px',
    fontWeight: 500,
    marginTop: '8px',
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const QuickLinkCard = ({ iconBgColor, icon, label, link }) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardRoot}>
      <div className={classes.cardContentRoot}>
        <IconButton style={{ backgroundColor: iconBgColor }} 
          component={Link} to={link}
        >
          <img src={icon} className={classes.icon} />
        </IconButton>
        <Typography component={Link} className={classes.label} to={link}>
          {label}
        </Typography>
      </div>
    </Card>
  )  
}
