import React, {useState, useEffect, ReactNode} from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import jwtdecode from 'jwt-decode';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from './components/Navbar'
import Sidebar from './components/AdminSidebar'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 920,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', 
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardContent:{
      [theme.breakpoints.down(600)]: {
        fontSize: "25px",
        justifyContent: "center",
      },

    },
    card:{
      marginLeft:"4rem", 
      marginTop:"0.5rem", 
      marginBottom: "2rem",
      fontFamily: "Yellowtail",
      [theme.breakpoints.down(600)]: {
        marginLeft: "150px"
      },
      
    },
    App:{
     justifyContent: "center", 
     alignItems: "center", 
     marginLeft: "24rem",
     [theme.breakpoints.down(600)]: {
      marginLeft: "0rem",
      marginTop: "34px", 
    },
    },
    inputField:{
      width:"50rem",
      [theme.breakpoints.down(600)]: {
        fontSize: "20px",
      },
    },
    btnComment:{
      
        marginBottom: "2rem",
        fontSize: "13px",
        width:"10rem",
        
        padding: 15,
        background: "rgb(40,41,64)",
        [theme.breakpoints.down(600)]: {
          fontSize: "21px",
         
        },
    }
  }),
);

const state = {comment: ""}

const AddComment = (props:any) => {
  console.log(props);
  
    const [data, setData] = useState<any>(state);
    const [comments, setComment] = useState<any>([])
    const [request, setRequest] = React.useState<any>([])
    
    const classes = useStyles();
  const [expanded, setExpanded] = React.useState<any>(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setData({...data, [name]: value});
    }
    console.log(props);
    

    const link = props.location.pathname;
    const index = link.lastIndexOf('/') + 1
  const requestId = link.toString().slice(index)
  
console.log(request)
  function dateConv(CurrentDate: any) {
    let date = new Date(CurrentDate);
    let year = date.getFullYear();
    let hh = date.getHours();
    let sec = date.getSeconds();
    let min = date.getMinutes();
    let m = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month: string = m[date.getMonth()];
    let dt: string | number = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    return `${month} ${dt},${year}`;
  }


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const cookie = document.cookie.split("=");
      
        const apiUrl =
          `http://localhost:3000/postComment/${requestId}`;
        fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization:
            'Bearer ' + cookie[1],
          },
        })
          .then((response) => response.json())
          
        window.location.reload()
    }


    const getRequest = async () => {
      const cookie = document.cookie.split("=");
         try {
             
           let response = await fetch(`http://localhost:3000/request/${requestId}`, {
             method: "GET",
             headers: {
               Accept: "application/json",
               Authorization:
               'Bearer ' + cookie[1],
             },
           });
          
           return response.json();
         
         } catch (err) {
           console.error(err);
         }
       };

  useEffect(() => {
    async function myData8() {
      let requestdata = await getRequest();
      console.log(requestdata);
      setRequest(requestdata.data);
    }
    myData8();     
  }, []);
  console.log(request);
     
const getComment = async () => {
  const cookie = document.cookie.split("=");
    try {
        
      let response = await fetch(`http://localhost:3000/comment/${requestId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
          'Bearer ' + cookie[1],
        },
      });
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function myData7() {
    let commentdatas = await getComment();
    setComment(commentdatas);
  }
  myData7(); 
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
          
          
      
          
        const commentData:any = comments?.data?.map((item: any) => {
          
          
          let email = item.authorEmail;
          let emailextra = email.split(".");
          let firstName = emailextra[0];
          let lastName = emailextra[1];
          let res = firstName[0] + lastName[0];
          let name = res.toUpperCase();
          console.log(name);
          
          
          
          const author = item.author
          return <div style={{display: "flex", marginTop: "2rem"}}>

            <div style={{marginRight: "20px", marginTop: "4px"}}>

            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                style={{color: "blue",
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
             </div><Card key={item._id} style={{marginTop:"1rem", boxShadow:"none"}}><li key={item._id} style={{listStyle:"none"}} > 
                <h6><strong>{user}</strong></h6>
                <p style={{width:"50rem"}}>{item?.comment[0]?.comment}</p>
            </li></Card></div>
        })
        

    return (
      <div className={classes.App}>
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
              <Card
                style={{ marginTop: "2rem" }}
                className={classes.cardContent}
              >
                <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    
                  </Avatar>
                }
                
                title={request.email}
                subheader={dateConv(request.createdAt)}
              />
                <CardContent className={classes.card}>
                  
                  <Typography paragraph className={classes.cardContent}>
                    <p style={{color: "black", fontSize: "30px", fontWeight: "bold"}}>Description: </p> <div style={{color: "black", font: "15px", marginRight: "100px"}}>{request.description}</div>
                  </Typography>
                  <Typography paragraph className={classes.cardContent}>
                  <p style={{color: "black", font: "28px", fontWeight: "bold"}}>Type of Request: <span style={{color: "black", font: "15px", fontWeight: "normal"}}>{request.request}</span></p> 
                  </Typography>
                  <Typography paragraph className={classes.cardContent}>
                  <p style={{color: "black", font: "25px", fontWeight: "bold"}}>Amount:{" "}: <span style={{color: "black", font: "15px", fontWeight: "normal"}}>{Number(request.amount).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}</span></p>
                    
                  </Typography>
                  <Typography paragraph className={classes.cardContent}>
                  <p style={{color: "black", font: "20px", fontWeight: "bold"}}>Status: <span style={{color: "black", font: "15px", fontWeight: "normal"}}>{request.status}</span></p> 
                  </Typography>
                  <Typography paragraph className={classes.cardContent}>
                  <p style={{color: "black", font: "15px", fontWeight: "bold"}}>Approver(s): <span style={{color: "black", font: "15px", fontWeight: "normal"}}>{request.approvers}</span></p> 
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
                    required
                    className={classes.inputField}
                  />
                </Form.Group>
                <Button
                  className={classes.btnComment}
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
        <Sidebar />
        <Navbar />
      </div>
    );
}

export default AddComment;
