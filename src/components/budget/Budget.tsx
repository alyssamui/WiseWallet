import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BudgetService from "../../api/BudgetService";
import { color } from "../Home";

const Budget = () => {
  const service = new BudgetService();
  const [currBudget, setCurrBudget] = useState(0);

  const loadBudget = async () => {
    const budgetLeft = await service.calculateCurrentBudgetLeft();
    setCurrBudget(budgetLeft);
  };

  useEffect(() => {
    loadBudget();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        background: "white",
        margin: "5%",
        overflow: "hidden",
        padding: "10px",
        boxShadow: 1,
      }}
    >
      <Box sx={{ fontSize: 25, color: color }}>Current Budget:</Box>
      <Box sx={{ fontSize: 20, color: color }}>${currBudget}</Box>
    </Box>
  );
};

export default Budget;
