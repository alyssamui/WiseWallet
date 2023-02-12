import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BudgetService from "../../api/BudgetService";
import { color } from "../Home";

interface BudgetProps {
  loadBudget: () => {};
  currBudget: number;
  budgetLimit: number;
}

const Budget = (props: BudgetProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        margin: "5%",
        marginTop: 0,
        overflow: "hidden",
        padding: "10px",
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        color: "white",
        fontWeight: "bold",
      }}
    >
      <Box sx={{ fontSize: 30 }}>Remaining Budget:</Box>
      <Box sx={{ fontSize: 30 }}>
        $
        {isNaN(props.currBudget)
          ? 0
          : parseFloat(props.currBudget.toString()).toFixed(2)}
      </Box>
      <Box sx={{ fontSize: 20 }}>Spending Limit: ${props.budgetLimit}</Box>
    </Box>
  );
};

export default Budget;
