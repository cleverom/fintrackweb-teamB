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
import cancelled from "../images/undraw_access_denied_re_awnf.svg";

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
  },
  container: {
    backgroundColor: "#f2f6fa",
  },
  header: {
    alignSelf: "flex-end",
  },
  smallCard: {
    maxWidth: 235,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  largeCard: {
    maxWidth: 510,
  },
  gridTile: {
    minHeight: 350,
  },
  h6: {
    fontWeight: "bold",
    marginTop: "25px",
  },
  media: {
    height: "100px",
    width: "100px",
  },
});
class Admin extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: "",
      cost: [],
      allRequestInfo: [
        { request: "Loan" },
        { request: "Refund" },
        { request: "Invoice" },
        { request: "Upfront" },
        { request: "Stipends" },
        { request: "Others" },
      ],
      data: {},
      chartData: {},
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
      const response = await fetch("https://fintrackbteam.herokuapp.com/allRequest", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + pass,
        },
      });
      console.log(response);
      const json = await response.json();
      console.log(json);

      this.setState({ data: json });
      const amounts = this.state.allRequestInfo.map((allReq) => {
        return {
          ...allReq,
          amount: this.calculateAmount(allReq.request),
        };
      });
      this.setState({
        allRequestInfo: amounts,
      });
      this.getChartData();
    } catch (err) {
      console.error(err);
    }
  }

  getChartData = () => {
    let cost: any = [];
    this.state.allRequestInfo.map((allReq) => {
      if (allReq.title != "Requests") {
        cost.push(allReq.amount);
      }
    });
    const chart = {
      labels: ["Loan", "Refund", "Invoice", "Upfront", "Stipends", "Others"],
      datasets: [
        {
          label: "Type",
          data: cost,
          backgroundColor: [
            "#FAD02C",
            "#0000FF",
            "#000C66",
            "#050A30",
            "#7EC8E3",
          ],
          borderColor: ["#CDA776", "#989898", "#CB252B", "#E39371", "#1D7A46"],
          borderWidth: [1, 1, 1, 1, 1],
        },
      ],
    };
    this.setState({ chartData: chart });

    console.log(this.state.chartData);
  };

  calculateAmount = (value: any) => {
    const allData = this.state.data;
    console.log(allData.data);
    if (value === "Requests") {
      return allData.data.length;
    } else {
      const amountType = allData.data.filter(
        (item: any) => item.request.toLowerCase() == value.toLowerCase()
      );
      console.log(amountType)
      return amountType.length;
    }
  };

  render() {
    console.log(this.state.chartData);
    const { allRequestInfo } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridListTile className={classes.gridTile} cols={2}>
          <Card className={`${classes.root} ${classes.largeCard}`}>
            <CardContent>
              <Typography variant="h6" className={classes.h6}>
                <Doughnut
                  data={this.state.chartData}
                  options={{
                    title: {
                      display: true,
                      text: "Request Type",
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
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
