import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BudgetService from "../../api/BudgetService";
import { color } from "../Home";

interface BudgetProps {
  loadBudget: () => {};
  currBudget: number;
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
        background: "white",
        margin: "5%",
        overflow: "hidden",
        padding: "10px",
        boxShadow: 1,
      }}
    >
      <Box sx={{ fontSize: 25, color: color }}>Current Budget:</Box>
      <Box sx={{ fontSize: 20, color: color }}>${props.currBudget}</Box>
    </Box>
  );
};

export default Budget;
