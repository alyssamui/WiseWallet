import { Box } from "@mui/system";
import ExpenseCard from "./ExpenseCard";
import { color } from "../Home";
import MoneyButton from "../MoneyButton";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AddExpense from "./AddExpense";

const Expenses = () => {
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Box sx={{ background: color }}>
        <Box
          className="bottom"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 20,
            padding: "10%",
            paddingBottom: 0,
            background: "white",
            borderTopLeftRadius: "3rem",
          }}
        >
          Expenses
          <AddExpense />
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
        <ExpenseCard
          title="boba"
          category="food"
          amount={1195.23}
          date={new Date()}
        />
        <ExpenseCard
          title="my rent"
          category=":("
          amount={15000.23}
          date={new Date()}
        />
        <ExpenseCard
          title="my rent"
          category=":("
          amount={15000.23}
          date={new Date()}
        />
        <ExpenseCard
          title="my rent"
          category=":("
          amount={15000.23}
          date={new Date()}
        />
      </Box>
    </Box>
  );
};

export default Expenses;
