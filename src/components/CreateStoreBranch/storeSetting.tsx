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
  // const [storeName, setStoreName] = useState("");
  // const [branchName, setBranchName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  // const [appId, setAppId] = useState("");
  // const [appSecret, setAppSecret] = useState("");

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      const store_Id = localStorage.getItem("store_Id");
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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const branch_Id = localStorage.getItem("branch_Id");

      var formdata = new FormData();
      formdata.append("storeName", storeData.storeName);
      formdata.append("photo", photo || "");
      formdata.append("appId", storeData.appId);
      formdata.append("appSecret", storeData.appSecret);

      formdata.append("branch_Id", branch_Id || "");
      formdata.append("branchName", storeData.branchName);
      formdata.append("contactNumber", storeData.contactNumber);
      formdata.append("email", storeData.email);
      formdata.append("address", storeData.address);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/${store_Id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formdata,
        }
      );
      if (response.ok) {
        fetchStoreData();
      } else {
        console.error("Failed to add item.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeText = (key: string | number, value: any) => {
    const tempUserData = {
      ...storeData,
      [key]: value,
    };
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
    handleSubmit();
  };

  useEffect(() => {
    fetchStoreData();
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      window.location.href = "/admin/login";
    }
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} style={{ padding: "20px", width: 800 }}>
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
                <Typography variant="h6" style={{ marginTop: 10 }}>
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
                <Grid container spacing={2} style={{ marginTop: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Store Name"
                      variant="outlined"
                      value={storeData.storeName}
                      fullWidth
                      required
                      disabled={!isEditing}
                      name="storeName"
                      onChange={(e) => {
                        handleChangeText("storeName", e.target.value);
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
                      onChange={(e) => {
                        handleChangeText("appId", e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleChangeText("appSecret", e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleChangeText("branchName", e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleChangeText("contactNumber", e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleChangeText("email", e.target.value);
                      }}
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
                      onChange={(e) => {
                        handleChangeText("address", e.target.value);
                      }}
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
