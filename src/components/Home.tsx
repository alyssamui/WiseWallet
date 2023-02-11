import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import WebFont from "webfontloader";
import Settings from "./Settings";
import "./Home.css";
import SettingsIcon from "@mui/icons-material/Settings";
import MoneyButton from "./MoneyButton";
import IncomeService, { PayType } from "../api/incomeService";

const Home = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Ubuntu"],
      },
    });
  }, []);

  return (
    <Box
      className="Home font-loader"
      sx={{
        flex: 3,
        flexDirection: "column",
        background: "#cb8080",
      }}
    >
      <Box
        className="header"
        sx={{ display: "flex", flexDirection: "row-reverse" }}
      >
        <IconButton
          onClick={() => {
            console.log("CLICKED");
            goTo(Settings);
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          borderRadius: "16px",
          background: "linear-gradient(145deg, #d98989, #b77373);",
          margin: "5%",
          overflow: "hidden",
          padding: "10px",
          boxShadow: "32px 32px 65px #ad6d6d, -32px -32px 65px #e99393;",
        }}
      >
        <Box sx={{ fontSize: 25, color: "white" }}>Current Budget:</Box>
        <Box sx={{ fontSize: 20, color: "white" }}>$</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MoneyButton onClickFunc={() => {IncomeService.setIncome(1, {title : "test", type : PayType.Weekly, amount : 10.00})}} message={"Add Income"} />
        <MoneyButton onClickFunc={() => {}} message={"Add Expense"} />
      </Box>
    </Box>
  );
};

export default Home;
