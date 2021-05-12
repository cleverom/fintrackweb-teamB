import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import jwtdecode from "jwt-decode";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import wallet from "../images/wallet.png";
import pending from "../images/undraw_pending_approval_xuu9.svg";
import needsApproval from "../images/undraw_Payments_re_77x0.svg";
import approved from "../images/undraw_Order_confirmed_re_g0if.svg";
import resolved from "../images/undraw_wallet_aym5.svg";
import canceled from "../images/undraw_access_denied_re_awnf.svg";
import Ana from './Analytics-data'

interface State {
  user: string;
  allRequestInfo: any[];
  data: any;
  chartData: any;
  cost: any[];
}
interface Props {
  classes: any;
}
const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
    textAlign: "center",
    [theme.breakpoints.down(800)]: {
      width: "300%",
      // paddingLeft: "220px",
    },
  },
  container: {
    backgroundColor: "#f2f6fa",
    display: "flex",
    paddingLeft: "20px",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    alignSelf: "flex-end",
  },
  smallCard: {
    maxWidth: 235,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down(800)]: {
      minWidth: 250,
    },
  },
  largeCard: {
    // marginTop: "-10px",
    maxWidth: 510,
    [theme.breakpoints.down(800)]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.down(600)]: {
      maxWidth: "510px",
    },
  },
  gridTile: {
    minHeight: 350,
    display: "grid",
    marginRight: "10px",
    minWidth: "200px",
  },
  h6: {
    fontWeight: "bold",
    marginTop: "25px",
    
  },
  media: {
    height: "100px",
    width: "100px",
    marginTop: "25px"
  },
});
class Admin extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: "",
      cost: [],
      allRequestInfo: [
        { title: "Requests", imageUrl: wallet },
        { title: "Pending", imageUrl: pending },
        { title: "Needs approval", imageUrl: needsApproval },
        { title: "Approved", imageUrl: approved },
        { title: "Resolved", imageUrl: resolved },
        { title: "Canceled", imageUrl: canceled },
      ],
      data: {},
      chartData: {
        
      },
    };
  }

  async componentDidMount() {
    let pass = document.cookie.split("=")[1];
    let decoded: any = jwtdecode(pass);
    
    let user = decoded.allUser.name;
    let email = decoded.allUser.email;
    let emailextra = email.split(".");
    this.setState({
      user: user.split(" ")[0],
    });
    try {
      const response = await fetch("http://localhost:3000/allRequest", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + pass,
        },
      });
      const json = await response.json();
      this.setState({ data: json });
      const amounts = this.state.allRequestInfo.map((allReq) => {
        return {
          ...allReq,
          amount: this.calculateAmount(allReq.title)
        }
      })
      this.setState({
        allRequestInfo: amounts
      })
      this.getChartData()
    } catch (err) {
      console.error(err);
    }
  }

  getChartData = () => {
    let cost:any = [];
    this.state.allRequestInfo.map((allReq) => {
      if (allReq.title != "Requests") {
        cost.push(allReq.amount);
      }
    })
    const chart =  {
        labels: [
          "Pending",
          "Needs approval",
          "Approved",
          "Resolved",
          "Canceled",
        ],
        datasets: [
          {
            label: "Status",
            data: cost,
            backgroundColor: [
              "#DEB887",
              "#A9A9A9",
              "#DC143C",
              "#F4A460",
              "#2E8B57",
            ],
            borderColor: [
              "#CDA776",
              "#989898",
              "#CB252B",
              "#E39371",
              "#1D7A46",
            ],
            borderWidth: [1, 1, 1, 1, 1],
          },
        ],
      }
    this.setState({ chartData: chart });
    
    console.log(this.state.chartData)
    console.log(cost);
  }

  calculateAmount = (value: any) => {
    const allData = this.state.data;
    if (value === "Requests") {
      return allData.data.length;
    } else {
      const amountType = allData.data.filter(
        (item: any) => item.status.toLowerCase() === value.toLowerCase()
      );

      let amount = amountType.reduce((sum: any, next: { amount: any; }) => {
        
        return sum + next.amount;
      }, 0);
      amountType.amount = amount;

      return amount;
    }
  };
  render() {
    console.log(this.state.chartData);
    const { allRequestInfo } = this.state;
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <div>
          <h4>Hello {this.state.user}</h4>
          <p>Welcome to your dashboard</p>
        </div>
        <GridList cellHeight={250} cols={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {allRequestInfo.map((allReq, index) => {
            return (
              <GridListTile
                key={allReq.title}
                className={classes.gridTile}
                cols={1}
              >
                <Card className={`${classes.root} ${classes.smallCard}`}>
                  <CardMedia
                    className={classes.media}
                    image={allReq.imageUrl}
                    title="status"
                  />
                  <CardContent>
                    <Typography variant="h6" className={classes.h6}>
                      {index === 0
                        ? allReq.amount
                        : Number(allReq.amount).toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {allReq.title}
                    </Typography>
                  </CardContent>
                </Card>
              </GridListTile>
            );
          })}
          <GridListTile className={classes.gridTile} cols={2}>
            <Card className={`${classes.root} ${classes.largeCard}`}>
              <CardContent>
                <Typography variant="h6" className={classes.h6}>
                  <Doughnut
                    data={this.state.chartData}
                    options={{
                      title: {
                        display: true,
                        text: "Request Status",
                        fontSize: 14,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
            </Card>
          </GridListTile>
          <Ana />
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
