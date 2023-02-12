import { Box } from "@mui/system";
import ExpenseCard from "./ExpenseCard";
import { color } from "../Home";
import MoneyButton from "../MoneyButton";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AddExpense from "./AddExpense";
import { useEffect, useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import { Expense } from "../../types/expense";

const Expenses = () => {
  const [expenses, setExpenses] = useState<any>([]);
  const service = new ExpenseService();

  useEffect(() => {
    const getData = async () => {
      const response = await service.getAllExpenses();
      setExpenses(response);
      console.log("response", response);
    };
    getData();
  }, []);

  return (
    <Box>
      <Box sx={{ background: color }}>
        <Box
          className="bottom"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 20,
            padding: "10%",
            paddingTop: "5%",
            paddingBottom: "3%",
            background: "white",
            borderTopLeftRadius: "3rem",
            alignItems: "center",
          }}
        >
          Expenses
          <AddExpense numExpenses={expenses.length} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          paddingBottom: "3%",
          paddingTop: 0,
        }}
      >
        {expenses.length > 0
          ? expenses.map((expense: any) => {
              const e = Object.values(expense)[0] as Expense;
              console.log(e.createdAt);
              return (
                <ExpenseCard
                  title={e.title}
                  category={e.type}
                  amount={e.amount}
                  date={e.createdAt ? e.createdAt : ""}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
};

export default Expenses;
