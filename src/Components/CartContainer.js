import React from "react";
import { useQuery } from "react-apollo";

import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import { CART_IS_OPEN } from "../Actions/queries";

import CartList from "./CartList";

const useStyles = makeStyles(({ palette }) => ({
  list: {
    width: 300
  },
  fullList: {
    width: "auto"
  },
  header: {
    backgroundColor: palette.secondary.main,
    color: "#fff",
    padding: "15px 20px",
    display: "flex",
    fontSize: 16,
    alignItems: "center",
    "& svg": {
      marginRight: 10
    }
  }
}));

const CartContainer = () => {
  const classes = useStyles();

  const { loading, error, data, client } = useQuery(CART_IS_OPEN);

  const closeDrawer = () => client.writeData({ data: { cartIsOpen: false } });

  if (error) return null;
  if (loading) return null;
  if (!data) return null;

  const { cartIsOpen } = data;

  return (
    <Drawer anchor="right" open={cartIsOpen} onClose={closeDrawer}>
      <div className={classes.list} role="presentation" onKeyDown={closeDrawer}>
        <div className={classes.header}>
          <ShoppingCart /> Tu carrito de compras
        </div>
        <div className={classes.content}>
          <CartList />
        </div>
        <div className={classes.footer}></div>
      </div>
    </Drawer>
  );
};

export default CartContainer;
