import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import jwtdecode from "jwt-decode";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Mobileuser from "./MobileMenu";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appBar: {
      backgroundColor: "white",
      [theme.breakpoints.down(600)]: {
        // width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: "black",
      },
    },
    menuButton: {
      color: "blue",
      borderRadius: "28px",
      border: "2px solid grey",
      width: "60px",
      fontSize: "20px",
      backgroundColor: "white",
      justifyContent: "center",
      [theme.breakpoints.down(700)]: {
        width: "65px",
        fontSize: "30px",
      },
    },

    arrowButton: {
      color: "blue",
      fontSize: "20px",
      backgroundColor: "white",
      justifyContent: "center",
      cursor: "pointer",
      [theme.breakpoints.down(600)]: {
        fontSize: "70px",
        color: "white",
        backgroundColor: "black",
      },
    },
    toolBar: {
      marginLeft: "1300px",
      position: "absolute",
      [theme.breakpoints.down(800)]: {
        marginLeft: "970px",
        position: "absolute",
        fontSize: "10px",
      },
    },
    image: {
      color: "white",
      fontSize: "35px",
    },
    navhead: {
      display: "flex",
      color: "red",
      fontSize: "60px",
    },
  })
);

export default function MenuAppBar() {
  let pass = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(pass);

  let email = decoded.allUser.email;
  let emailextra = email.split(".");
  let firstName = emailextra[0];
  let lastName = emailextra[1];
  let res = firstName[0] + lastName[0];
  let name = res.toUpperCase();

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp implementation="css">
            <div className={classes.navhead}>
              <Mobileuser />
              <img
                className={classes.image}
                src="https://decagon-clever.netlify.app/img/logo-white.svg"
              ></img>
            </div>
          </Hidden>
          {auth && (
            <div className={classes.toolBar}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                className={classes.menuButton}
              >
                {name}
              </IconButton>
              <ArrowDropDownIcon className={classes.arrowButton} onClick={handleMenu}/>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
