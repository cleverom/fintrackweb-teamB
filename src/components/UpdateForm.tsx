import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Navbar from "./Navbar";
import Sidebar from "./AdminSidebar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import jwtdecode from "jwt-decode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: "520px",

      paddingTop: "20px",
      "& > *": {
        margin: theme.spacing(8),
        width: "60ch",
      },
    },
    message: {
      marginLeft: "10px",
    },
    alert: {
      padding: "30px",
    },
  })
);
export default function BasicTextFields() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState("");
  const [agent, setAgent] = useState("");
  const cookie = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(cookie);


  let email = decoded.allUser.email;

  const handleOpen = () => {
    setOpen(true);
  };

  const onChangeHandlerAdmin = (e: any) => {
    setAdmin(e.target.value);
  };
  const onChangeHandlerAgent = (e: any) => {
    setAgent(e.target.value);
  };

  const updateToAdmin = async () => {
    if (admin !== "") {
      
      const apiUrl = `http://localhost:3000/updateAdmin`;
      await fetch(apiUrl, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          email: admin
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + cookie,
        },
      }).then((response) => response.json());
      handleOpen();
    }
    setAdmin("");
  };
  const updateToAgent = async () => {
    if (agent !== "") {
      
      const apiUrl = `http://localhost:3000/updateAgent`;
      await fetch(apiUrl, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          email: agent,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + cookie,
        },
      }).then((response) => response.json());
      handleOpen();
    }

    setAgent("");
  };
    
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Collapse in={open} className={classes.message}>
          <Alert
            className={classes.alert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            User updated successfully!
          </Alert>
        </Collapse>
        <Typography
          variant="h4"
          style={{ marginTop: "10px", marginLeft: "160px", fontWeight: "bold" }}
        >
          Update User Role
        </Typography>
        <div style={{ marginTop: "0px" }}>
          <Typography
            style={{
              marginBottom: "20px",
              marginLeft: "170px",
              fontWeight: "bold",
            }}
          >
            Update user to admin
          </Typography>
          <TextField
            style={{ width: "80%", marginBottom: "30px" }}
            id="outlined-basic"
            label="email"
            value={admin}
            variant="outlined"
            onChange={(e) => onChangeHandlerAdmin(e)}

            required

          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateToAdmin()}
            style={{ marginLeft: "33%" }}
          >
            Update
          </Button>
        </div>
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Typography
            style={{
              marginBottom: "20px",
              marginLeft: "170px",
              fontWeight: "bold",
            }}
          >
            Update user to agent
          </Typography>
          <TextField
            style={{ width: "80%", marginBottom: "30px" }}
            id="outlined-basic"
            label="email"
            value={agent}
            variant="outlined"
            onChange={(e) => onChangeHandlerAgent(e)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateToAgent()}
            style={{ marginLeft: "33%" }}
          >
            Update
          </Button>
        </div>
      </form>
      <Navbar />
      <Sidebar />
    </div>
  );
}