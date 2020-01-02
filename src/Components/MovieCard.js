import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid
} from "@material-ui/core";

import { AddShoppingCart } from "@material-ui/icons";

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
    height: 160
  },
  addButton: {
    fontSize: 18
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
}))(IconButton);

const MovieCard = ({ id, title, description, image, price }) => {
  const classes = useStyles();

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <CustomIcon variant="contained" size="medium">
            <AddShoppingCart className={classes.addButton} />
          </CustomIcon>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
