import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import jwtdecode from "jwt-decode";

import {Link} from 'react-router-dom'
import { countReset } from "console";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      
      transform: "translateZ(0)",
      "@media all and (-ms-high-contrast: none)": {
        display: "none",
      },
    },
    modal: {
      display: "flex",
      padding: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
      
    },

    alert: {
      width: '30%',
      padding: "20px 120px",

      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      [theme.breakpoints.down(600)]: {
        padding: "20px 10px",
        width: '70%',
        
      },
    },
    App:{
      
        display: "flex",
        justifyContent: "center",
        
        
        paddingLeft: "250px",
        paddingTop: "60px",
        alignItems: "center",
        color: "rgb(0,0,0)",
        [theme.breakpoints.down(800)]: {
          padddingLeft: "150px",
        },
        
        [theme.breakpoints.down(600)]: {
          paddingLeft: "0px",
          
        },
        
    },
    header:{
      
        background: "rgb(40,41,64)",
        color: "#fff",
        padding: "2.5rem 0rem",
        textAlign: "center",
        fontSize: "1.7rem",
      
      [theme.breakpoints.down(600)]: {
        fontSize: "20px",
        
      },
      
    },
    cardRequest:{
      width: "65rem",
      [theme.breakpoints.down(600)]: {
        marginTop: "30px",
      },
    },
    formField:{
      [theme.breakpoints.down(600)]: {
       height: "40px"
      },
    },
    label:{
      [theme.breakpoints.down(600)]: {
        fontSize: "10px"
      },
    },
    cardBody:{
      
        background: "#fff",
        paddingBottom: "70px",
        [theme.breakpoints.down(600)]: {
          paddingTop: "50px"
        },
      
    },
    submitBtn:{
      
        display: "block",
        marginTop: "20px",
        fontSize: "17px",
        width: "16rem",
        marginLeft: "20rem",
        [theme.breakpoints.down(900)]: {
          marginLeft: "10rem",
          marginTop: "40px",
          width: "12rem",
        },
        [theme.breakpoints.down(600)]: {
         fontSize: "10px",
         marginLeft: "4rem",
         width: "5rem",
        },
     
    },

    controlBtn:{
      [theme.breakpoints.down(600)]: {
        fontSize: "18px",
        
      },
    },
  })
);

const state: any = {
  email: "",
  title: "",
  description: "",
  request: "",
  amount: "",
  status: "",
  approvers: [],
  image_url: "",
};

const CreateRequest = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(state);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const cookie = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(cookie);

  let email = decoded.allUser.email;
  
  const handleCloseError = () => {
    setOpenError(false)
  }
  const handleClose = () => {

      setOpen(false);
    
  };


  const handleOpen = () => {
    if(data.email !== email){
      setOpenError(true)
    }else{
      setOpen(true);
    }

  };

  const onChangeHandler = (event: any) => {
    const {files} = event.target;
    if (files) {
      console.log("i am here")
      const url = `https://api.cloudinary.com/v1_1/omecloudinary/upload`;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "upload");
     
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          setData({...data, image_url: datas.secure_url });
        });

    }else if(event.target.name === "approvers"){
      const { value, name } = event.target;
      setData({...data, [name]: [...state.approvers, value]})

    }else{
      const { value, name } = event.target;
      setData({...data, [name]: value });
    }
    
  };

  
  let name = decoded.allUser.name;
  let firstName = email.split(".")[0]
  console.log(firstName)
  let role = decoded.allUser.role;
  console.log(role, email)
  console.log(data.email)

  const submitRequest = async (e: any) => {
    e.preventDefault();
    const apiUrl =
      `http://localhost:3000/userrequest`;
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + cookie,
      },
    })
      .then((response) => response.json()) 
    handleOpen();
    setData(state);
  };
  
  return (
    <div
      className={classes.App}
      
    >
      <Card bg="white" className={classes.cardRequest}>
        <Card.Header
        className={classes.header}
          
        >
          <b>Create Request</b>
        </Card.Header>
        <Card.Body
          className={classes.cardBody}
        >
          <Form action="" onSubmit={submitRequest}>
            {openError === true ?
            <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openError}
              onClose={handleCloseError}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openError}>
                <Alert severity="error" className={classes.alert}>
                  <AlertTitle>Error</AlertTitle>
                   <strong>Invalid email, you cannot create request for someone else!</strong>
                </Alert>
              </Fade>
            </Modal>


              </div> :
              
            <div>
             <Link to='/user' ><Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                  <Fade in={open}>
                    
                  <Alert severity="success" className={classes.alert}>
                    <AlertTitle>Success</AlertTitle>
                     <strong>Request created!</strong>
                  </Alert>
                </Fade>

              </Modal>
                </Link>

            </div>
            }
            <Form.Group>
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>Email</Form.Label>
              <Form.Control
                name="email"
                value={data.email}
                onChange={(e) => onChangeHandler(e)}
                type="text"
                required
                className={classes.formField}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ paddingTop: "40px" }} className={classes.label}>Title</Form.Label>
              <Form.Control
                name="title"
                value={data.title}
                onChange={(e) => onChangeHandler(e)}
                type="text"
                required
                className={classes.formField}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>
                Description
              </Form.Label>
              <Form.Control
                name="description"
                value={data.description}
                onChange={(e) => onChangeHandler(e)}
                as="textarea"
                rows={3}
                required
                className={classes.formField}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>Requests</Form.Label>
              <Form.Control
                name="request"
                value={data.request}
                className={classes.formField}
                onChange={(e) => onChangeHandler(e)}
                as="select"
              >
                <option>Type of Request</option>
                <option>Refund</option>
                <option>Invoice</option>
                <option>Loan</option>
                <option>Upfront</option>
                <option>Stipend</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>Amount</Form.Label>
              <Form.Control
                name="amount"
                value={data.amount}
                onChange={(e) => onChangeHandler(e)}
                type="text"
                required
                className={classes.formField}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>Status</Form.Label>
              <Form.Control
                name="status"
                value={data.status}
                className={classes.formField}
                onChange={(e) => onChangeHandler(e)}
                as="select"
              >
                <option>Status</option>
                <option>Pending</option>
                {/* <option>Needs Approval</option>
                <option>Approved</option>
                <option>Resolved</option>
                <option>Canceled</option> */}
              </Form.Control>
            </Form.Group>
            <Form.Group style={{ paddingBottom: "30px" }}>
              <Form.Label style={{ paddingTop: "20px" }} className={classes.label}>Approvers</Form.Label>
              <Form.Control
                name="approvers"
                value={data.approvers}
                className={classes.formField}
                onChange={(e) => onChangeHandler(e)}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group
              style={{
                position: "relative",
                width: "130px",
                height: "40px",
                border: "1px solid green",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
                fontWeight: "normal",
                cursor: "pointer",
                paddingTop: "5px",
                fontSize: "14px",
              }}
            >
              <Form.Label className={classes.controlBtn}>Upload Invoice</Form.Label>
              <Form.Control
                className={classes.controlBtn}
                style={{ width: "100px", position: "absolute", opacity: "0" }}
                type="file"
                accept="/*"
                id="single"
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Button
              className={classes.submitBtn}
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateRequest;
