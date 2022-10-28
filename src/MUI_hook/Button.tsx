import * as React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

interface childrenType {
  children: String;
  handler: () => void;
}
const useStyles = makeStyles(() => ({
  root: {
    background: "linear-gradient(45deg, #ffffff 30%, #ffffff)",
    border: 0,
    boxShadow: "0px 0px 82px -21px #ffffffbf",
    color: "#3a776c !important",
    height: 40,
    width: 100,
    margin: "30px 0px 0px 0px !important",
  },
}));

const CustomButton: React.FC<childrenType> = ({ children, handler }) => {
  const classes = useStyles();
  return (
    <Button
      size="large"
      onClick={() => {
        handler();
      }}
      className={classes.root}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
