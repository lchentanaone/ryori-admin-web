import React, { useState } from "react";
import Link from "next/link";
import { Grid, Paper, Typography } from "@mui/material";
import style from "./style.module.css";

const SelectBranch: React.FC = () => {
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
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h5">Mang Tomas Store</Typography>

          <Typography variant="subtitle2">Select Branch</Typography>

          <Link href={"/admin/dashboard"}>
            <button className={style.branch_btn}>Mintal</button>
          </Link>
          <Link href={"/admin/createStore"}>
            <button className={style.addbranch_btn}>Add new Branch</button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SelectBranch;
