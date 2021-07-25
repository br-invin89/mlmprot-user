import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { ReactComponent as BinaryIcon } from "assets/icons/binary.svg";
import { ReactComponent as UilevelIcon } from "assets/icons/unilevel.svg";
const plan = process.env.REACT_APP_COMPENSATION_PLAN;

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.btnGroup}>
      <Button
        variant="outlined"
        startIcon={
          <BinaryIcon
            fill={
              selectedTab === "Binary"
                ? theme.palette.primary.main
                : theme.palette.action.disabled
            }
          />
        }
        className={clsx(
          classes.btn,
          selectedTab === "Binary" ? classes.btnActived : ""
        )}
        onClick={() => setSelectedTab("Binary")}
      >
        Binary
      </Button>
      <Button
        variant="outlined"
        startIcon={
          <UilevelIcon
            fill={
              selectedTab === "Unilevel"
                ? theme.palette.primary.main
                : theme.palette.action.disabled
            }
          />
        }
        className={clsx(
          classes.btn,
          selectedTab === "Unilevel" ? classes.btnActived : ""
        )}
        onClick={() => setSelectedTab("Unilevel")}
      >
        Unilevel
      </Button>
    </div>
  );
};

export default Tabs

const useStyles = makeStyles((theme) => ({
  btn: {
    border: `1px solid ${theme.palette.action.disabled}`,
    color: theme.palette.action.disabled,
    borderRadius: 22.5,
    fontSize: 16,
    fontWeight: 500,
    padding: theme.spacing(0.8, 1.5),
    textTransform: "capitalize",
    marginRight: "8px",
    minWidth: 118,
  },
  btnActived: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
  btnGroup: {
    marginTop: theme.spacing(1),
  },
}));
