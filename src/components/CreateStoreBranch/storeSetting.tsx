import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import styles from "./../Drawer/component/style/menu.module.css";

interface Data {
  _id: string;
  storeName: string;
  branchName: string;
  username: string;
  email: string;
  address: string;
  contactNumber: string;
  appId: string;
  appSecret: string;
  photo: string;
}

const StoreInfo: React.FC = () => {
  const [storeData, setStoreData] = useState<Data>({
    _id: "",
    storeName: "",
    branchName: "",
    username: "",
    email: "",
    address: "",
    contactNumber: "",
    appId: "",
    appSecret: "",
    photo: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [formData, setFormData] = useState({
    storeName: "",
    branchName: "",
    email: "",
    address: "",
    contactNumber: "",
    appId: "",
    appSecret: "",
  });

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      const store_Id = localStorage.getItem("store_Id");
      console.log({ token, branch_Id });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/${store_Id}/${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setStoreData({
          storeName: responseData.storeName,
          photo: responseData.photo,
          appId: responseData.appId,
          appSecret: responseData.appSecret,
          branchName: responseData.branches[0].branchName,
          email: responseData.branches[0].email,
          contactNumber: responseData.branches[0].contactNumber,
          address: responseData.branches[0].address,
        });
        setPhoto(responseData.photo);
        // setStoreName(responseData.storeName);
        // setAppId(responseData.appId);
        // setAppSecret(responseData.appSecret);
        // setBranchName(responseData.branches[0].branchName);
        // setEmail(responseData.branches[0].email);
        // setContactNumber(responseData.branches[0].contactNumber);
        // setAddress(responseData.branches[0].address);
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setStoreData({ ...storeData, [name]: value });
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    const newStoreName = event.target.value;
    setStoreData({ ...storeData, email: newEmail, storeName: newStoreName });
  };

  const handleChangeText = (key: string | number, value: any) => {
    const tempUserData = { ...storeData };
    // tempUserData[key = value;
    setStoreData(tempUserData);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          width: 800,
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        {storeData ? (
          <>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" style={{ marginBottom: 20 }}>
                  {isEditing ? "Update Store" : "Store Details"}
                </Typography>
                <div>
                  {photo && (
                    <div style={{ marginTop: 10 }}>
                      <img
                        src={
                          typeof photo === "string"
                            ? photo
                            : URL.createObjectURL(photo)
                        }
                        alt="Selected"
                        width="170"
                        height="150"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {isEditing && (
                    <button
                      className={styles.uploadImg_menu}
                      onClick={handleUpload}
                    >
                      Upload Image
                    </button>
                  )}
                </div>
              </div>
              <div>
                <Grid container spacing={2} style={{ marginTop: 20 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Store Name"
                      variant="outlined"
                      value={storeData.storeName}
                      fullWidth
                      required
                      disabled={!isEditing}
                      onChange={(value) => {
                        handleChangeText("storeName", value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="App ID"
                      variant="outlined"
                      value={storeData.appId}
                      fullWidth
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="App Secret"
                      variant="outlined"
                      value={storeData.appSecret}
                      fullWidth
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Branch"
                      variant="outlined"
                      value={storeData.branchName}
                      fullWidth
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Contact No."
                      variant="outlined"
                      fullWidth
                      value={storeData.contactNumber}
                      type="email"
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={storeData.email}
                      fullWidth
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={storeData.address}
                      rows={2}
                      required
                      disabled={!isEditing}
                      onChange={handleChange}
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
              </div>
            </Grid>
          </>
        ) : (
          <div>Loading</div>
        )}
      </Paper>
    </Grid>
  );
};

export default StoreInfo;
