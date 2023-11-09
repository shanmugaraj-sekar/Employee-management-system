import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateForm from "./CreateForm";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Header() {
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };
  const handleCreateClose = () => {
    setCreateOpen(false);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  return (
    <div className="table-header">
      <div className="table-title">
        <ul>
          <li>Employee Data Management System</li>
        </ul>
      </div>

      <div className="create-btn-sec">
        <div>
          <AddBoxIcon onClick={handleCreateOpen} />
          <BootstrapDialog
            onClose={handleCreateClose}
            aria-labelledby="customized-dialog-title"
            open={createOpen}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Create new data
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCreateClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <CreateForm handleEditClose={handleCreateClose} />
            </DialogContent>
          </BootstrapDialog>
          <h5>Create</h5>
        </div>
      </div>
    </div>
  );
}
