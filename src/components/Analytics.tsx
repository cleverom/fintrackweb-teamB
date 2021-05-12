import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./AdminSidebar";
import AdminDetails from "./Admin-details";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f2f6fa",
      overflow: "scroll",
      [theme.breakpoints.down(700)]: {
        display: "flex",
        justifyContent: "center",
        padding: "30px",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: "#050A30",
      width: drawerWidth,
      color: "white",
    },
    app: {
      display: "flex",
      paddingLeft: "270px",
      paddingRight: "100px",
      paddingTop: "100px",
      [theme.breakpoints.down(1000)]: {
        display: "grid",
        paddingRight: "0px",
      },
      [theme.breakpoints.down(800)]: {
        display: "grid",
        paddingRight: "0px",
        paddingLeft: "250px",
      },
      [theme.breakpoints.down(600)]: {
        display: "grid",
        paddingRight: "0px",
        paddingTop: "220px",
        paddingLeft: "5px",
      },
    },
    content: {
      flexGrow: 1,
      justifyContent: "center",
    },
    head: {
      margin: "40px",
    },
  })
);
interface Props {
  window?: () => Window;
}
export default function AnalyticsDrawer(props: Props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.app}>
            <div >
              <AdminDetails />
            </div>
          </div>
          <Sidebar />
          <Navbar />
        </main>
      </div>
    );
}
