import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Card } from "@material-ui/core";

import ModalCard from "./ModalCard";
import { GET_MOVIE_ID } from "../Actions/queries";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  card: {
    maxWidth: 1000,
    width: "96%",
    display: "flex",
    maxHeight: 400,
    height: "80vh",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      maxHeight: "inherit"
    }
  }
}));

const MoviesModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { loading, error, data, client } = useQuery(GET_MOVIE_ID);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    client.writeData({ data: { movieId: null } });
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      data.movieId ? handleOpen() : handleClose();
    }
  }, [data]);

  if (loading) return null;
  if (error) return null;

  const { movieId } = data;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
    >
      <Card className={classes.card}>
        <ModalCard id={movieId} />
      </Card>
    </Modal>
  );
};

export default MoviesModal;
