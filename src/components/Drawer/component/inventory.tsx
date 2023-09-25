import React, { useEffect, useState } from "react";

import { Typography, TextField, Grid, Paper, Box, Button } from "@mui/material";
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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Category {
  _id: string;
  title: string;
}
interface Category {
  _id: string;
  item: string;
  weight: string;
  quantity: string;
  branch_Id: string;
  readyQty: number;
  wasteQty: number;
  date: number;
  categories: string;
}

export default function Inventory() {
  const [item, setItem] = useState("");
  const [filter, setFilter] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemOnEdit, setItemOnEdit] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [inventory, setInventory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantityLogs, setQuantityLogs] = useState(0);
  const [errorTypeLog, setErrorTypeLog] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    p: 4,
  };

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/rawcategory/?branch_Id=${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setCategory(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/rawgrocery/?branch_Id=${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      setInventory(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async () => {
    if (!item || !quantity) {
      setError("Category, Product Name and Quantity are required");
    } else {
      setError("");
      try {
        const token = localStorage.getItem("token");
        const branch_Id = localStorage.getItem("branch_Id");
        const user_Id = localStorage.getItem("user_Id");

        if (itemOnEdit) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/inventory/rawgrocery/${itemOnEdit}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                item,
                weight,
                quantity,
                branch_Id,
                user_Id,
                rawCategory_Id: selectedCategory,
              }),
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            fetchItems();
            const responseData = await response.json();
            if (Array.isArray(responseData)) {
              fetchCategory();
              setCategory(responseData);
            }
          } else {
            console.error("Failed to add category");
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/inventory/rawgrocery`,
            {
              method: "POST",
              body: JSON.stringify({
                item,
                weight,
                quantity,
                branch_Id,
                user_Id,
                rawCategory_Id: selectedCategory,
              }),
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            fetchItems();

            const responseData = await response.json();
          } else {
            console.error("Failed to add item.");
          }
        }
        setItemOnEdit("");
        setItem("");
        setWeight("");
        setQuantity("");
        setSelectedCategory("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addQtyLogs = async () => {
    if (!type) {
      setErrorTypeLog("Type is required");
    } else {
      setErrorTypeLog("");
      try {
        const token = localStorage.getItem("token");
        const user_Id = localStorage.getItem("user_Id");
        const branch_Id = localStorage.getItem("branch_Id");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory/logs`,
          {
            method: "POST",
            body: JSON.stringify({
              type,
              quantityLogs,
              rawGrocery_Id: itemOnEdit,
              user_Id,
              branch_Id,
            }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          fetchItems();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setOpen(false);
      setType("");
      setQuantityLogs(0);
    }
  };

  const handleEdit = (row: any) => {
    setItemOnEdit(row._id);
    setItem(row.item);
    setWeight(row.weight);
    setQuantity(row.quantity);
  };

  const deleteItem = async (_id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/rawgrocery/${_id}`,
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
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (row: any) => {
    setOpen(true);
    setItemOnEdit(row);
    console.log({ row });
  };

  const handleType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleIncrease = () => {
    setQuantityLogs(quantityLogs + 1);
  };

  const handleDecrease = () => {
    setQuantityLogs(quantityLogs - 1);
  };

  useEffect(() => {
    fetchCategory();
    fetchItems();
  }, []);

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
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {category.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.title}
                </MenuItem>
              ))}
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
          <button onClick={addCategory} className={` ${styles.add_inventory}`}>
            Save
          </button>
        </div>
        {error !== "" && <div className="error_message">{error}</div>}
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
        <TableContainer component={Paper} style={{ marginBottom: 10 }}>
          <Table
            sx={{ minWidth: 650, maxHeight: 300 }}
            size="small"
            aria-label="a dense table"
          >
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
            {inventory.map((row, index) => (
              <TableBody key={index}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: 1,
                      borderColor: "gray",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.item}
                  </TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.readyQty}</TableCell>
                  <TableCell>{row.wasteQty}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpen(row._id)}
                      aria-label="arrow"
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton
                      aria-label="pencil"
                      onClick={() => handleEdit(row)}
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(row._id)}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Inventory logs</h1>
              <FormControl style={{ width: 200 }}>
                <InputLabel style={{ marginTop: -5 }}>Type</InputLabel>
                <Select
                  labelId="inventory-logs"
                  id="logs"
                  value={type}
                  label="Type"
                  onChange={handleType}
                >
                  <MenuItem value={"ready"}>Ready</MenuItem>
                  <MenuItem value={"waste"}>Waste</MenuItem>
                </Select>
              </FormControl>
              <Grid
                container
                direction="row"
                style={{ justifyContent: "center", gap: 10 }}
              >
                <IconButton
                  className={` ${styles.btn_logs}`}
                  onClick={handleDecrease}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  type="number"
                  variant="outlined"
                  value={quantityLogs}
                  style={{ width: 100 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton
                  className={` ${styles.btn_logs}`}
                  onClick={handleIncrease}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              {errorTypeLog !== "" && (
                <Typography variant="subtitle2" style={{ color: "#ff0000" }}>
                  {errorTypeLog}
                </Typography>
              )}
              <button
                className={` ${styles.add_inventory}`}
                onClick={addQtyLogs}
              >
                save
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
