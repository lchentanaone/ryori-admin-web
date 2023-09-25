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
  _id: string;
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

  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeExist, setEmployeeExist] = useState(false);
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [usersData, setUsersData] = useState<Employee[]>([]);

  const [error, setError] = useState("");

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

  // TODO: Refactor so that register and update will be on 1 function which is save.
  const updateEmployee = async () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !phone
    ) {
      setError("All fields are required.");
    } else {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const branch_Id = localStorage.getItem("branch_Id");
        const store_Id = localStorage.getItem("store_Id");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userOnEdit}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              username,
              role,
              phone,
              branch_Id,
              store_Id,
            }),
          }
        );

        if (response.ok) {
          fetchEmpoyee();
          console.log("Update Success");
        } else {
          setError("Invalid Registration");
        }

        setUsername("");
        setFirstname("");
        setLastName("");
        setPhone("");
        setRole("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleRegister = async () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !confirmPassword
    ) {
      setError("All fields are required.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");

      try {
        const token = localStorage.getItem("token");
        const branch_Id = localStorage.getItem("branch_Id");
        const store_Id = localStorage.getItem("store_Id");
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/user/${userOnEdit}`);

        if (userOnEdit) {
          console.log(`${process.env.NEXT_PUBLIC_API_URL}/user/${userOnEdit}`);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${userOnEdit}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                role,
                password,
                phone,
                branch_Id,
                store_Id,
              }),
            }
          );
          console.log(
            firstName,
            lastName,
            username,
            email,
            role,
            password,
            phone,
            branch_Id,
            store_Id
          );

          console.log({ response });
          if (response.ok) {
            fetchEmpoyee();
            console.log("Update Success");
          } else {
            setError("Invalid Registration");
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                role,
                password,
                phone,
                branch_Id,
                store_Id,
              }),
            }
          );
          if (response.ok) {
            fetchEmpoyee();
            console.log("Success");
          } else {
            setError("Invalid Registration");
          }
        }

        setUsername("");
        setFirstname("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setRole("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // TODO: rename addEmployee to like saveEmployee since this will handle editing and adding.
  const addEmployee = () => {
    // handleClose();
    // handleRegister();

    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !role ||
      !password ||
      !phone
    ) {
      setError("All fields are required.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      handleRegister();
      handleClose();
    }
  };

  // TODO: Refactor so that addEmployee and EditEmployee are on the same function.
  const editEmployee = () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !role ||
      !phone
    ) {
      setError("All fields are required.");
    } else {
      setError("");
      updateEmployee();
      handleClose();
    }
  };

  // TODO: Change this to selectEmployee because no edit is present here, this is just a function that selects the employee to be edited.
  const handleEdit = (user: any) => {
    setOpen(true);
    if (user) {
      setEmployeeExist(true);
    } else setEmployeeExist(false);
    setUserOnEdit(user._id);
    setUsername(user.username);
    setEmail(user.email);
    setFirstname(user.firstName);
    setLastName(user.lastName);
    setPassword(user.password);
    setRole(user.role);
    setPhone(user.phone);
    console.log(user._id);
  };

  const handleOpen = () => {
    setOpen(true);
    setEmployeeExist(false);
  };

  const handleClose = () => {
    setOpen(false);
    setUserOnEdit(null);
    setUsername("");
    setFirstname("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
    setPhone("");
  };

  const deleteUser = async (_id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      fetchEmpoyee();
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
              {employeeExist ? (
                <h1>Update Employee Details</h1>
              ) : (
                <h1>Add Employee</h1>
              )}
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
                      <MenuItem value={"manager"}>Manager</MenuItem>
                      <MenuItem value={"dining"}>Dining</MenuItem>
                      <MenuItem value={"kitchen"}>Kitchen</MenuItem>
                    </Select>
                  </FormControl>
                  {employeeExist ? null : (
                    <TextField
                      value={password}
                      id="outlined-basic"
                      label="password"
                      type="password"
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                  {!employeeExist ? null : (
                    <p>
                      Please Contact us for Email and {"\n"} Password Recovery
                    </p>
                  )}
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
                    value={email}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    disabled={employeeExist}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    value={phone}
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {employeeExist ? null : (
                    <TextField
                      value={confirmPassword}
                      id="outlined-basic"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  )}
                  {error && <div className="error_message">{error}</div>}
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
                  onClick={userOnEdit ? editEmployee : addEmployee}
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
            {usersData.map((user, index) => (
              <TableBody key={index}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      borderBottom: 1,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(user)}
                      aria-label="user"
                    >
                      <ManageAccountsIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteUser(user._id)}
                      aria-label="delete"
                    >
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
