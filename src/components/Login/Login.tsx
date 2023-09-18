import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import ryori from "./../../../public/ryori-red.png";
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
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
          <div style={{ justifyContent: "center" }}>
            <Image src={ryori} alt="ryori" width={300} height={100} />
          </div>
          <Typography variant="subtitle1">
            Please sign in to Continue
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <div className={style.gap}>
              <Link href={""}>
                <button className="button-primary">Sign in</button>
              </Link>
            </div>
            <div className={style.gap}>
              <Link href={"/admin/register"} prefetch={false}>
                <button className="button-primary">Create Account</button>
              </Link>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
