import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import BudgetService from "../api/BudgetService";

export const color = "#B79bd6";
export const darkerColor = "#8F73AF";

const Home = () => {
  const incomeService = new IncomeService();
  const expenseService = new ExpenseService();

  const service = new BudgetService();
  const [currBudget, setCurrBudget] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Ubuntu"],
      },
    });
  }, []);

  const loadBudget = async () => {
    const budgetLeft = await service.calculateCurrentBudgetLeft();
    const budgetLimit = await service.getBudget();
    if (typeof budgetLeft === "number") {
      setCurrBudget(budgetLeft);
    }
    if (typeof budgetLimit === "number") {
      setBudgetLimit(budgetLimit);
    }
  };

  useEffect(() => {
    loadBudget();
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
            background: `linear-gradient(to right, ${color} , ${darkerColor})`,
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
          <Budget
            loadBudget={loadBudget}
            currBudget={currBudget}
            budgetLimit={budgetLimit}
          />
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
            <EditBudget loadBudget={loadBudget} budgetLimit={budgetLimit} />
          </Box>
        </Box>
      </Box>
      <Expenses loadBudget={loadBudget} />
    </Box>
  );
};

export default Home;
