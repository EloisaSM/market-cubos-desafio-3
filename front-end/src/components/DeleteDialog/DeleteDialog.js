import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { ColorButton } from "./style";

import { ReactComponent as Delete } from "../../assets/delete.svg";

import useAuth from "../../hook/useAuth";

export default function AlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletarProduto = async () => {
    try {
      const resposta = await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await resposta.json();

      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        <Delete />
      </ColorButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remover produto do catálogo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <span>
            <Button onClick={handleClose} color="primary">
              Manter Produto
            </Button>
          </span>
          <Button onClick={deletarProduto} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
