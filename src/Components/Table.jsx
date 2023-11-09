import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditForm from "./EditForm";
import "../style/componentHolder.css";

export default function EmployeeTables() {
  const [getData, setGetData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    name: "",
    code: "",
    gender: "",
  });
  const [openDelete, setDeleteOpen] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getApiData = () => {
    fetch("http://localhost:3005/employees")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  };

  const handelDelete = () => {
    if (selectedEmployee) {
      const deleteApi =
        "http://localhost:3005/employees/" + selectedEmployee.id;
      fetch(deleteApi, { method: "DELETE" }).then((res) => {
        if (!res.ok) {
          alert("Something went wrong");
        } else {
          window.location.reload();
        }
      });
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleOpenDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setSelectedEmployee(null);
    setDeleteOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper} className="emp-table">
        <Table aria-label="employee table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">So No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Employee Code</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData.map((employee, index) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {employee.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.code}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.gender}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteTwoToneIcon
                    onClick={() => {
                      handleOpenDelete(employee);
                    }}
                  />

                  <EditIcon
                    onClick={() => {
                      setSelectedEmployee(employee);
                      handleClickOpen();
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* edit-form-dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Employee Information"}
        </DialogTitle>
        <DialogContent>
          <EditForm employeeId={selectedEmployee} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      {/* delete-form-dialog */}

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the employee "
            {selectedEmployee?.name}" permanently from the database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseDelete();
              handelDelete();
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
