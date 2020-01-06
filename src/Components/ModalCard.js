import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AddShoppingCart, AttachMoney } from "@material-ui/icons";
import {
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Fab
} from "@material-ui/core";

import { GET_MOVIE, ADD_TO_CART } from "../Actions/queries.js";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  media: {
    height: "100%",
    flex: "1 60%"
  },
  addButton: {
    fontSize: 18,
    marginRight: 10
  },
  title: {
    marginTop: 10
  },
  content: {
    margin: "auto",
    flex: "1 40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center"
  },
  price: {
    display: "flex",
    alignItems: "center"
  }
});

const CustomIcon = withStyles(theme => ({
  root: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.dark,
    padding: 8,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#c3c3c3"
    }
  }
}))(Fab);

const ModalCard = ({ id }) => {
  const classes = useStyles();

  const { loading, error, data, client } = useQuery(GET_MOVIE, {
    variables: { id }
  });

  const [
    mutate,
    { loading: mutateLoading, error: mutateError, called, ...rest }
  ] = useMutation(ADD_TO_CART, { variables: { id: id } });

  if (loading) return <CardContent>Loading...</CardContent>;
  if (error) return <CardContent>Error! ${error.message}</CardContent>;

  const { title, description, largeImage: image, price } = data.movie;

  return (
    <>
      <CardMedia className={classes.media} image={image} title={title} />
      <div className={classes.content}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Typography className={classes.price}>
            <AttachMoney /> {price}
          </Typography>
          <CustomIcon variant="extended" size="medium" onClick={mutate}>
            <AddShoppingCart className={classes.addButton} />
            Añadir al carrito
          </CustomIcon>
        </CardActions>
      </div>
    </>
  );
};

export default ModalCard;
