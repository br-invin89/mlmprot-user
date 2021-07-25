import React from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/styles";
import { IconButton, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MiniCart from "./MiniCart";

export default () => {
  const classes = useStyle();
  const [open, toggleDrawer] = React.useState(false);
  const products = useSelector(state=>state.cart.products)
  let totalCount = 0
  products.map(product=>{totalCount+=product.count})

  return (
    <>
      <MiniCart open={open} toggleDrawer={toggleDrawer} />
      <div className={classes.btnWrapper}>
        <IconButton
          color="primary"
          onClick={() => toggleDrawer(true)}
          className={classes.btn}
        >
          <ShoppingCartIcon />
          {
            totalCount > 0 &&
            <Typography
              component={'span'}
              className={classes.badge}
            >{totalCount}</Typography>
          }
        </IconButton>
      </div>
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  btnWrapper: {
    position: "fixed",
    right: 20,
    bottom: 20,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.palette.secondary.main,
    width: 15,
    height: 15,
    color: theme.palette.text.primaryInverted,
    borderRadius: '50%',
    fontSize: 12,
  }
}));
