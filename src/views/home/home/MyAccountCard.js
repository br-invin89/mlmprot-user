import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import clsx from 'clsx'
import { ReactComponent as SettingIcon } from 'assets/icons/settings.svg'
import { callGetApiWithAuth } from 'utils/api'
import { refreshStorage } from 'utils/auth'
import NoPhotoImage from 'assets/images/nophoto.jpg'
import useStyles from './MyAccountCard.style'
import { Skeleton } from '@material-ui/lab'
import { userStatusText } from 'config/var'

const plan = process.env.REACT_APP_COMPENSATION_PLAN

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const [data, setData] = useState(undefined)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    callGetApiWithAuth('profile', onGetData)
  }
  const onGetData = (data) => {
    setData(data.user)
    dispatch({
      type: 'auth.REFRESH',
      payload: { user: data.user },
    })
    refreshStorage(data.user)
  }
  const goSetting = () => {
    history.push('/setting')
  }

  return (
    <div className={classes.root}>
      <div className={classes.accountLinks}>
        <Typography component={'h2'} className={classes.accountLink}>
          My Account
        </Typography>
        <IconButton aria-label='settings' to='/settings' component={Link}>
          <SettingIcon />
        </IconButton>
      </div>
      <div className={classes.userAvatar}>
        <img
          src={data && data.image ? data.image : NoPhotoImage}
          alt='User Photo'
        />
        <Typography component='p' className={classes.name}>
          {data ? (
            `${data.first_name} ${data.last_name}`
          ) : (
            <Skeleton width={120} />
          )}
        </Typography>
        <Typography component='p' className={classes.id}>
          {data ? `#${data.uuid}` : <Skeleton width={120} />}
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <List dense>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Replicated Website' />
          <ListItemSecondaryAction>
            {data ? (
              <Button
                href={`${process.env.REACT_APP_ECOMMERCE_URL}?referer=${data.username}`}
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
      </List>
    </div>
  )
}
