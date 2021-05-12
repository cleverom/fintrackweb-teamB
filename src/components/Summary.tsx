import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Divider from "@material-ui/core/Divider";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginTop: 55,

      paddingLeft: "70px",
      width: "260px",
      [theme.breakpoints.down(600)]: {
        width: "350px",
      },
    },
    header: {
      [theme.breakpoints.down(600)]: {
        display: "flex",
        justifyContent: "center",
      },
    },
    listh1: {
      fontSize: "15px",
      color: "grey",
      fontWeight: 600,
      [theme.breakpoints.down(600)]: {
        fontSize: "50px",
        marginRight: "280px",
      },
    },
    listh2: {
      fontSize: "25px",
      fontWeight: 800,
      [theme.breakpoints.down(600)]: {
        fontSize: "50px",
      },
    },
    req: {
      fontSize: "12px",
      fontWeight: 800,
      color: "grey",
      [theme.breakpoints.down(600)]: {
        fontSize: "20px",
      },
    },
    edu: {
      fontSize: "12px",
      fontWeight: 800,
      marginTop: "40px",
      marginBottom: "20px",
      [theme.breakpoints.down(600)]: {
        fontSize: "35px",
        marginRight: -300,
      },
    },
    div: {
      width: "90%",
      height: "5px",
      [theme.breakpoints.down(600)]: {
        width: "350%",
        height: "5px",
        marginLeft: -300,
      },
    },
    appr: {
      paddingLeft: "70px",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "250px",
        // paddingright: "920px",
      },
    },
    pend: {
      paddingLeft: "78px",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "270px",
      },
    },
    needs: {
      paddingLeft: "35px",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "150px",
      },
    },
    can: {
      paddingLeft: "70px",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "260px",
      },
    },
    other: {
      paddingLeft: "70px",
      [theme.breakpoints.down(600)]: {
        paddingLeft: "260px",
      },
    },
    summail: {
      [theme.breakpoints.down(600)]: {
        marginLeft: -120,
      },
    },
  })
);

function Summary() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  let pass = document.cookie.split("=")[1];

  const getRequests = async () => {
    try {
      let response = await fetch("http://localhost:3000/userRequest", {
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
    async function myData4() {
      let datas: any = await getRequests();
      setData(datas.data);
      console.log(datas);
    }
    myData4();

  }, []);
  const total = data.length;

  function pending() {
    let pend = 0;
    data.map((row: Record<string, unknown>) => {
      if (row.status === "Pending") {
        pend++;
      }
    });
    let ans: any = (pend / total) * 100;
    ans = parseInt(ans);
    let final = `${ans}%`;
    return final;
  }

  function approval() {
    let appr = 0;
    data.map((row: Record<string, unknown>) => {
      if (row.status === "Approval") {
        appr++;
      }
    });
    let ans: any = (appr / total) * 100;
    ans = parseInt(ans);
    let final = `${ans}%`;
    return final;
  }

  function needsaprove() {
    let needs = 0;
    data.map((row: Record<string, unknown>) => {
      if (row.status === "Needs Approval") {
        needs++;
      }
    });
    let ans: any = (needs / total) * 100;
    ans = parseInt(ans);
    let final = `${ans}%`;
    return final;
  }

  function resolve() {
    let res = 0;
    data.map((row: Record<string, unknown>) => {
      if (row.status === "Resolved") {
        res++;
      }
    });
    let ans: any = (res / total) * 100;
    ans = parseInt(ans);
    let final = `${ans}%`;
    return final;
  }

  function cancel() {
    let can = 0;
    data.map((row: Record<string, unknown>) => {
      if (row.status === "Canceled") {
      }
    });
    let ans: any = (can / total) * 100;
    ans = parseInt(ans);
    let final = `${ans}%`;
    return final;
  }

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <h1 className={classes.listh1}>SHORT SUMMARY</h1>
        <h2 className={classes.listh2}>
          {total}
          <span className={classes.req}>
            Request <MoreHorizIcon />
          </span>
        </h2>
      </div>
      <Divider variant="middle" className={classes.div} />
      <div className={classes.summail}>
        <li className={classes.edu}>
          Approved
          <span className={classes.appr}>{approval()}</span>
        </li>
        <li className={classes.edu}>
          Pending
          <span className={classes.pend}>{pending()}</span>
        </li>
        <li className={classes.edu}>
          Needs Approval
          <span className={classes.needs}>{needsaprove()}</span>
        </li>
        <li className={classes.edu}>
          Resolved
          <span className={classes.other}>{resolve()}</span>
        </li>
        <li className={classes.edu}>
          Canceled
          <span className={classes.can}>{cancel()}</span>
        </li>
      </div>
    </div>
  );
}

export default Summary;
