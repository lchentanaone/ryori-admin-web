import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

const CreateStore: React.FC = () => {
  const [photo, setPhoto] = useState(null);
  // const [storeName, setStoreName] = useState("");
  // const [branchName, setBranchName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  const [formData, setFormData] = useState({
    storeName: "",
    branchName: "",
    email: "",
    address: "",
    contactNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 20 }}>
              Set up your Store
            </Typography>
            {photo && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Selected"
                  width="150"
                  height="160"
                  style={{ borderRadius: 10 }}
                />
              </div>
            )}
            <label htmlFor="fileInput">Store Logo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Store Name"
              variant="outlined"
              fullWidth
              value={formData.storeName}
              onChange={handleChange}
              required
              margin="normal"
              style={{ marginRight: "10px" }}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="Branch Name"
                variant="outlined"
                fullWidth
                value={formData.branchName}
                onChange={handleChange}
                required
                margin="normal"
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                margin="normal"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                required
                margin="normal"
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                required
                margin="normal"
              />
            </div>

            <Link href={"/admin/dashboard"}>
              <button className="button-primary">Save</button>
            </Link>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateStore;
