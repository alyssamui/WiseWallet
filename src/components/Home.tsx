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
import AddExpense from "./expenses/AddExpense";
import AddIncome from "./incomes/AddIncome";
import EditBudget from "./budget/EditBudget";
import Budget from "./budget/Budget";

export const color = "#B79bd6";
export const darkerColor = "#8F73AF";

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
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background: "white",
          position: "sticky",
        }}
      >
        <Box
          className="top"
          sx={{
            flexDirection: "column",
            background: color,
            borderBottomRightRadius: "3rem",
            position: "sticky",
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
          <Budget />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "5%",
            }}
          >
            <AddIncome />
            <EditBudget />
          </Box>
        </Box>
      </Box>
      <Expenses />
    </Box>
  );
};

export default Home;
