import React from "react";
import { Typography, Grid } from "@mui/material";

import RawCategories from "./rawCategory";
import MenuCategories from "./menuCategory";

const Categories = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      //   height="80vh"
      style={{ padding: 80 }}
    >
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        <Typography variant="h5">Add Categories</Typography>
      </Grid>
      <Grid container spacing={10} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <MenuCategories />
        </Grid>
        <Grid item xs={12} md={6}>
          <RawCategories />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Categories;
