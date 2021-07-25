import React from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/styles";
import { 
  Drawer, Collapse, 
  List, ListItem, ListItemText, 
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars'
import MenuItem from './MenuItem'
import { 
  menus, menusOnCustomer,  
  menusOnFraud, menusOnTax,

  mobileMenus, mobileMenusOnFraud, 
  mobileMenusOnCustomer, mobileMenusOnTax, 
} from '../menus'
import logoImage from 'assets/images/navLogo.png'

export default function LeftSidebar({ hideSubMenus }) {
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)

  return (
    <Drawer
      className={classes.drawer} 
      variant={'persistent'}
      anchor='left'
      open={true}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <img src={logoImage} 
          className={classes.logoImage}
          alt={'Aluva'}
        />
      </div>
      <div className={classes.menuWrapper}>
        <Scrollbars
          autoHide
          renderTrackVertical={(({style, ...props}) => 
            <div className={classes.sliderBack} />
          )}
          renderThumbVertical={(({style, ...props}) => 
            <div className={classes.sliderFore} />
          )}
        >
          <List disalbePadding>
            {(
              myUser && (myUser.verification_status==2)?(hideSubMenus ? mobileMenusOnFraud : menusOnFraud):
              myUser && (myUser.tax_status==2)?(hideSubMenus ? mobileMenusOnTax : menusOnTax):
              myUser && (myUser.type==2 || myUser.type==3)?(hideSubMenus ? mobileMenusOnCustomer : menusOnCustomer):
              (hideSubMenus ? mobileMenus : menus)
            ).map((item, index) => 
              <MenuItem item={item} key={index} />
            )}
          </List>
        </Scrollbars>
      </div>
      
    </Drawer>
  )
}

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.dimGray,
  },
  listItem: {
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  logoImage: {
    height: 25
  },
  menuWrapper: {
    height: 'calc(100vh - 82px)'
  },
  sliderBack: {
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    right: '2px',
    bottom: '2px',
    top: '2px',
    borderRadius: '3px',
    width: '5px',
  },
  sliderFore: {
    width: '5px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#8c8c8c'
  }
}));
