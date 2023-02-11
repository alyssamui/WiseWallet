import { Box } from "@mui/system";
import { color } from "../Home";

interface ExpenseCardProps {
  title: string;
  category: string;
  amount: number;
  date: Date;
}

const ExpenseCard = (props: ExpenseCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#EEEAEC",
        margin: "5%",
        marginLeft: 0,
        padding: "5%",
        borderRadius: "15px",
        boxShadow: 5,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box>{props.title}</Box>
      <Box>${props.amount}</Box>
    </Box>
  );
};

export default ExpenseCard;
