import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import ryori from "./../../../public/ryori-red.png";
import Image from "next/image";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <div style={{ justifyContent: "center", marginBottom: 20 }}>
            <Image src={ryori} alt="ryori" width={300} height={90} />
          </div>
          <Typography variant="subtitle1">
            Please sign up to Continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                margin="normal"
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                margin="normal"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                margin="normal"
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                margin="normal"
              />
            </div>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Link href={""}>
              <button className="button-primary">Sign up</button>
            </Link>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
