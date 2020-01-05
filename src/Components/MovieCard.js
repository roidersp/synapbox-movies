import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Fab
} from "@material-ui/core";

import { ADD_TO_CART, IS_IN_CART } from "../Actions/queries";
import { AddShoppingCart, Visibility } from "@material-ui/icons";

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
    height: 160,
    width: "100%",
    flex: "0"
  },
  addButton: {
    fontSize: 18
  },
  seeButton: {
    marginRight: 10
  },
  title: {
    marginTop: 10
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15
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

const MovieCard = ({ id, title, image, price }) => {
  const classes = useStyles();

  // const {data, loading: queryLoading , error: queryError, ...lets} = useQuery(
  //   IS_IN_CART,
  //   { variables: { id: id } }
  // )

  const [mutate, { loading, error, client, called, ...rest }] = useMutation(
    ADD_TO_CART,
    {
      variables: { id: id }
      // refetchQueries: [
      //   {
      //     query: IS_IN_CART,
      //     variables: { id: id },
      //   }
      // ]
    }
  );

  const setMovie = () => {
    client.writeData({ data: { movieId: id } });
  };

  if (loading) console.log("loading mutation");

  if (error) console.log("error", error);

  if (called) {
    console.log("called");
  }

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card className={classes.card}>
        <div style={{ width: "100%" }}>
          <CardMedia className={classes.media} image={image} title={title} />
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ${price}
            </Typography>
          </CardContent>
        </div>
        <CardActions className={classes.cardActions}>
          <Fab variant="extended" size="medium" onClick={setMovie}>
            <Visibility className={classes.seeButton} />
            Ver detalle
          </Fab>
          <CustomIcon variant="extended" size="medium" onClick={mutate}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Ocurrio un error</p>
            ) : (
              <AddShoppingCart className={classes.addButton} />
            )}
          </CustomIcon>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
