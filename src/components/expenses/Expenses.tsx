import { Box } from "@mui/system";
import ExpenseCard from "./ExpenseCard";
import { color } from "../Home";

const Expenses = () => {
  return (
    <Box sx={{ background: color }}>
      <Box
        className="bottom"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          fontSize: 20,
          paddingTop: "5%",
          paddingLeft: "10%",
          background: "white",
          borderTopLeftRadius: "3rem",
        }}
      >
        Expenses
        <ExpenseCard
          title="boba"
          category="food"
          amount={1195.23}
          date={new Date()}
        />
      </Box>
    </Box>
  );
};

export default Expenses;
