import React, { useEffect, useState } from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { asPrice, asDate } from 'utils/text'

export default function ProductCreditCard(props) {  
  const classes = useStyles()

  const makeSubscription = (productId) => {

  }
  const activeSubscription = (subscriptionId) => {

  }
  const cancelSubscription = (subscriptionId) => {

  }

  return (
    <Paper className={`${classes.root} ${props.index==2?classes.gradientRoot:''}`}>
      <div className={classes.innerRoot}>
        {/* <div className={classes.imageRoot}>
          <img className={classes.image} 
            src={`/images/subscription${props.index+1}.png`} 
            alt={'Subscription Level'}
          />
        </div> */}
        <div className={classes.title}>
          {props.data.title}
        </div>
        <div className={classes.price}>
          {asPrice(props.data.member_price)}
        </div>
        <div className={classes.subtitle}>
          {props.data.subtitle}
        </div>
        <div className={classes.description}
          dangerouslySetInnerHTML={{__html: props.data.description}}
        />
        <div className={classes.actionRoot}>
          {props.data.subscription?
          <>
            {props.data.subscription.status==1 && 
            <>
              <div className={classes.statusRoot}>
                <span className={classes.statusBadge}>
                  Active
                </span>
                <span className={classes.dateBadge}>
                  Next Billing On:&nbsp;
                  {asDate(props.data.subscription.next_billing_at)}
                </span>
              </div>
              <Button className={classes.activeBtn} variant={'contained'}>
                Cancel
              </Button>
            </>
            }
            {props.data.subscription.status==2 && 
            <>
              <div className={classes.statusRoot}>
                <span className={classes.statusErrorBadge}>
                  Failed
                </span>
                <span className={classes.dateBadge}>
                  Failed On:&nbsp;
                  {asDate(props.data.subscription.inactive_at)}
                </span>
              </div>
              <Button className={classes.activeBtn} variant={'contained'}>
                Reactivate
              </Button>
            </>
            }
          </>
          :
          <Button className={classes.activeBtn} variant={'contained'}>
            Select
          </Button>
          }
        </div>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#444b56',
    padding: '12px',
    marginBottom: '24px',
    '&:hover': {
      boxshadow: '0 5px 15px rgba(0,0,0,0.3)'
    }
  },
  gradientRoot: {
    background: 'rgb(119,109,166)',
    background: 'linear-gradient(135deg, rgba(119,109,166,1) 35%, rgba(97,153,180,1) 100%)'
  },
  innerRoot: {
    height: '450px',
    border: '1px solid #fff',
    padding: '20px 12px',
  },
  imageRoot: {
    textAlign: 'center',
  },
  image: {
    width: '90px',
    height: '64px'
  },
  title: {
    color: '#fff',
    fontSize: '18px'
  },
  price: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    color: '#fff',
    marginBottom: '20px',
  },
  description: {
    '& p': {
      marginBottom: 0,
      marginTop: 0,
      color: '#fff'
    }
  },
  actionRoot: {
    position: 'absolute',
    bottom: '20px',
    left: 0, 
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  activeBtn: {
    width: '240px',

  },
  activedBtn: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    width: '180px',
  },
  billingAt: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      marginTop: 0,
      marginBottom: 0,
      color: '#fff',
      fontSize: '12px'
    }
  },
  statusRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 48px)',
    marginBottom: '6px',
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  statusBadge: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  },
  statusErrorBadge: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  },
  dateBadge: {
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  }
}))
