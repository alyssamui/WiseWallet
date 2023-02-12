import { IconButton } from "@mui/material";
import { Box, shadows } from "@mui/system";
import { color, darkerColor } from "../Home";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";

interface ExpenseCardProps {
  title: string;
  category: string;
  amount: number;
  date: string;
}

const expenseCardStyle = {
  display: "flex",
  flexDirection: "column",
  background: "#EEEAEC",
  padding: "5%",
  margin: "5%",
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
  const [top, setTop] = useState(0);
  const [right, setRight] = useState(0);

  const ref = useRef<any>();

  useEffect(() => {
    setTop(ref.current ? ref.current.offsetTop : 0);
    setRight(ref.current ? ref.current.offsetRight : 0);
    console.log("top", top, "right", right);
    console.log("current", ref.current);
  }, []);

  const editExpenseCard = () => {};

  return (
    <>
      <Box sx={expenseCardStyle} ref={ref}>
        <IconButton
          sx={{
            background: color,
            ":hover": { background: darkerColor },
            alignSelf: "flex-end",
            marginTop: -4,
            marginRight: -4,
          }}
          onClick={editExpenseCard}
        >
          <Edit sx={{ fontSize: "1rem" }} />
        </IconButton>
        <Box sx={displayStyle}>
          <Box sx={{ fontWeight: "500" }}>{props.title}</Box>
          <Box>${props.amount}</Box>
        </Box>
        <Box sx={displayStyle}>
          <Box>Category: {props.category}</Box>
          <Box>{props.date}</Box>
        </Box>
      </Box>
    </>
  );
};

export default ExpenseCard;
