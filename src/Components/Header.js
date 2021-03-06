import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { GET_CART_ITEMS } from "../Actions/queries";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 14
    }
  }
}));

const Header = () => {
  const classes = useStyles();

  const { data, loading, error, client } = useQuery(GET_CART_ITEMS);
  const [cartItemLen, setCartItemLen] = useState(0);

  useEffect(() => {
    const { cartItems } = data;
    setCartItemLen(cartItems.length);
  }, [data]);

  const openCart = () => {
    client.writeData({ data: { cartIsOpen: true } });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Synapbox Movies
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label={`${cartItemLen} peliculas en el carrito`}
              color="inherit"
              onClick={openCart}
              data-testid="openCart"
            >
              <Badge badgeContent={cartItemLen} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
