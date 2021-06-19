import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  confirmAction,
  declineAction,
  isOpened = false,
  id,
}) {
  return (
    <div>
      <Dialog
        open={isOpened}
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
            <Button onClick={declineAction} color="primary">
              Manter Produto
            </Button>
          </span>
          <Button onClick={() => confirmAction(id)} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
