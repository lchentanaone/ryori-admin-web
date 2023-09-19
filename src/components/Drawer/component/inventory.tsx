import React, { useState } from "react";

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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function createData(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  role: string,
  phone: string
) {
  return { firstName, lastName, email, username, role, phone };
}

const rows = [
  createData("San", "Guko", "SanGuko", "SanGuko@gmail.com", "123", "Manager"),
  createData("San", "Guko", "SanGuko", "SanGuko@gmail.com", "123", "Manager"),
];
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
export default function Inventory() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [item, setItem] = useState("");
  const [filter, setFilter] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setFilter(event.target.value);
  };
  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div style={{ marginTop: 10, paddingLeft: 50, paddingRight: 50 }}>
        <h1>Inventory</h1>
        <div style={{ marginBottom: 15 }}>
          <FormControl style={{ width: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={10}>Chicken</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={item}
            id="outlined-basic"
            label="Item"
            variant="outlined"
            onChange={(e) => setItem(e.target.value)}
            style={{ marginLeft: 10, width: 350 }}
          />
          <TextField
            value={weight}
            id="outlined-basic"
            label="Net. Wet"
            variant="outlined"
            onChange={(e) => setWeight(e.target.value)}
            style={{ marginLeft: 10 }}
          />
          <TextField
            value={quantity}
            id="outlined-basic"
            label="Quantity"
            type="number"
            variant="outlined"
            onChange={(e) => setQuantity(e.target.value)}
            style={{ marginLeft: 10 }}
          />
          <button className={` ${styles.add_inventory}`}>Save</button>
        </div>
        {/* --- */}
        <div style={{ marginBottom: 10 }}>
          <FormControl style={{ width: 200 }}>
            <InputLabel style={{ marginTop: -5 }}>Filter by</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filter}
              size="small"
              label="Category"
              onChange={handleFilter}
            >
              <MenuItem value={10}>All</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Ready</TableCell>
                <TableCell>Waste</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.firstName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.lastName}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton aria-label="arrow">
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton aria-label="pencil">
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
