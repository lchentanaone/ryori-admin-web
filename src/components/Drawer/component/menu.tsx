import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import chicken from "./../../../../public/chicken.png";
import Image from "next/image";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../component/style/menu.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

export default function MenuCard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const [categories, setCategories] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [photo, setPhoto] = useState(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value);
  };

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
    <div style={{ marginTop: 10, paddingLeft: 50, paddingRight: 50 }}>
      <h1>Menu</h1>
      <div>
        <button
          onClick={handleOpen}
          className={`${styles.save_button} ${styles.add_menu}`}
        >
          Add Menu
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1>Add Menu</h1>
            <div
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <TextField
                  value={title}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  value={description}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categories}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Chicken</MenuItem>
                  </Select>
                </FormControl>
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 10,
                  gap: 10,
                }}
              >
                <TextField
                  value={price}
                  id="outlined-basic"
                  label="Price"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                />

                <TextField
                  value={qty}
                  id="outlined-basic"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setQty}
                />
                <TextField
                  value={cookingTime}
                  id="outlined-basic"
                  label="Cooking Time"
                  variant="outlined"
                  onChange={(e) => setCookingTime(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  marginLeft: 20,
                }}
              >
                {photo && (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Selected"
                      width="150"
                      height="150"
                      style={{ borderRadius: 10 }}
                    />
                  </div>
                )}
                <button
                  className={styles.uploadImg_menu}
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
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* --- */}
      <Box sx={{ gap: 4, display: "flex" }}>
        <Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 2 }}>
          <Image src={chicken} width={200} height={100} alt="img" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Lizard
            </Typography>
            <p className={styles.price}>₱ {"9999"}</p>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <button
              className={`${styles.updateBtn} ${styles.btn_save_color}`}
              onClick={handleOpen}
            >
              Update
            </button>
            <button className={`${styles.updateBtn} ${styles.add_menu}`}>
              Delete
            </button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 2 }}>
          <Image src={chicken} width={200} height={100} alt="img" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Lizard
            </Typography>
            <p className={styles.price}>₱ {"9999"}</p>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <button
              className={`${styles.updateBtn} ${styles.btn_save_color}`}
              onClick={handleOpen}
            >
              Update
            </button>
            <button className={`${styles.updateBtn} ${styles.add_menu}`}>
              Delete
            </button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
