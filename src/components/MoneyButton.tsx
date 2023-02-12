import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import WebFont from "webfontloader";
import Settings from "./Settings";
import "./Home.css";
import { Function } from "@babel/types";
import { color, darkerColor } from "./Home";

interface MoneyButtonProps {
  message: string;
  onClickFunc: (values: any) => void;
}

const MoneyButton = (props: MoneyButtonProps) => {
  return (
    <Button
      onClick={props.onClickFunc}
      sx={{
        padding: "3%",
        color: "white",
        bgcolor: color,
        boxShadow: 5,
        ":hover": { bgcolor: darkerColor },
      }}
    >
      {props.message}
    </Button>
  );
};

export default MoneyButton;
