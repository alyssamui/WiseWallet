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
import dayjsConfig, { DATETIME_FORMAT } from "../../config/dayjsConfig";
import { months } from "../constants/Months";

interface ExpensesProps {
  loadBudget: () => {};
}

const Expenses = (props: ExpensesProps) => {
  const [expenses, setExpenses] = useState<any>([]);
  const service = new ExpenseService();
  const [expenseMonth, setExpenseMonth] = useState("");

  const getData = async () => {
    const response = await service.getExpensesByMonth(dayjsConfig().month());
    setExpenses(response);
    props.loadBudget();
  };

  useEffect(() => {
    getData();
  }, []);

  const month = months[new Date().getMonth()];

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
            paddingTop: 0,
            paddingBottom: 0,
            background: "white",
            borderTopLeftRadius: "3rem",
            alignItems: "center",
            textDecorationLine: "underline",
            textDecorationColor: color,
          }}
        >
          {month} Expenses
          <AddExpense numExpenses={expenses.length} setState={getData} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "5%",
          paddingBottom: "3%",
          paddingTop: 0,
        }}
      >
        {expenses.length > 0
          ? expenses.map((expense: any) => {
              console.log(expense);
              return (
                <ExpenseCard
                  setState={getData}
                  id={expense.id}
                  title={expense.title}
                  category={expense.category}
                  amount={expense.amount}
                  date={dayjsConfig(expense.createdAt).format(DATETIME_FORMAT)}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
};

export default Expenses;
