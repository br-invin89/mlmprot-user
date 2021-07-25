import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Typography, Divider,
  List, ListItem, ListItemText,
  ListItemSecondaryAction,
  Button, IconButton,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import clsx from 'clsx'
import { ReactComponent as SettingIcon } from 'assets/icons/settings.svg'
import { callGetApiWithAuth } from 'utils/api'
import { refreshStorage } from 'utils/auth'
import { asPrice } from 'utils/text'
import NoPhotoImage from 'assets/images/nophoto.jpg'
import useStyles from './MyAccountCard.style'
import { Skeleton } from '@material-ui/lab'
import { userStatusText } from 'config/var'

export default function MyAccountCard() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState(undefined)
  const [walletData, setWalletData] = useState(undefined)

  useEffect(() => {
    loadData()
    // loadWallet()
  }, [])

  const loadData = () => {
    callGetApiWithAuth('profile', onGetData)
  }
  const onGetData = (data) => {
    setData(data.data)
    dispatch({
      type: 'auth.REFRESH',
      payload: { user: data.data },
    })
    refreshStorage(data.data)
  }

  return (
    <div className={classes.root}>
      <div className={classes.accountLinks}>
        <Typography component={'h2'} className={classes.accountLink}>
          My Account
        </Typography>
        {/* <IconButton aria-label="settings" to='/settings'>
          <SettingIcon />
        </IconButton> */}
      </div>
      <div className={classes.userAvatar}>
        <img src={data && data.image ? data.image : NoPhotoImage} alt='merry' />
        <Typography component='p' className={classes.name}>
          {data ? (
            `${data.first_name} ${data.last_name}`
          ) : (
            <Skeleton width={120} />
          )}
        </Typography>
        <Typography component='pu' className={classes.id}>
          {data ? `#${data.uuid}` : <Skeleton width={120} />}
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <List dense className={classes.listItemMain}>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Rank' />
          <ListItemSecondaryAction className={classes.listText}>
            {data ? data.rank.name : <Skeleton width={120} />}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Username' />
          <ListItemSecondaryAction className={classes.listText}>
            {data ? data.username : <Skeleton width={120} />}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Status' />
          <ListItemSecondaryAction className={classes.listText}>
            {data ? userStatusText(data.status) : <Skeleton width={120} />}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Personal Volume' />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.qualification ? (
              data.qualification.pv
            ) : (
              <Skeleton width={120} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Total GV This Month' />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.qualification ? (
              data.qualification.gv
            ) : (
              <Skeleton width={120} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Replicated Website' className={classes.website}/>
          <ListItemSecondaryAction>
            {data ? (
              <Button
                href={`${process.env.REACT_APP_ECOMMERCE_URL}/e/${data.username}`}
                size='small'
                endIcon={<ExitToAppIcon fontSize='small' />}
                className={classes.websiteLink}
              >
                Visit
              </Button>
            ) : (
              <Skeleton width={80} height={40} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Credit Wallet Balance' className={classes.website} />
          <ListItemSecondaryAction className={classes.listText}>
            {data ? (
              asPrice(data.wallet.current_balance)
            ) : (
              <Skeleton width={120} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Total Withdrawn' className={classes.website} />
          <ListItemSecondaryAction className={classes.listText}>
            {data ? (
              asPrice(data.wallet.withdrawn_amount)
            ) : (
              <Skeleton width={120} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Product Credit' className={classes.website} />
          <ListItemSecondaryAction className={classes.listText}>
            {(data && data.product_credit.pc_amount>0)?
              <Link className={classes.pcLink}
                to={'/shop/products'}
              >
                Redeem Credits
              </Link>
            : ''}
            {(data && data.product_credit.pc_amount==0)?
              <Link className={classes.pcLink}
                to={'/shop/product_credits'}
              >
                Buy Credits
              </Link>
            : ''}
            {data ? (
              data.product_credit.pc_amount
            ) : (
              <Skeleton width={120} />
            )}            
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={clsx(classes.listItem, classes.pvListItem)}>
          <ListItemText primary='Sample Credit' className={classes.website} />
          <ListItemSecondaryAction className={classes.listText}>
            {(data && data.product_credit.sc_amount>0)?
              <Link className={classes.pcLink}
                to={'/shop/sample_products'}
              >
                Redeem Credits
              </Link>
            : ''}
            {(data && data.product_credit.sc_amount==0)?
              <Link className={classes.pcLink}
                to={'/shop/product_credits'}
              >
                Buy Credits
              </Link>
            : ''}
            {data ? (
              data.product_credit.sc_amount
            ) : (
              <Skeleton width={120} />
            )}            
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}
