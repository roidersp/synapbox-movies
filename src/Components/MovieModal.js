import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Card } from "@material-ui/core";

import ModalCard from "./ModalCard";

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
    height: "80vh"
  }
}));

const MoviesModal = ({ movieId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    movieId ? handleOpen() : handleClose();
  }, [movieId]);

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
