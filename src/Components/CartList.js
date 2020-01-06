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
  IconButton,
  Button,
  ButtonGroup
} from "@material-ui/core";
import { Delete, Shop, DeleteSweep, Cancel } from "@material-ui/icons";

import { GET_MOVIES_BY_ID } from "../Actions/queries";
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
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "5px 0",
    "& >button": {
      flexBasis: "46%",
      fontSize: 10,
      lineHeight: 1.5
    }
  },
  shopButton: {
    color: "#fff"
  },
  footer: {
    padding: "5px 10px",
    borderTop: "1px solid #ccc",
    alignSelf: "felx-end"
  },
  total: {
    padding: "10px 20px"
  }
}));

const CartItems = ({ movies, client }) => {
  const deleteItem = movie => {
    client.writeData({
      data: {
        dialogDelete: {
          __typename: "dialogDelete",
          open: true,
          movie: { ...movie, __typename: "Movie" }
        }
      }
    });
  };

  return movies.map(({ id, title, image, price }) => (
    <Fragment key={id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={title} src={image} />
        </ListItemAvatar>
        <ListItemText primary={title} secondary={`$ ${price}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => deleteItem({ id, title, image })}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  ));
};

const Carlist = ({ cartItems }) => {
  const classes = useStyles();

  const { loading, error, data, client } = useQuery(GET_MOVIES_BY_ID, {
    variables: { ids: cartItems }
  });

  const closeDrawer = () => client.writeData({ data: { cartIsOpen: false } });
  const clearCart = () =>
    client.writeData({ data: { cartIsOpen: false, cartItems: [] } });

  if (error) return <div>Error al cargar</div>;
  if (loading) return <div>Cargando...</div>;
  if (!data) return null;

  const { movies } = data;

  if (!movies.length) return <div>Carrito vacio</div>;

  const total = movies.map(movie => movie.price).reduce((a, b) => a + b);

  return (
    <div className={classes.cartContainer}>
      <List>
        <CartItems {...data} client={client} />
      </List>
      <div className={classes.footer}>
        <div className={classes.total}>Total: $ {total}</div>
        <div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonClean}
              endIcon={<DeleteSweep />}
              size="small"
              onClick={clearCart}
            >
              Limpiar carrito
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonClose}
              endIcon={<Cancel />}
              size="small"
              onClick={closeDrawer}
            >
              Cancelar
            </Button>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.shopButton}
            endIcon={<Shop />}
            fullWidth
            onClick={clearCart}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carlist;
