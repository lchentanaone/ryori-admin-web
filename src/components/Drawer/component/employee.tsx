import React, { useEffect, useState } from "react";

import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../component/style/menu.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  phone: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};
export default function EmployeeTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswor, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [usersData, setUsersData] = useState<Employee[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const fetchEmpoyee = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      console.log({ token, branch_Id });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?branch_Id=${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log({ responseData });
      setUsersData(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmpoyee();
  }, []);

  return (
    <>
      <div style={{ marginTop: 10, paddingLeft: 50, paddingRight: 50 }}>
        <h1>Employee</h1>
        <div>
          <button
            onClick={handleOpen}
            className={`${styles.save_button} ${styles.add_employee}`}
          >
            Add Employee
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1> Add Employee</h1>
              <div
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 350,
                    gap: 10,
                  }}
                >
                  <TextField
                    value={firstName}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => setFirstname(e.target.value)}
                  />

                  <TextField
                    value={username}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                      Positions
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={role}
                      label="Category"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Manager</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    value={password}
                    id="outlined-basic"
                    label="password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 350,
                    gap: 10,
                  }}
                >
                  <TextField
                    value={lastName}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    value={phone}
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    value={email}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    value={confirmPasswor}
                    id="outlined-basic"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  marginTop: "10px",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <button
                  className={`${styles.save_button} ${styles.btn_save_color}`}
                  onClick={handleClose}
                >
                  Save
                </button>
                <button
                  className={`${styles.save_button} ${styles.btn_color_cancel}`}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        {/* --- */}
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 700, marginBottom: 2 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact No.</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {usersData.map((row, index) => (
              <TableBody key={index}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton aria-label="user">
                      <ManageAccountsIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
