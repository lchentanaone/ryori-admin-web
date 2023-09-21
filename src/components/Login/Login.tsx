import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import ryori from "./../../../public/ryori-red.png";

const LoginForm: React.FC = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const jsonData = await response.json();
      const token = jsonData.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", jsonData.role);
      localStorage.setItem("user_Id", jsonData.user_Id);
      localStorage.setItem("store_Id", jsonData.store_Id);
      window.location.href = "/admin/selectBranch";
    } else {
      setError("Invalid access token");
      console.log({ error });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={3}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <Image src={ryori} alt="ryori" width={300} height={100} />
          </div>
          <Typography variant="subtitle1">
            Please sign in to Continue
          </Typography>
          <div>
            <div className={style.gap}>
              <TextField
                value={email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.gap}>
              <TextField
                value={password}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error_message">{error}</div>}
            <div className={style.gap}>
              {/* <Link href={"/admin/selectBranch"} prefetch={false}> */}
              <button className="button-primary" onClick={handleLogin}>
                Sign in
              </button>
              {/* </Link> */}
            </div>
            <div className={style.gap}>
              <Link href={"/admin/register"} prefetch={false}>
                <button className="button-primary">Create Account</button>
              </Link>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
