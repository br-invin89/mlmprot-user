import React from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Accordion,
  Collapse,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { 
  mobileMenus, mobileMenusOnFraud, 
  mobileMenusOnCustomer, mobileMenusOnTax, 
} from "../menus";

const MobileMenu = ({ handleDrawerClose, isOpenedDrawer }) => {
  const classes = useStyles();
  const myUser = useSelector(state=>state.auth.user)
  const [open, setOpen] = React.useState("");
  const [open2, setOpen2] = React.useState("");

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpenedDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List disablePadding>
        {(
          myUser && (myUser.verification_status==2)?mobileMenusOnFraud:
          myUser && (myUser.tax_status==2)?mobileMenusOnTax:
          myUser && myUser.type==2?mobileMenusOnCustomer:
          mobileMenus
        ).map((item, index) =>
          item.path ? (
            <ListItem
              key={index}
              button
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
            >
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={item.title} />
            </ListItem>
          ) : (
            <React.Fragment key={index}>
              <ListItem button onClick={() => setOpen(item.title)}>
                <ListItemText primary={item.title} />
                {open === item.title ? <RemoveIcon /> : <AddIcon />}
              </ListItem>
              <ListItem className={classes.listItem}>
                {item.submenus ? (
                  <Collapse
                    in={open === item.title}
                    timeout="auto"
                    unmountOnExit
                    style={{width: '100%'}}
                  >
                    <List>
                      {item.submenus.map((subItem) =>
                        subItem.path ? (
                          <ListItem
                            key={subItem.title}
                            button
                            component={Link}
                            to={subItem.path}
                            onClick={handleDrawerClose}
                          >
                            <ListItemText primary={subItem.title} />
                          </ListItem>
                        ) : (
                          <React.Fragment key={subItem.title}>
                            <ListItem
                              button
                              onClick={() => setOpen2(subItem.title)}
                              className={classes.listItem}
                            >
                              <ListItemText primary={subItem.title} />
                              {open2 === subItem.title ? (
                                <RemoveIcon />
                              ) : (
                                <AddIcon />
                              )}
                            </ListItem>
                            <ListItem className={classes.listItem}>
                              {subItem.submenus && (
                                <Collapse
                                  in={open2 === subItem.title}
                                  timeout="auto"
                                  unmountOnExit
                                  style={{width: '100%'}}
                                >
                                  <List>
                                    {subItem.submenus.map((sub2Item) =>
                                      sub2Item.path ? (
                                        <ListItem
                                          key={sub2Item.title}
                                          button
                                          component={Link}
                                          to={sub2Item.path}
                                          onClick={handleDrawerClose}     
                                          className={classes.listItem}
                                        >
                                          <ListItemText
                                            primary={sub2Item.title}
                                          />
                                        </ListItem>
                                      ) : (
                                        <ListItem button >
                                          <ListItemText
                                            primary={sub2Item.title}
                                          />
                                        </ListItem>
                                      )
                                    )}
                                  </List>
                                </Collapse>
                              )}
                            </ListItem>
                          </React.Fragment>
                        )
                      )}
                    </List>
                  </Collapse>
                ) : (
                  ""
                )}
              </ListItem>
            </React.Fragment>
          )
        )}
      </List>
    </Drawer>
  );
};

export default MobileMenu

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
    justifyContent: "flex-end",
  },
}));
