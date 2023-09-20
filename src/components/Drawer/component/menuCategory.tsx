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

const MenuCategories = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  return (
    <Paper elevation={3} style={{ padding: "20px", height: "90vh" }}>
      <Typography variant="h6">Menu Categories</Typography>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          paddingLeft: 40,
          paddingRight: 40,
          height: 200,
        }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
          }}
        >
          <TextField
            label="Category Name"
            variant="outlined"
            margin="normal"
            value={title}
            style={{ width: 350 }}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className={`${styles.uploadImg_menu} ${styles.top}`}
            onClick={handleUpload}
          >
            Upload Image
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <button className={`${styles.save_button} ${styles.add_employee}`}>
            Save
          </button>
        </div>
        <div className={styles.image}>
          <div>
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Selected"
                  width="190"
                  height="150"
                  style={{ borderRadius: 10 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxHeight: "580px", overflowY: "auto" }}>
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

export default MenuCategories;
