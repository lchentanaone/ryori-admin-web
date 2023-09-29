import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import ryori from "./../../../public/ryori-red.png";
import Image from "next/image";
import style from "./style.module.css";

const RegisterForm: React.FC = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAdress] = useState("");

  const handleRegister = async () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !confirmPassword
    ) {
      setError("All fields are required.");
    } else if (!isValidEmail(email)) {
      setError("Invalid email format.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              username,
              email,
              password,
              phoneNumber,
            }),
          }
        );
        const data = await response.json();
        console.log({ data });
        if (response.ok) {
          const token = data.access_token;
          localStorage.setItem("token", token);
          window.location.href = "/admin/createStore";
        } else {
          setError("Invalid Registration");
        }
      } catch (error) {
        // Handle fetch error (e.g., network issues)
      }
    }
  };
  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} style={{ padding: "80px" }}>
          <div
            style={{
              justifyContent: "center",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            <Image src={ryori} alt="ryori" width={300} height={90} />
          </div>
          <Typography variant="subtitle1">
            Please sign up to Continue
          </Typography>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={firstName}
                required
                margin="normal"
                onChange={(e) => setFirstname(e.target.value)}
                style={{ marginRight: "20px" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                margin="normal"
                style={{ marginRight: "20px" }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                style={{ marginRight: "20px" }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                margin="normal"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                margin="normal"
                style={{ marginRight: "20px" }}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                required
                margin="normal"
              />
            </div>
            {/* <Link href={"/admin/createStore"}> */}
            {error && <div className="error_message">{error}</div>}
            <div
              style={{
                justifyContent: "center",

                display: "flex",
              }}
            >
              <button className={style.signup_btn} onClick={handleRegister}>
                Sign up
              </button>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
