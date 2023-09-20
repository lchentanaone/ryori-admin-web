import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import ryori from "./../../../../public/ryori.png";
import Image from "next/image";
import styles from "../component/style/menu.module.css";
import Link from "next/link";

const StoreInfo = () => {
  const storeName = "Mang Tomas Store";
  const branchName = "Branch Name";
  const email = "info@store.com info@store.com info@store.com info@store.com";
  const address = "123 Main Street, City";
  const phoneNumber = "123-456-7890";
  const appId = "123-ABC";
  const appSecret = "123-ABC";

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: "80px", width: 800 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{
            paddingLeft: 100,
            paddingRight: 100,
          }}
        >
          <Grid item xs={12} textAlign="center">
            <Image src={ryori} alt="ryori" width={160} height={150} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">{storeName}</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">{branchName}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ flexDirection: "row", display: "flex" }}
          >
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1" textAlign="left">
                Email
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" textAlign="left">
                {email}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ flexDirection: "row", display: "flex" }}
          >
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1" textAlign="left">
                Contact No.
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" textAlign="left">
                {phoneNumber}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ flexDirection: "row", display: "flex" }}
          >
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1" textAlign="left">
                Address
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" textAlign="left">
                {address}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1" textAlign="left">
                App Id
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" textAlign="left">
                {appId}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ flexDirection: "row", display: "flex" }}
          >
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1" textAlign="left">
                App Secret
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Typography variant="body1" textAlign="left">
                {appSecret}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link href={"/admin/updateStore"}>
              <button className={`${styles.save_button} ${styles.add_menu}`}>
                Edit this Store
              </button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StoreInfo;
