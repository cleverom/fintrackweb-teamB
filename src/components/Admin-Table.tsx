import React, { useState, useEffect, EffectCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import jwtdecode from "jwt-decode";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import CheckIcon from "@material-ui/icons/Check";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  table: {
    [theme.breakpoints.up(960)]: {},
  },
  contain: {
    margin: "0 40px",
    border: 0,
  },
  textarea: {
    resize: "none",
    overflow: "hidden",
    width: "100%",
    minHeight: "50px",
    padding: "2px",
    lineHeight: "13px",
    fontSize: "13px",
  },
  container: {
    padding: theme.spacing(3),
  },
  image: {
    marginRight: "10px",
    width: "50px",
    height: "50px",
    borderRadius: "70px"
  },
  filebtn: {
    maxWidth: "30%",
    marginLeft: "1.2%",
  },
  sub: {
    display: "flex",
  },
  btn: {
    fontSize: "10px",
    width: "80px",
  },
  nav_bar: {
    display: "flex",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "1",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "50px 345px",
    borderRadius: "10px",
  },
  head_info: {
    display: "flex",
    margin: "30px 0",
  },
  hover: {
    "&:hover": {
      transform: "scale(1.04)",
    },
    cursor: "pointer",
  },
  time: {
    fontSize: "0.5rem",
  },
  date: {
    fontSize: "0.7rem",
    paddingTop: "18px",
  },
  title: {
    margin: "20px 50px",
  },
  para: {
    margin: "20px 0",
  },
  price: {
    margin: "20px 0",
  },
  btn_modal: {
    margin: "20px 0",
  },
  btn_m: {
    margin: "20px 20px",
  },
  image_modal: {
    marginRight: "10px",
    width: "20%",
  },

  email: {
    fontSize: "10px",
    [theme.breakpoints.down(800)]: {},
  },
  titles: {
    fontSize: "12px",
   
    [theme.breakpoints.down(800)]: {},
  },
  amount: {
    fontSize: "12px",
    [theme.breakpoints.down(800)]: {},
  },
  status: {
    fontSize: "5px",
    [theme.breakpoints.down(800)]: {},
  },
  non: {
    paddingLeft: "300px",
    paddingTop: "100px",
    fontWeight: 800,
    fontSize: "20px",
    color: "red",
  },
  formControl: {
    minWidth: 120,
    marginTop: "30px",
  },
  statusbtn: {
    marginTop: "60px",
    marginLeft: "30px",
  },
}));

const states = {
  status: "",
};
const state = {
  title: "",
  description: "",
  request: "",
  amount: "",
  approvers: [],
  image_url: "",
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000C66",
    },
    secondary: {
      main: "#FAD02C",
    },
    error: {
      main: "#4a148c",
    },
    info: {
      main: "#050A30",
    },
    warning: {
      main: "#BC211D",
    },
    success: {
      main: "#116530",
    },
  },
});

export default function AdminTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [request, setRequest] = useState(states);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editopen, seteditopen] = React.useState(false);
  const [micro, setMicro] = React.useState(state);
  const [value, setValue]: any = useState([]);
  const [opens, setOpens] = React.useState(false);
  const [editID, setEditID] = React.useState("");

  const [deleteData, setDeleteData] = useState("");

  const handleClosed = () => {
    setOpens(false);
  };

  const handleOpened = () => {
    setOpens(true);
  };

  const handleEditOpen = () => {
    seteditopen(true);
  };
  const handleEditClose = () => {
    seteditopen(false);
  };
  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setRequest({ ...request, [name]: value });
  };

  let pass = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(pass);
  let user = decoded.allUser.name;
  let splitName = user.split(" ")
  let lastName = splitName[1]
  console.log(lastName)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (key: any) => {
    const value = data.find((item: any) => item._id == key);

    setValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (key: any) => {
    setEditID(key);
    console.log(key);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const onChangeHandler = (event: any) => {
    const { value, name } = event.target;
    console.log(name);
    setMicro({ ...micro, [name]: value });
  };
  console.log(micro);
  const getRequests = async () => {
    try {
      let response = await fetch("http://localhost:3000/allRequest", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + pass,
        },
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function myData() {
      let datas: any = await getRequests();

      setData(datas.data);
    }
    myData();
  }, [request, setRequest]);

  const updateStatus = async () => {
    if (request.status) {
      const apiUrl = `http://localhost:3000/updaterequest/${value._id}`;
      await fetch(apiUrl, {
        mode: "cors",
        method: "PATCH",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + pass,
        },
      }).then((response) => response);
      handleOpened();
      setRequest(states);
    };
  };

  useEffect(() => {
    updateStatus();
  }, [setRequest]);
 
  const [statuses, setStatus] = useState("");
  const [openDelete, setDelete] = useState(false);

  const handleDeleteOpen = (key: any) => {
    const value: any = data.find((item: any) => item._id == key);

    setValue(value);
    setDelete(true);
  };

  const handleDeleteClose = () => {
    setDelete(false);
  };
  
  const deleteStatus = async () => {
    const apiUrl = `http://localhost:3000/closerequest/${value._id}`;
    await fetch(apiUrl, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + pass,
      },
    }).then((response) => {
      setStatus("i am here");
    });
    handleDeleteClose();

    window.location.reload();
  };

  useEffect(() => {
    deleteStatus();
    setRequest(states);
  }, []);

  


  function dateConv(CurrentDate: string) {
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
    return (
      <>
        <p className={classes.date}>
          {month} {dt},{year}{" "}
          
        </p>
      </>
    );
  }

  function status(row: string) {
    let colors: any = "";
    if (row === "Pending") {
      colors = "secondary";
    } else if (row === "Needs Approval") {
      colors = "primary";
    } else if (row === "Approved") {
      colors = "#116530";
    } else if (row === "Resolved") {
      colors = "info";
    } else if (row === "Canceled") {
      colors = "warning";
    }

    return (
      <ThemeProvider theme={theme}>
        <Button variant="contained" color={colors} className={classes.btn}>
          {row}
        </Button>
      </ThemeProvider>
    );
  }

  const submitRequest = async (e?: any) => {
    // e.preventDefault();
    // console.log(micro);
    const apiUrl = `http://localhost:3000/updaterequest/${editID}`;
    await fetch(apiUrl, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(micro),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + pass,
      },
    }).then((response) => response);
    handleEditClose();
    setMicro(state);
    window.location.reload();
  };

  

  const [searchField, setSearchField] = useState("");

  const filteredPersons = data?.filter((person: any) => {
    return (
      person?.title?.toLowerCase().includes(searchField?.toLowerCase()) ||
      person?.status?.toLowerCase().includes(searchField?.toLowerCase()) ||
      person?.email?.toLowerCase().includes(searchField?.toLowerCase())
    );
  });

  const handleChanges = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchField(e.target.value);
  };

  if (!filteredPersons || filteredPersons.length === 0)
    return <p className={classes.non}>No requests yet...</p>;

  return (
    <>
      <Collapse in={openDelete}>
        <Alert onClick={() => deleteStatus()}>
          confirm delete!
          <CheckIcon style={{ marginLeft: "600px", cursor: "pointer" }} />
        </Alert>
      </Collapse>

      <div className={classes.contain}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search Request..."
          onChange={handleChanges}
        />
        <Table className={classes.table} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Users</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Amount(N)</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPersons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow key={row._id} className={classes.hover}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.titles}
                    onClick={() => handleOpen(row._id)}
                  >
                    <img className={classes.image} src={row.image_url}></img>
                    {row.title}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.email}
                    onClick={() => handleOpen(row._id)}
                  >
                    {row.email.split(".")[0]}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.status}
                    onClick={() => handleOpen(row._id)}
                  >
                    {status(row.status)}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classes.amount}
                    onClick={() => handleOpen(row._id)}
                  >
                    {Number(row.amount).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </TableCell>
                  <TableCell align="right" onClick={() => handleOpen(row._id)}>
                    {dateConv(row.createdAt)}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleOpenEdit(row._id)}
                  >
                    <EditIcon />
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => handleDeleteOpen(row._id)}
                    style={{ color: "blue" }}
                  >
                    <DeleteForeverIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <div>
          <Modal
            key={value._id}
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
              <div className={classes.paper}>
                <div className={classes.head_info}>
                  <h4>{user}</h4>
                </div>
                <Modal open={opens}>
                  <Alert onClose={() => handleClosed()}>
                    status updated successfully!
                  </Alert>
                </Modal>
                <Divider variant="middle" />
                <h2 className={classes.title}>{value.title}</h2>
                <img
                  className={classes.image_modal}
                  src={value.image_url}
                  style={{ width: "37rem", marginLeft: "3rem" }}
                ></img>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">Status</InputLabel>
                  <NativeSelect
                    value={request.status}
                    onChange={handleChange}
                    inputProps={{
                      name: "status",
                      id: "age-native-helper",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Needs Approval</option>
                    <option>Resolved</option>
                    <option>Canceled</option>
                  </NativeSelect>
                  <FormHelperText>
                    <strong>Upgrade request status</strong>
                  </FormHelperText>
                </FormControl>
                <Button
                  onClick={() => updateStatus()}
                  variant="contained"
                  color="primary"
                  className={classes.statusbtn}
                >
                  Update
                </Button>
                <Button
                  value={value._id}
                  href={"/comment/" + value._id}
                  variant="contained"
                  style={{ fontWeight: "bold", marginLeft: "29rem" }}
                  className={classes.btn_m}
                >
                  Request Details
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
        <div>
          <Modal
            key={value._id}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openEdit}
            onClose={handleCloseEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openEdit}>
              <div className={classes.paper}>
                <form
                  className={classes.formControl}
                  // onSubmit={submitRequest}
                  autoComplete="off"
                >
                  <Collapse in={editopen}>
                    <Alert onClick={() => submitRequest()}>
                      Update successful
                      <CheckIcon style={{ marginLeft: "600px", cursor: "pointer" }} />
                    </Alert>
                  </Collapse>
                  <h4>Make Edit To Your Request</h4>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={micro.title}
                            onChange={(e) => onChangeHandler(e)}
                            size="small"
                            type="text"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Approvers"
                            name="approvers"
                            value={micro.approvers}
                            onChange={(e) => onChangeHandler(e)}
                            size="small"
                            type="text"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            value={micro.amount}
                            onChange={(e) => onChangeHandler(e)}
                            size="small"
                            type="number"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="age-native-helper">Request Type</InputLabel>
                          <NativeSelect
                            value={micro.request}
                        
                            onChange={(e) => onChangeHandler(e)}
                            inputProps={{
                              name: "request",
                              id: "age-native-helper",
                            }}
                          >
                            <option aria-label="None" value="" />
                            
                            <option>Refund</option>
                            <option>Invoice</option>
                            <option>Loan</option>
                            <option>Upfront</option>
                            <option>Stipend</option>
                            <option>Others</option>
                          </NativeSelect>
                        </Grid>
                        <Grid item xs={12}>
                          <TextareaAutosize
                            name="description"
                            value={micro.description}
                            onChange={(e) => onChangeHandler(e)}
                            className={classes.textarea}
                            aria-label="maximum height"
                            rowsMin={3}
                            placeholder="Description of your request"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        color="primary"
                        fullWidth
                        // type="submit"
                        variant="contained"
                        onClick={() => handleEditOpen()}
                      >
                        Update Request
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
}
