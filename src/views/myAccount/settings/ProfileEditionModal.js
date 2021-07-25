import React, { useEffect, useState } from "react";
import { callPostApiWithAuth, callPutApiWithAuth } from "utils/api";
import axios from "axios";
import { getToken } from "utils/auth";
import {
  Modal,
  Fade,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Skeleton,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import NoPhotoIcon from "assets/images/nophoto.jpg";

export default function ProfileEditionModal({
  isOpened,
  userData,
  closeEdition,
  afterUpdateSuccess,
  onErrorMessage,
}) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [ownershipName, setOwnershipName] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState({ preview: "", raw: "" });
  const uploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_API_BASE_URL}profile/photo`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setIsUploadingPhoto(true);
      } else {
        setIsUploadingPhoto(false);
      }
      if (info.file.status === "done") {
        afterUpdateSuccess(`Photo is updated.`);
      } else if (info.file.status === "error") {
        onErrorMessage(`File upload failed.`);
      }
    },
    showUploadList: false,
  };

  useEffect(() => {
    if (!userData) return;
    setFirstName(userData.first_name)
    setLastName(userData.last_name)
    setEmail(userData.email);
    setPhone(userData.phone);
    setUsername(userData.username);
    // setOwnershipName(userData.ownership_name);
    setPhotoUrl({ preview: userData.image });
  }, [userData]);
  const updateProfile = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      email == "" ||
      !phone ||
      phone == "" ||
      !username ||
      username == ""
    ) {
      onErrorMessage(
        "First Name, Last Name, Email, Phone, Username should be required."
      );
      return;
    }
    if (validateUsername()) {
      onErrorMessage("Username should be alphanumeric.");
      return;
    }
    if (validateEmail()) {
      onErrorMessage("Please input a correct email type.");
      return;
    }
    setIsUpdatingProfile(true);
    callPutApiWithAuth(
      "profile",
      {
        email: email.toLocaleLowerCase(),
        phone,
        username: username.toLowerCase(),
        // ownership_name: ownershipName,
        first_name: firstName,
        last_name: lastName
      },
      onDoneUpdateProfile,
      onFailUpdateProfile
    );
  };
  const onDoneUpdateProfile = (data) => {
    afterUpdateSuccess(data.message);
    setIsUpdatingProfile(false);
    closeEdition();
  };
  const onFailUpdateProfile = (errorMessage) => {
    onErrorMessage(errorMessage);
    setIsUpdatingProfile(false);
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    setPhotoUrl({ preview: URL.createObjectURL(files[0]), raw: files[0] });
  };

  const onUploadPhoto = () => {
    setIsUploadingPhoto(true);
    var formData = new FormData();
    formData.append("image", photoUrl.raw);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then(
        (res) => onDoneUploadPhto(res.data),
        (err) => onFailUploadPhoto
      );
  };
  const onDoneUploadPhto = (data) => {
    setIsUploadingPhoto(false);
    afterUpdateSuccess(`Photo is updated.`);
    closeEdition();
  };
  const onFailUploadPhoto = () => {
    setIsUploadingPhoto(false);
    onErrorMessage("File upload failed.");
  };
  const changePassword = () => {
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password == "" || passwordConfirm == "" || oldPassword == "") {
      onErrorMessage("You should input password field");
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      onErrorMessage("Password should contain uppercase, lowercase, numeric, special characters and longer than 8 characters.");
      return;
    }
    if (password != passwordConfirm) {
      onErrorMessage("Password and confirm password should be match.");
      return;
    }

    setIsChangingPassword(true);
    callPutApiWithAuth(
      "profile/password",
      { password, old_password: oldPassword },
      onDoneChangePassword,
      onFailChangePassword
    );
  };
  const onDoneChangePassword = (data) => {
    afterUpdateSuccess(data.message);
    setIsChangingPassword(false);
    closeEdition();
  };
  const onFailChangePassword = (errorMessage) => {
    onErrorMessage(errorMessage);
    setIsChangingPassword(false);
  };
  const validateUsername = () => {
    let validUsername = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;

    if (username.match(validUsername)) {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = () => {
    let validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email.match(validEmail)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Modal open={isOpened} onClose={closeEdition}>
      <Fade in={isOpened}>
        <div className={classes.modalRoot}>
          <Typography component={"h2"}>My Account Info</Typography>
          <IconButton
            component="span"
            className={classes.close}
            onClick={closeEdition}
          >
            <CloseIcon />
          </IconButton>
          <div>
            <Tabs
              className={classes.tabs}
              value={selectedTab}
              onChange={(_, tab) => setSelectedTab(tab)}
              aria-label=""
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab className={classes.tab} label="Profile" value="profile" />
              <Tab
                className={classes.tab}
                label="Change Password"
                value="change-password"
              />
              <Tab className={classes.tab} label="Photo" value="upload-photo" />
            </Tabs>
          </div>
          <TabPanel selectedTab={selectedTab} tab={"profile"}>
            <div className={classes.form}>
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>First Name:</InputLabel>
                <OutlinedInput
                  labelWidth={50}
                  value={firstName}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Last Name:</InputLabel>
                <OutlinedInput
                  labelWidth={50}
                  value={lastName}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Email:</InputLabel>
                <OutlinedInput
                  labelWidth={50}
                  value={email}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Phone:</InputLabel>
                <OutlinedInput
                  labelWidth={55}
                  value={phone}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Username:</InputLabel>
                <OutlinedInput
                  labelWidth={85}
                  value={username}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              {/* <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Company Name:</InputLabel>
                <OutlinedInput
                  labelWidth={140}
                  value={ownershipName}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setOwnershipName(e.target.value)}
                />
              </FormControl> */}
              <Button
                color="primary"
                variant="contained"
                onClick={updateProfile}
                className={classes.btn}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? (
                  <CircularProgress size={24} />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </TabPanel>
          <TabPanel selectedTab={selectedTab} tab={"change-password"}>
            <div className={classes.form}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Current Password:</InputLabel>
                <OutlinedInput
                  labelWidth={150}
                  value={oldPassword}
                  type={"password"}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>New Password:</InputLabel>
                <OutlinedInput
                  labelWidth={120}
                  value={password}
                  type={"password"}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Confirm Password:</InputLabel>
                <OutlinedInput
                  labelWidth={145}
                  value={passwordConfirm}
                  type={"password"}
                  inputProps={{
                    className: classes.inputField,
                  }}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                onClick={changePassword}
                className={classes.btn}
                disabled={isChangingPassword}
              >
                {isChangingPassword ? (
                  <CircularProgress size={24} />
                ) : (
                  "Save New Password"
                )}
              </Button>
            </div>
          </TabPanel>
          <TabPanel selectedTab={selectedTab} tab={"upload-photo"}>
            <div className={classes.photoRoot}>
              <img
                src={photoUrl.preview ? photoUrl.preview : NoPhotoIcon}
                className={classes.photo}
              />
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <Button
                  color="primary"
                  variant="contained"
                  component="span"
                  disabled={isUploadingPhoto}
                >
                  Choose file
                </Button>
              </label>
              &nbsp;&nbsp;&nbsp;
              {photoUrl.raw ? (
                <Button
                  color="primary"
                  variant="contained"
                  component="span"
                  disabled={isUploadingPhoto}
                  onClick={onUploadPhoto}
                >
                  {isUploadingPhoto ? <CircularProgress size={24} /> : "Upload"}
                </Button>
              ) : null}
            </div>
          </TabPanel>
        </div>
      </Fade>
    </Modal>
  );
}

const TabPanel = ({ children, selectedTab, tab }) => (
  <div role="tabpanel" hidden={selectedTab !== tab}>
    {children}
  </div>
);

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: "5px",
    padding: theme.spacing(2, 3, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    outline: 'none',
    [theme.breakpoints.only("xs")]: {
      width: "80%",
      left: "3%",
      top: "1%",
      transform: `translate(0, 20px)`,
    },
    [theme.breakpoints.only('sm')]: {
      left: '50%',
      top: '50%',
      width: '80%'
    },
  },
  close: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 4,
  },
  tabs: {
    minHeight: "32px",
    padding: "20px 0 0 0",
  },
  tab: {
    minHeight: "32px",
    minWidth: "auto",
    textTransform: "capitalize",
  },
  form: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  formControl: {
    width: "100%",
    marginBottom: 16,
    "& label": {
      transform: "translate(14px, 14px) scale(1)",
      background: "#fff",
      paddingRight: 6,
    },
  },
  btn: {
    marginTop: 12,
  },
  btnProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  btnWrapper: {
    position: "relative",
  },
  actionGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
  },
  photoWrapper: {
    display: "flex",
  },
  photoRoot: {
    display: "flex",
    alignItems: "center",
  },
  photo: {
    width: 72,
    height: 72,
    border: `1px solid ${theme.palette.border.panel}`,
    borderRadius: "50%",
    marginRight: 12,
    objectFit: 'cover',
  },
  inputField: {
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
}));
