import React from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    select: {
      display: "flex",
    },
  })
);
export default function CustomizedSelects() {
  const classes = useStyles();
  const [search, setAge] = React.useState<string | number>("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="classes.select">
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Serach</InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">
            Select
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={search}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={10}>User</option>
            <option value={20}>Status</option>
            <option value={30}>Amount</option>
          </NativeSelect>
        </FormControl>
      </div>
    </div>
  );
}
