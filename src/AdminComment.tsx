import React, { useState, useEffect, ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
// import Card from "react-bootstrap/esm/Card";

import jwtdecode from "jwt-decode";
import Navbar from "./components/Navbar";
import Sidebar from "./components/AdminSidebar";
import IconButton from "@material-ui/core/IconButton";

// import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 920,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const state = { comment: "" };

const AdminComment = (props: any) => {
  const [data, setData] = useState<any>(state);
  const [comments, setComment] = useState<any>([]);
  const [request, setRequest] = useState<any>([]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<any>(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const link = props.location.pathname;
  const index = link.lastIndexOf("/") + 1;
  const requestId = link.toString().slice(index);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const cookie = document.cookie.split("=");

    const apiUrl = `http://localhost:3000/postComment/${requestId}`;
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + cookie[1],
      },
    })
      .then((response) => response.json())
      console.log("ia am here")
    window.location.reload();
  };

  const getRequest = async () => {
    const cookie = document.cookie.split("=");
    try {
      let response = await fetch(`http://localhost:3000/request/${requestId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie[1],
        },
      });
      //  console.log(response.json());
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=> {
    async function myData9() {
      let requestdata = await getRequest();
      setRequest(requestdata.data);
    }
    myData9();
  }, []);
  console.log(request);

  const getComment = async () => {
    const cookie = document.cookie.split("=");
    try {
      let response = await fetch(`http://localhost:3000/comment/${requestId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie[1],
        },
      });
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    async function myData6() {
      let commentdatas = await getComment();
      setComment(commentdatas);
    }
    myData6();
  }, []);

  let pass = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(pass);
  let user = decoded.allUser.name;

  const requestData: any = request?.data?.forEach(
    (item: any) => {
      console.log(item);
      return (
        <div>
          <Card>
            <CardContent>
              <p>{item?.email}</p>
            </CardContent>
          </Card>
        </div>
      );
    }
  );

  const commentData: any = comments?.data?.map(
    (item: any) => {
      console.log(item.authorEmail);
      let email = item.authorEmail;
      let emailextra = email.split(".");
      let firstName = emailextra[0];
      let lastName = emailextra[1];
      let res = firstName[0] + lastName[0];
      let name = res.toUpperCase();
      console.log(name);

      const author = item.author;
      return (
        <div style={{ display: "flex", marginTop: "2rem" }}>
          <div style={{ marginRight: "20px", marginTop: "4px" }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              style={{
                color: "blue",
                borderRadius: "28px",
                border: "2px solid grey",
                width: "60px",
                fontSize: "20px",
                backgroundColor: "white",
              }}
            >
              {name}
            </IconButton>
            {/* borderColor: "rgb(40,41,64)" */}
          </div>
          <Card key={item._id} style={{ marginTop: "1rem", boxShadow: "none" }}>
            <li key={item._id} style={{ listStyle: "none" }}>
              <h6>
                <strong>{user}</strong>
              </h6>
              <p style={{ width: "50rem" }}>{item?.comment[0]?.comment}</p>
            </li>
          </Card>
        </div>
      );
    }
  );

  return (
    <div
      className="App"
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "18rem",
      }}
    >
      <Card className={classes.root} style={{ width: "65rem" }}>
        <CardHeader
          style={{
            background: "rgb(40,41,64)",
            marginTop: "3.5rem",
            color: "#fff",
            padding: "1.5rem 0rem",
            textAlign: "center",
            fontSize: "1.7rem",
          }}
          title={request.title}
        >
          <b>Comments</b>
        </CardHeader>
        <CardContent
          style={{
            background: "#fff",
            paddingBottom: "70px",
          }}
        >
          <div>
            <Card style={{ marginTop: "2rem" }}>
              <CardContent
                style={{
                  marginLeft: "17rem",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <Typography paragraph>Author email: {request.email}</Typography>
                <Typography paragraph>
                  Description: {request.description}
                </Typography>
                <Typography paragraph>
                  Type of Request: {request.request}
                </Typography>
                <Typography paragraph>Amount: {request.amount}</Typography>
                <Typography paragraph>Status: {request.status}</Typography>
                <Typography paragraph>
                  Approver(s): {request.approvers}
                </Typography>
                <Typography paragraph>
                  Date of creation: {request.createdAt}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div
            style={{ display: "flex", marginTop: "4rem", marginLeft: "2rem" }}
          >
            <Form action="" onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  name="comment"
                  placeholder="Add a comment.."
                  value={data.comment}
                  onChange={handleChange}
                  as="textarea"
                  rows={2}
                  style={{ width: "50rem" }}
                />
              </Form.Group>
              <Button
                style={{
                  // display: "block",
                  // marginTop: "2rem",
                  marginBottom: "2rem",
                  fontSize: "13px",
                  width: "10rem",
                  // height:"3rem",
                  padding: 15,
                  background: "rgb(40,41,64)",
                }}
                disabled={!data.comment}
                type="submit"
                variant="success"
              >
                Add Comment
              </Button>
            </Form>
          </div>

          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                paragraph
                style={{ fontSize: "1.5rem", marginLeft: "6.6rem" }}
              >
                Comments
              </Typography>
              <div>
                <ul style={{ marginLeft: "1.6rem" }}>{commentData}</ul>
              </div>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default AdminComment;
