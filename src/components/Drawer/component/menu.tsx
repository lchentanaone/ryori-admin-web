import React, { useState, useRef, useEffect } from "react";
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
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

interface MenuData {
  _id: string;
  title: string;
  price: string;
  description: string;
  photo: any;
}

export default function MenuCard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [items, setItems] = useState<MenuData[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuData>();

  const [categories, setCategories] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [photo, setPhoto] = useState(null);

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menuCategory/?store_Id=${store_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const dropdownCategories = response.data.map((item) => ({
      //   label: item.title,
      //   value: item._id,
      // }));
      // setCategories(dropdownCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMenu = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const branch_Id = localStorage.getItem("branch_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menuItem?store_Id=${store_Id}&branch_Id=${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log({ responseData });
      setItems(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (item: MenuData) => {
    setSelectedMenu(item);
    setOpen(true);
  };
  useEffect(() => {
    fetchCategory();
    fetchMenu();
  }, []);

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
              {selectedMenu ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <TextField
                    value={selectedMenu.title}
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
              ) : (
                <div>Loading user data...</div>
              )}
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
        {items.length > 0 ? (
          items.map((item, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 250,
                maxHeight: 400,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Image src={item.photo} width={200} height={100} alt="img" className={styles.menuImage} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <p className={styles.price}> ₱ {item.price}</p>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <button
                  className={`${styles.updateBtn} ${styles.btn_save_color}`}
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button className={`${styles.updateBtn} ${styles.add_menu}`}>
                  Delete
                </button>
              </CardActions>
            </Card>
          ))
        ) : (
          <div>Loading</div>
        )}
      </Box>
    </div>
  );
}
