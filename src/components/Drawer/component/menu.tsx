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
import Swal from "sweetalert2";

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
  title?: string;
  price?: string;
  description?: string;
  photo?: any;
  quantity?: string;
  cookingTime?: string;
  menuCategories?: string[];
}
interface iCategory {
  title: string;
  _id: string;
}
interface iCategoryDOM {
  label: string;
  value: string;
}

export default function MenuCard() {
  const [errors, setErrors] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [items, setItems] = useState<MenuData[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuData>({
    _id: "-1",
  });

  const [categories, setCategories] = useState<iCategoryDOM[]>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedMenu({ _id: "-1" });
    setErrors("");
  };
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
      const _categories = await response.json();
      const dropdownCategories = _categories.map((item: iCategory) => ({
        label: item.title,
        value: item._id,
      }));

      setCategories(dropdownCategories);
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

  // TODO: Rename this handleUpdate to a selectItem because no update is done here yet, just selecting which item to update.
  const handleUpdate = (item: MenuData) => {
    setSelectedMenu(item);
    setOpen(true);
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    const tmpSelectedMenu = { ...selectedMenu };
    tmpSelectedMenu.menuCategories = [event.target.value];
    setSelectedMenu(tmpSelectedMenu);
  };

  const handleChangeText = (key: string | number, value: any) => {
    const tempData = {
      ...selectedMenu,
      [key]: value,
    };
    setSelectedMenu(tempData);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    handleChangeText("photo", selectedFile);
  };

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const deleteConfirm = async (_id: string) => {
    const swalResponse = await Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (swalResponse.isConfirmed) {
      deleteItem(_id);
    }
  };
  const deleteItem = async (_id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menuItem/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      } else {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
      fetchMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMenu = async () => {
    return new Promise(async (resolve, reject) => {
      if (!selectedMenu?.title) {
        setErrors("Title is required.");
      } else if (!selectedMenu?.description) {
        setErrors("Description is required.");
      } else if (!selectedMenu?.quantity) {
        setErrors("quantity is required.");
      } else if (!selectedMenu?.cookingTime) {
        setErrors("cookingTime is required.");
      } else if (!selectedMenu?.price) {
        setErrors("Price is required.");
      } else if (!selectedMenu?.menuCategories) {
        setErrors("Category is required.");
      } else if (!selectedMenu?.photo) {
        setErrors("Photo is required.");
      } else {
        setErrors("");

        try {
          const token = localStorage.getItem("token");
          const store_Id = localStorage.getItem("store_Id") || "";
          const branch_Id = localStorage.getItem("branch_Id") || "";

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const formData = new FormData();
          formData.append("title", selectedMenu.title);
          formData.append("price", selectedMenu.price);
          formData.append("description", selectedMenu.description);
          formData.append("qty", selectedMenu.quantity);
          formData.append("cookingTime", selectedMenu.cookingTime);
          formData.append("menuCategory_Id", selectedMenu.menuCategories[0]);
          formData.append("branch_Id", branch_Id);
          formData.append("store_Id", store_Id);
          if (typeof selectedMenu.photo !== "string") {
            formData.append("photo", selectedMenu.photo || "");
          }

          if (selectedMenu._id !== "-1") {
            //Edit selected
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/menuItem/${selectedMenu._id}`,
              {
                method: "PATCH",
                headers: headers,
                body: formData,
              }
            );
            const responseData = await response.json();
            resolve(responseData._id);
          } else {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/menuItem`,
              {
                method: "POST",
                headers: headers,
                body: formData,
              }
            );
            const responseData = await response.json();
            resolve(responseData._id);
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }
    });
  };

  const handleSave = async () => {
    const menuItemId = await handleAddMenu();
    fetchMenu();
    handleClose();
    setErrors("");
    setTitle("");
    setDescription("");
    setPhoto(null);
    setPrice("");
    setQty(0);
    setCookingTime("");
  };

  useEffect(() => {
    fetchCategory();
    fetchMenu();
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      window.location.href = "/admin/login";
    }
  }, []);

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
            <h1>{selectedMenu._id === "-1" ? `Add` : "Edit"} Menu</h1>
            <br />
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
                  value={selectedMenu?.title}
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  variant="outlined"
                  onChange={(e) => handleChangeText("title", e.target.value)}
                />
                <TextField
                  value={selectedMenu?.description}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  name="description"
                  onChange={(e) =>
                    handleChangeText("description", e.target.value)
                  }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={
                      selectedMenu?.menuCategories &&
                      selectedMenu.menuCategories[0]
                    }
                    label="Category"
                    onChange={handleDropdownChange}
                  >
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category: iCategoryDOM, key: number) => (
                        <MenuItem value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors !== "" && <p style={{ color: "#ff0000" }}>{errors}</p>}
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
                    onClick={() => handleSave()}
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
                  value={selectedMenu?.price || ""}
                  id="outlined-basic"
                  label="Price"
                  type="number"
                  variant="outlined"
                  name="price"
                  onChange={(e) => handleChangeText("price", e.target.value)}
                />

                <TextField
                  value={selectedMenu?.quantity || ""}
                  id="outlined-basic"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  name="quantity"
                  onChange={(e) => handleChangeText("quantity", e.target.value)}
                />
                <TextField
                  value={selectedMenu?.cookingTime || ""}
                  id="outlined-basic"
                  label="Cooking Time"
                  variant="outlined"
                  name="cookingTime"
                  onChange={(e) =>
                    handleChangeText("cookingTime", e.target.value)
                  }
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
                {selectedMenu.photo && (
                  <div>
                    <img
                      src={
                        typeof selectedMenu.photo === "string"
                          ? selectedMenu.photo
                          : URL.createObjectURL(selectedMenu.photo)
                      }
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
      {/* --table-- */}
      <Box sx={{ gap: 4, display: "flex", flexWrap: "wrap" }}>
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
              <Image
                src={item.photo}
                width={200}
                height={100}
                alt="img"
                className={styles.menuImage}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <p className={styles.price}> ₱ {item.price}</p>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <button
                  className={`${styles.menu_btn} ${styles.btn_save_color}`}
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className={`${styles.menu_btn} ${styles.add_menu}`}
                  onClick={() => deleteConfirm(item._id)}
                >
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
