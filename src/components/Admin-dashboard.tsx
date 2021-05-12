import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tables from "./Admin-Table";
import jwtdecode from "jwt-decode";
import Hidden from "@material-ui/core/Hidden";
import MobileMenu from "./MobileMenu";

import Summary from "./Admin-Summary";
import Navbar from "./AdminNav";
import Sidebar from "./AdminSidebar";
import { green } from "@material-ui/core/colors";
// import AdmminComment from './AdminComment'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: "#050A30",
      width: drawerWidth,
      color: "white",
    },

    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
    },

    app: {
      display: "flex",
      placeItems: "top",
      paddingLeft: "270px",
      paddingRight: "100px",
      paddingTop: "10px",
      [theme.breakpoints.down(600)]: {
        display: "grid",
        paddingLeft: "10px",
        paddingTop: "50px",
      },
    },
    app_body: {
      backgroundColor: "white",

      width: "250%",
      borderRadius: "10px",
      [theme.breakpoints.down(600)]: {
        width: "180%",
      },
    },
    head: {
      margin: "40px",
    },
    sum: {
      [theme.breakpoints.down(600)]: {
        justifyContent: "center",
        marginLeft: "340px",

        marginTop: "10%",
      },
    },
    colored: {
      color: "#388e3c",
      fontSize: "1.2rem",
    },
    flexed: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "7%",
      paddingLeft: "19%",
      [theme.breakpoints.down(1400)]: {
        paddingTop: "7%",
        paddingLeft: "22%",
      },
      [theme.breakpoints.down(1200)]: {
        paddingTop: "7%",
        paddingLeft: "25%",
      },
      [theme.breakpoints.down(1000)]: {
        paddingTop: "7%",
        paddingLeft: "27%",
      },
      [theme.breakpoints.down(930)]: {
        paddingTop: "9%",
        paddingLeft: "30%",
      },
      [theme.breakpoints.down(830)]: {
        paddingTop: "10%",
        paddingLeft: "33%",
      },
      [theme.breakpoints.down(750)]: {
        paddingTop: "12%",
        paddingLeft: "35%",
      },
      [theme.breakpoints.down(700)]: {
        paddingTop: "14%",
        paddingLeft: "39%",
      },
      [theme.breakpoints.down(650)]: {
        paddingTop: "15%",
        paddingLeft: "43%",
      },
      [theme.breakpoints.down(650)]: {
        paddingTop: "20%",
        paddingLeft: "3%",
      },
    },
    mobile: {
      marginTop: 0,
    },
  })
);

interface Props {
  window?: () => Window;
}

export default function AdminDrawer(props: Props) {
  let pass = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(pass);
  let user = decoded.allUser.name;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.flexed}>
          <h2>
            <span>
              <strong> Welcome To Fintrack, </strong>
            </span>
            <span className={classes.colored}>{user}.</span>
          </h2>
        </div>
        <div className={classes.app}>
          <div className={classes.app_body}>
            <h1 className={classes.head}>Requests</h1>
            <Tables />
          </div>

          <div className={classes.sum}>
            <Summary />
          </div>
        </div>
        <Sidebar />
        <Navbar />
      </main>
    </div>
  );
}
