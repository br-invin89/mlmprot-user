import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/ExpandLess";

export default function MenuItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = history.location;
  const [isOpenedSub, setIsOpenedSub] = useState(false);

  useEffect(() => {
    if (isActiveLink(props.item, pathname)) {
      setIsOpenedSub(true);
    }
  }, [props.item]);
  return (
    <React.Fragment>
      {!props.item.submenus ? (
        <ListItem
          button
          component={Link}
          to={props.item.path}
          className={
            isActiveLink(props.item, pathname)
              ? classes.activeItem
              : classes.inactiveItem
          }
        >
          {props.item.icon && (
            <ListItemIcon className={classes.itemIcon}>
              {props.item.icon}
            </ListItemIcon>
          )}
          <ListItemText primary={props.item.title} className={classes.listItemMenuText}/>
        </ListItem>
      ) : (
        <React.Fragment>
          <ListItem
            className={
              isActiveLink(props.item, pathname)
                ? classes.activeItem
                : classes.inactiveItem
            }
            button
            onClick={() => setIsOpenedSub(!isOpenedSub)}
          >
            {props.item.icon && (
              <ListItemIcon className={classes.itemIcon}>
                {props.item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={props.item.title} className={classes.listItemMenuText}/>
            {isOpenedSub ? <RemoveIcon /> : <AddIcon />}
          </ListItem>
          <ListItem className={classes.listItem}>
            {props.item.submenus ? (
              <Collapse
                in={isOpenedSub}
                timeout="auto"
                unmountOnExit
                style={{ width: "100%" }}
              >
                <List>
                  {props.item.submenus.map((subItem) =>
                    subItem.tabs ? (
                      <div>
                        <ListItem
                          key={subItem.title}
                          button
                          component={Link}
                          to={subItem.path}
                          className={clsx(
                            classes.sublistItem,
                            isActiveLink(subItem, pathname)
                              ? classes.activeSubItem
                              : classes.inactiveSubItem
                          )}
                        >
                          <div
                            className={
                              isActiveLink(subItem, pathname)
                                ? classes.activeCircle
                                : classes.inActiveCircle
                            }
                          />
                          <ListItemText primary={subItem.title} className={classes.listItemText}/>
                        </ListItem>
                        {/*
                        subItem.tabs.map((tab) => (
                          <ListItem
                            key={tab.title}
                            button
                            component={Link}
                            className={clsx(
                              classes.sublistTabItem,
                              isActiveLink(tab, pathname)
                                ? classes.activeSubItem
                                : classes.inactiveSubItem
                            )}
                          >
                            <ListItem
                              component={Link}
                              button
                              className={classes.tablistItem}
                              to={tab.path}
                            >
                              <div
                                className={
                                  isActiveLink(tab, pathname)
                                    ? classes.activeCircle
                                    : classes.inActiveCircle
                                }
                              />
                              <ListItemText primary={tab.title} className={classes.listItemText}/>
                            </ListItem>
                          </ListItem>
                        ))
                        */}
                      </div>
                    ) : (
                      <ListItem
                        key={subItem.title}
                        button
                        component={Link}
                        to={subItem.path}
                        className={clsx(
                          classes.sublistItem,
                          isActiveLink(subItem, pathname)
                            ? classes.activeSubItem
                            : classes.inactiveSubItem
                        )}
                      >
                        <div
                          className={
                            isActiveLink(subItem, pathname)
                              ? classes.activeCircle
                              : classes.inActiveCircle
                          }
                        />
                        <ListItemText primary={subItem.title} className={classes.listItemText} />
                      </ListItem>
                    )
                  )}
                </List>
              </Collapse>
            ) : (
              ""
            )}
          </ListItem>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      fontSize: '14px !important',
      fontWeight: 400,
    },
  },
  listItemMenuText: {
    '& .MuiListItemText-primary': {
      fontWeight: 500,
      fontSize: '14px !important'
    },
  },
  listItem: {
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sublistItem: {
    marginLeft: "0px !important",
    borderLeft: `1px solid ${theme.palette.border.menu}`,
    paddingTop: 2,
    paddingBottom: 2,
  },
  sublistTabItem: {
    marginLeft: "0px !important",
    borderLeft: `1px solid ${theme.palette.border.menu}`,
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover": {
      background: theme.palette.secondary.contrastText,
    },
  },
  tablistItem: {
    margin: "0px !important",
    borderLeft: `1px solid ${theme.palette.border.menu}`,
    paddingTop: 0,
    paddingBottom: 0,
    "&:hover": {
      background: theme.palette.secondary.contrastText,
    },
  },
  itemIcon: {
    minWidth: "32px",
    color: "inherit",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  activeItem: {
    color: theme.palette.primary.menu,
    background: theme.palette.secondary.contrastText,
    borderRadius: "15px",
    padding: "13px 20px",
    width: "90%",
    margin: "auto",
    "&:hover": {
      background: theme.palette.secondary.contrastText,
    },
  },
  activeSubItem: {
    color: theme.palette.primary.menu,
    width: "100%",
    margin: "auto",
    "&:hover": {
      background: "none",
    },
  },
  inactiveSubItem: {
    width: "100%",
    margin: "auto",
    "&:hover": {
      background: "none",
    },
  },
  inactiveItem: {
    padding: "13px 20px",
    width: "90%",
    margin: "auto",
    "&:hover": {
      background: "none",
    },
  },
  inActiveCircle: {
    width: 4,
    height: 4,
    background: theme.palette.circle.inactive,
    borderRadius: 12,
    marginRight: 12,
  },
  activeCircle: {
    width: 4,
    height: 4,
    background: theme.palette.circle.active,
    borderRadius: 12,
    marginRight: 12,
  },
}));

const isActiveLink = (item, pathname) => {
  if (item.path === pathname) return true;
  if (item.submenus) {
    for (let subitem of item.submenus) {
      if (subitem.path === pathname) {
        return true;
      }
      if (subitem.tabs) {
        for (let tab of subitem.tabs) {
          if (tab.path === pathname) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
