import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Grid, Paper, Typography } from "@mui/material";
import style from "./style.module.css";

const SelectBranch: React.FC = () => {
  const [storeData, setStoreData] = useState(null);
  const [branchData, setBranchData] = useState([]);

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/${store_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStoreData(data);
      console.log({ data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchBranchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/?store_Id=${store_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const branch = await response.json();
      setBranchData(branch);
      console.log({ branch });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const init = async () => {
    await fetchStoreData();
    fetchBranchData();
  };
  useEffect(() => {
    init();
  }, []);

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
