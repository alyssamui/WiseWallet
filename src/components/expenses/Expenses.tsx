import { Box } from "@mui/system";
import ExpenseCard from "./ExpenseCard";
import { color } from "../Home";
import AddExpense from "./AddExpense";
import { useEffect, useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import dayjsConfig, { DATETIME_FORMAT } from "../../config/dayjsConfig";

interface ExpensesProps {
  loadBudget: () => {};
}

const Expenses = (props: ExpensesProps) => {
  const [expenses, setExpenses] = useState<any>([]);
  const service = new ExpenseService();
  const [expenseMonth, setExpenseMonth] = useState(dayjsConfig().month());
  const [nextId, setNextId] = useState(-1);

  const getData = async () => {
    const response = await service.getExpensesByMonth(expenseMonth);
    setExpenses(response);
    props.loadBudget();
  };

  useEffect(() => {
    getData();
  }, [expenseMonth]);

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
          }}
        >
          <Box
            sx={{ textDecorationLine: "underline", textDecorationColor: color }}
          >
            Expenses
          </Box>
          <AddExpense
            numExpenses={-1}
            setState={getData}
            setExpenseMonth={setExpenseMonth}
            nextId={nextId}
            setNextId={setNextId}
          />
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
              return (
                <ExpenseCard
                  setState={getData}
                  id={expense.id}
                  title={expense.title}
                  category={expense.category}
                  amount={expense.amount}
                  date={dayjsConfig(expense.createdAt).format(DATETIME_FORMAT)}
                  nextId={nextId}
                  setNextId={setNextId}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
};

export default Expenses;
