import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
  Grid, Modal, Fade, Typography,
  Select, MenuItem, FormControl, InputLabel, IconButton,
  Button, CircularProgress
} from '@material-ui/core'
import Popconfirm from 'components/confirm/Popconfirm'
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'
import { asPrice } from 'utils/text'
import CheckedIcon from 'assets/icons/checked2.svg'
import CloseIcon from "@material-ui/icons/Close";

export default ({ userData, isOpened, closeEdition, afterUpdateSuccess, onErrorMessage }) => {
  if (!userData) return ''

  const classes = useStyles()

  const [isUpdating, setIsUpdating] = useState(false)
  const [enrollmentFee, setEnrollmentFee] = useState(undefined)
  const [updatingEl, setUpdatingEl] = useState(null)
  const [updatingAffiliateEl, setUpdatingAffiliateEl] = useState(null)

	useEffect(() => {
		getEnrollmentFee()
	}, [])

	const getEnrollmentFee = () => {
		callGetApiWithAuth('setting/enrollment_fee', onGetEnrollmentFee)
	}
	const onGetEnrollmentFee = (data) => {
		const { setting } = data
		if (!setting.is_active) {
			setEnrollmentFee(0)
		} else {
			if (setting.is_discount_applicable) {
				setEnrollmentFee(setting.discount)
			} else {
				setEnrollmentFee(setting.fees)
			}
		}
	}
  const upgradeType = (type) => {
    setIsUpdating(true)
    callPostApiWithAuth('setting/upgrade/user/type', { type }, onDoneUpgrade, onFailUpgrade)
  }
  const onDoneUpgrade = (data) => {
    setIsUpdating(false)
    afterUpdateSuccess('User type has been upgraded.')
    closeEdition()
  }
  const onFailUpgrade = (errorMessage) => {
    setIsUpdating(false)
    onErrorMessage(errorMessage)
  }

  return (
    <Modal open={isOpened} onClose={closeEdition}>
      <Fade in={isOpened}>
        <div className={classes.modalRoot}>
          <Typography component={'h2'}>Upgrade Type</Typography>
          <IconButton
            component="span"
            className={classes.close}
            onClick={closeEdition}
          >
            <CloseIcon />
          </IconButton>
          <Grid container className={classes.boxList}>
            {/*
            <Grid item xs={12} md={4} className={classes.box}>
              <Typography component={'div'}>
                <Typography component={'h3'}>
                  Retail
                </Typography>
                <Typography component={'h4'}>
                  Regular Retail Pricing
                </Typography>
                <Typography component={'h4'}>
                  One Time Purchase
                </Typography>
              </Typography>
              <div className={classes.actionGroup}>
                {userData.type==0?
                  <Button className={classes.currentBtn}>
                    Selected
                  </Button>
                :
                  <Button className={classes.disabledBtn}>
                    Selected
                  </Button>
                }
              </div>
            </Grid>
              */}
            <Grid item xs={12} md={6} className={classes.box}>
              <Typography component={'div'}>
                <Typography component={'h3'}>
                  Customer
                </Typography>
                <Typography component={'h4'}>
                  Special Member Pricing
                </Typography>
                <Typography component={'h4'}>
                  Order Regularly As Needed
                </Typography>
                <Typography component={'h4'}>
                  One Time Purchase
                </Typography>
              </Typography>
              <div className={classes.actionGroup}>
                {userData.type==0?
                  <>
                  <Button className={classes.updateBtn}
                    onClick={(e)=>setUpdatingEl(e.currentTarget)}
                  >
                    Select
                  </Button>
                  <Popconfirm
                    onConfirm={()=>{upgradeType(2); setUpdatingEl(null);}}
                    anchorEl={updatingEl}
                    onCancel={()=>setUpdatingEl(null)}
                  />
                  </>
                : userData.type==2?
                  <Button className={classes.currentBtn}>
                    Selected
                  </Button>
                :
                  <Button className={classes.disabledBtn}>
                    Selected
                  </Button>
                }
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.box}>
              <Typography component={'div'}>
                <Typography component={'h3'}>
                  Affiliate
                </Typography>
                <Typography component={'h4'}>
                  Special Member Pricing
                </Typography>
                <Typography component={'h4'}>
                  Earn Commission from Compensation Plan
                </Typography>
                <Typography component={'h4'}>
                  Order Regularly As Needed
                </Typography>
                <Typography component={'h4'}>
                  One Time Purchase
                </Typography>
              </Typography>
              <div className={classes.actionGroup}>
                {(userData.type==0||userData.type==2)?
                  <>
                  <Button className={classes.updateBtn} 
                    disabled={enrollmentFee===undefined}
                    onClick={e=>setUpdatingAffiliateEl(e.currentTarget)}
                  >
                    Select
                  </Button>
                  <Popconfirm
                    title={`It will be charged ${asPrice(enrollmentFee)}. Are you sure?`}
                    anchorEl={updatingAffiliateEl}
                    onConfirm={()=>{upgradeType(1); setUpdatingAffiliateEl(null);}}
                    onCancel={()=>setUpdatingAffiliateEl(null)}
                  />
                  </>
                : <Button className={classes.currentBtn}>
                    Selected
                  </Button>
                }
              </div>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  modalRoot: {
    position: 'absolute',
    width: 460,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)',
      top: '20px',
      left: '10px',
      transform: `translate(-100% + 20px, -50%)`,
    }
  },
  close: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  boxList: {
    flexWrap: 'nowrap',
    width: 'calc(100% + 32px)',
    marginLeft: -16,
    marginRight: -16,
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    }
  },
  box: {
    position: 'relative',
    margin: 16,
    background: '#F5F8FA',
    border: '1px solid #E6EAEE',
    boxSizing: 'border-box',
    borderRadius: '4px 4px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
    '& h4': {
      margin: '6px 0px',
      fontSize: 14,
      lineHeight: '1.2em',
      color: theme.palette.text.secondary,
      paddingLeft: '20px',
      backgroundImage: `url(${CheckedIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0px 2px'
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 20px)'
    }
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
  },
  disabledBtn: {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.primaryInverted,
    cursor: 'not-allowed',
    "&:hover, &:focus": {
      backgroundColor: theme.palette.action.disabled,
      color: theme.palette.text.primaryInverted,
    },
  },
  updateBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primaryInverted,
  },
  currentBtn: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.primaryInverted,
    cursor: 'not-allowed',
    "&:hover, &:focus": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.text.primaryInverted,
    }
  }
}))
