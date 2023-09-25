import React, { useState } from "react";
import { Typography, TextField, Grid, Paper, Box } from "@mui/material";
import qrcode from "./../../../../public/qr.png";
import Image from "next/image";
import styles from "../component/style/menu.module.css";
import Modal from "@mui/material/Modal";
import { decrypt, encrypt } from "@/utils/utils";

const QRGenerator = () => {
  const [table, setTable] = useState("");
  const [qrString, setQrString] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
  };
  const handleGenerateQrCode = async () => {
    const store_Id = localStorage.getItem("store_Id");
    const branch_Id = localStorage.getItem("branch_Id");
    const originalStr = `id=${store_Id}&branch=${branch_Id}&table=${table}`

    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encrypt/${originalStr}`)
    const encryptedStr = await request.text()
    const strToQr = `${process.env.NEXT_PUBLIC_RYORI_WEB_APP}?token=${encryptedStr}`
    console.log({originalStr, encryptedStr, strToQr})
    setQrString(strToQr)    
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    p: 4,
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: "80px", width: 600 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Typography variant="h5">Generate Table QR Code here</Typography>
          <Grid item xs={12} textAlign="center">
            {qrString && (
              <Image width={300} height={300} 
                alt="QR Code"
                src={`https://chart.apis.google.com/chart?cht=qr&chs=248&chl=${qrString}`}
              />
            )}
            {/* <Image src={qrcode} alt="ryori" width={300} height={300} /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Table No."
              variant="outlined"
              value={table}
              fullWidth
              required
              type="number"
              onChange={(e) => setTable(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleGenerateQrCode}
                className={styles.green}
                style={{ marginTop: 10 }}
              >
                Generate
              </button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default QRGenerator;
