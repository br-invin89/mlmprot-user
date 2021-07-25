import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Box } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "transparent",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    margin: "5px 0",
    marginLeft: "7px",
    padding: 0,
    color: "white",
    "&:focus, &:hover": {
      backgroundColor: "transparent",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default ({}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyle();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <span onClick={handleClick}>
        {anchorEl ? (
          <CloseIcon className={classes.morePointerIcon} />
        ) : (
          <MoreVertIcon
            className={classes.morePointerIcon}
            onClick={handleClick}
          />
        )}
      </span>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Box className={classes.iconContainer}>
            <EditIcon className={classes.actionIcon} fontSize='small' />
          </Box>
        </StyledMenuItem>
        <StyledMenuItem>
          <Box className={classes.iconContainer}>
            <DeleteOutlineIcon
              className={classes.actionIcon}
              fontSize='small'
            />
          </Box>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  actionIcon: {
    color: "white",
    paddingTop: "5px",
  },
  morePointerIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  iconContainer: {
    background: theme.palette.primary.main,
    borderRadius: "50px",
    padding: "1px 4px",
  },
}));
