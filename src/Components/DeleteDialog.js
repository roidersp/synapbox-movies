import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/";

import { CONFIRM_DELETE, DELETE_FROM_CART } from "../Actions/queries";

const DeleteButton = ({ id, handleClose }) => {
  const [
    deleteFromCart,
    { loading, error, called }
  ] = useMutation(DELETE_FROM_CART, { variables: { id: id } });

  if (called) handleClose();

  return (
    <Button
      variant="contained"
      onClick={deleteFromCart}
      color="secondary"
      autoFocus
    >
      Borrar
    </Button>
  );
};

const DeleteDialog = () => {
  const { loading, error, data, client } = useQuery(CONFIRM_DELETE);

  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  const { open, movie } = data.dialogDelete;
  if (!movie) return null;

  const { id, title, image } = movie;

  const handleClose = () => {
    client.writeData({
      data: {
        dialogDelete: {
          __typename: "dialogDelete",
          open: false,
          movie: null
        }
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Seguro que Quieres borrar este item de tu carrito de compras?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Titulo: {title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <DeleteButton id={id} handleClose={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
