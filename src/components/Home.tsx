import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import WebFont from "webfontloader";
import Settings from "./Settings";
import "./Home.css";
import SettingsIcon from "@mui/icons-material/Settings";
import MoneyButton from "./MoneyButton";
import IncomeService from "../api/incomeService";
import { PayType } from "../types/payType";
import ExpenseService from "../api/ExpenseService";
import Expenses from "./expenses/Expenses";

export const color = "#f9bebe";
const Home = () => {
  const incomeService = new IncomeService();
  const expenseService = new ExpenseService();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Ubuntu"],
      },
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Box sx={{ background: "white" }}>
        <Box
          className="top"
          sx={{
            flexDirection: "column",
            background: color,
            borderBottomRightRadius: "3rem",
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
              borderRadius: "16px",
              background: "linear-gradient(145deg, #d98989, #b77373);",
              margin: "5%",
              overflow: "hidden",
              padding: "10px",
              boxShadow: 3,
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
              justifyContent: "space-evenly",
              padding: "5%",
            }}
          >
            <MoneyButton onClickFunc={() => {}} message={"Add Income"} />
            <MoneyButton onClickFunc={() => {}} message={"Add Expense"} />
          </Box>
        </Box>
      </Box>
      <Expenses />
    </Box>
  );
};

export default Home;
