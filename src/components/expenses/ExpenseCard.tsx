import { Box, shadows } from "@mui/system";
import { color } from "../Home";

interface ExpenseCardProps {
  title: string;
  category: string;
  amount: number;
  date: Date;
}

const expenseCardStyle = {
  display: "flex",
  flexDirection: "column",
  background: "#EEEAEC",
  margin: "5%",
  marginLeft: 0,
  padding: "5%",
  borderRadius: "15px",
  boxShadow: 10,
  fontSize: 15,
};

const displayStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const ExpenseCard = (props: ExpenseCardProps) => {
  return (
    <>
      <Box sx={expenseCardStyle}>
        <Box sx={displayStyle}>
          <Box sx={{ fontWeight: "500" }}>{props.title}</Box>
          <Box>${props.amount}</Box>
        </Box>
        <Box sx={displayStyle}>
          <Box>Category: {props.category}</Box>
          <Box>{props.date.toDateString()}</Box>
        </Box>
      </Box>
    </>
  );
};

export default ExpenseCard;
