import React, { useState } from "react";
import { Typography, TextField, Grid, Paper, Box } from "@mui/material";
import ryori from "./../../../../public/ryori.png";
import Image from "next/image";
import styles from "../component/style/menu.module.css";
import Modal from "@mui/material/Modal";

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phon, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          <form>
            <Grid item xs={12} textAlign="center">
              <Image src={ryori} alt="ryori" width={160} height={150} />
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  fullWidth
                  required
                  disabled={!isEditing}
                  onChange={(e) => setFirtName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  fullWidth
                  required
                  disabled={!isEditing}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  fullWidth
                  required
                  disabled={!isEditing}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  type="email"
                  required
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contact No."
                  variant="outlined"
                  value={phon}
                  fullWidth
                  required
                  disabled={!isEditing}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={address}
                  rows={2}
                  required
                  disabled={!isEditing}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
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
                  onClick={isEditing ? handleUpdateClick : handleEditClick}
                  className={
                    isEditing ? `${styles.green}` : `${styles.save_info}`
                  }
                  style={{ marginTop: 10 }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </Grid>
          </form>
          {!isEditing && (
            <button
              onClick={handleOpen}
              className={`${styles.save_info}`}
              style={{ marginTop: 10 }}
            >
              Change Password
            </button>
          )}
        </Grid>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1>Change Password</h1>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleClose}
              className={`${styles.save_info}`}
              style={{ marginTop: 10 }}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </Grid>
  );
};

export default UserInfo;
