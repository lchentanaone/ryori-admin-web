import React, { useState, useRef } from "react";
import {
  TextField,
  Typography,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../component/style/menu.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const RawCategories = () => {
  const [title, setTitle] = useState("");

  return (
    <Paper elevation={3} style={{ padding: "20px", height: "90vh" }}>
      <Typography variant="h6">Inventory Categories</Typography>
      <TextField
        label="Category Name"
        variant="outlined"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: 350 }}
      />
      <Grid item xs={12} md={6}>
        <button
          className={`${styles.save_button} ${styles.add_employee}`}
          style={{ width: 350 }}
        >
          Save
        </button>
      </Grid>
      <div style={{ maxHeight: "580px", overflowY: "auto", marginTop: 80 }}>
        <TableContainer style={{ flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Data 1</TableCell>
                <TableCell>
                  <IconButton aria-label="pencil">
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default RawCategories;
