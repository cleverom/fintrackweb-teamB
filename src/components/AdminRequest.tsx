import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import jwtdecode from 'jwt-decode';
import Navbar from './Navbar';
import Sidebar from "./AdminSidebar";
import IconButton from "@material-ui/core/IconButton";


const state = {comment: ""}

const PostComment = (props:any) => {
    const [data, setData] = useState<any>(state);
    const [comments, setComment] = useState<any>([])
    

    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setData({...data, [name]: value});
    }

    const link = props.location.pathname;
    const index = link.lastIndexOf('/') + 1
    const requestId = link.toString().slice(index)


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const cookie = document.cookie.split("=");
      
        const apiUrl =
          `http://localhost:3000/comment/${requestId}`;
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


  useEffect(()=> {
    async function myData3() {
      let commentdatas = await getComment();
      setComment(commentdatas);      
    }
    myData3();       
  }, []);
        
        let pass = document.cookie.split("=")[1];
        let decoded: any = jwtdecode(pass);
        let user = decoded.allUser.name;
    
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
                </div>
                <Card
                  key={item._id}
                  style={{ marginTop: "1rem", border: "none" }}
                >
                  <li key={item._id} style={{ listStyle: "none" }}>
                    <h6>
                      <strong>{user}</strong>
                    </h6>
                    <p style={{ width: "50rem" }}>
                      {item?.comment[0]?.comment}
                    </p>
                  </li>
                </Card>
              </div>
            );
          }
        );
        

    return (
        <div className="App" style={{ justifyContent: "center", alignItems: "center", marginLeft: "12rem"}}>
            <Card bg="white" style={{ width: "65rem"}}>
            <Card.Header
            style={{
              background: "rgb(40,41,64)",
              marginTop: "3.5rem",
              color: "#fff",
              padding: "2.5rem 0rem",
              textAlign: "center",
              fontSize: "1.7rem",
            }}
          >
            <b>Comments</b>
          </Card.Header>
          <Card.Body
            style={{
              background: "#fff",
              paddingBottom: "70px",
            }}
          >
           <div style={{display: "flex", marginTop: "7rem", marginLeft: "2rem"}}>
              <Form action="" onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  name="comment"
                  placeholder="Add a comment.."
                  value={data.comment}
                  onChange={handleChange}
                  as="textarea"
                  rows={2}
                  style={{width:"50rem"}}
                />
              </Form.Group> 
            
               <Button
                style={{
                  display: "block",
                  marginTop: "9px",
                  marginBottom: "2rem",
                  fontSize: "17px",
                  width:"10rem",
                  background: "rgb(40,41,64)"
                }}
                disabled={!data.comment}
                type="submit"
                variant="success"
                >
                Add Comment
              </Button>
              </Form>
              </div>
           <div>
               <ul style={{marginTop: "1rem", marginLeft:"3rem"}}>
               {commentData}
               </ul>
           </div>
            </Card.Body>
          </Card>
          <Navbar />
          <Sidebar />
        </div>
    )
}

export default PostComment;