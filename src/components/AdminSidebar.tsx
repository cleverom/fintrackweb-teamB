import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ReceiptIcon from "@material-ui/icons/Receipt";
import LockIcon from "@material-ui/icons/Lock";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelineIcon from "@material-ui/icons/Timeline";
import UpdateIcon from "@material-ui/icons/Update";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import jwtdecode from "jwt-decode";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: "#262737",
      width: drawerWidth,
      color: "white",
    },
    image: {
      margin: "40px",
    },
    content: {
      marginTop: 20,
    },
    icon: {
      color: "white",
      marginLeft: 20,
    },
    head: {
      margin: "40px",
    },
    dashboard: {
      display: "flex",
      color: "white",
    },
    // dashboard : active{
    //    color: "white",
    // }

    dashIcon: {
      marginRight: "20px",
    },
  })
);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Props {
  window?: () => Window;
}

function AdminSidebar(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let pass = document.cookie.split("=")[1];
  let decoded: any = jwtdecode(pass);

  let role = decoded.allUser.role;
  function logOutHandler() {
    const name = document.cookie.split("=")[0];
    if (name) {
      document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <img
        className={classes.image}
        src="https://decagon-clever.netlify.app/img/logo-white.svg"
      ></img>

      {role === "admin" ? (
        <List className={classes.content}>
          {[
            "Admin Dashboard",
            "Analytics",
            "Create Request",
            "Update User",
            "Logout",
          ].map((text, index) => (

            <ListItem button key={text}>
              <ListItemIcon className={classes.icon}>
                {text == "Admin Dashboard" ? (
                  <Link
                    to="/admin"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <DashboardOutlinedIcon className={classes.dashIcon} />
                      <ListItemText primary={text} />
                    </StyledMenuItem>
                  </Link>
                ) : text == "Analytics" ? (
                  <Link
                    to="/analytics"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <TimelineIcon className={classes.dashIcon} />
                      <ListItemText primary={text} />
                    </StyledMenuItem>
                  </Link>
                ) : text == "Create Request" ? (
                  <Link
                    to="/adminrequest"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <ReceiptIcon className={classes.dashIcon} />
                      <ListItemText primary={text} />
                    </StyledMenuItem>
                  </Link>
                ) : text == "Update User" ? (
                  <Link
                    to="/update"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <UpdateIcon className={classes.dashIcon} />
                      <ListItemText primary={text} />
                    </StyledMenuItem>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className={classes.dashboard}
                    style={{ textDecoration: "none", marginLeft: "15px" }}
                    onClick={()=>logOutHandler()}
                  >
                    <LockIcon className={classes.dashIcon} />
                    <ListItemText primary={text} />
                  </Link>
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      ) : role === "user" ? (
        <List className={classes.content}>
          {["Dashboard", "Create Request", "Logout"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={classes.icon}>
                {text == "Dashboard" ? (
                  <Link
                    to="/user"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <DashboardOutlinedIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                ) : text == "Create Request" ? (
                  <Link
                    to="/request"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <ReceiptIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className={classes.dashboard}
                    onClick={logOutHandler}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <LockIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                )}
              </ListItemIcon>
            </ListItem>
          ))}
          </List>):
          (<List className={classes.content}>
          {["Dashboard", "Create Request", "Logout"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={classes.icon}>
                {text == "Dashboard" ? (
                  <Link
                    to="/agent"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <DashboardOutlinedIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                ) : text == "Create Request" ? (
                  <Link
                    to="/adminrequest"
                    className={classes.dashboard}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <ReceiptIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className={classes.dashboard}
                    onClick={logOutHandler}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledMenuItem>
                      <LockIcon className={classes.dashIcon} />
                      <ListItemText primary={text}></ListItemText>
                    </StyledMenuItem>
                  </Link>
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default AdminSidebar;
