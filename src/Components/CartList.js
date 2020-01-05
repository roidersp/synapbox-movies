import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { GET_CART_ITEMS, GET_MOVIES_BY_ID } from "../Actions/queries";
import { useQuery } from "react-apollo";

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

const itemStyles = makeStyles({
  actions: {}
});

const CartItems = ({ cartItems }) => {
  const classes = itemStyles();

  const deleteItem = id => {
    console.log("delete", id);
  };

  const { loading, error, data, client } = useQuery(GET_MOVIES_BY_ID, {
    variables: { ids: cartItems }
  });

  if (error) return <div>Error al cargar</div>;
  if (loading) return <div>Cargando...</div>;
  if (!data) return null;

  const { movies } = data;

  return movies.map(({ id, title, image, price }) => (
    <Fragment key={id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={title} src={image} />
        </ListItemAvatar>
        <ListItemText primary={title} secondary={`$ ${price}`} />
        <ListItemSecondaryAction className={classes.actions}>
          <IconButton onClick={() => deleteItem(id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  ));
};

const Carlist = () => {
  const classes = useStyles();

  const { loading, error, data, client } = useQuery(GET_CART_ITEMS);

  const closeDrawer = () => client.writeData({ data: { cartIsOpen: false } });

  if (error) return <div>Error al cargar</div>;
  if (loading) return <div>Cargando...</div>;
  if (!data) return null;

  return (
    <List>
      <CartItems {...data} />
    </List>
  );
};

export default Carlist;
