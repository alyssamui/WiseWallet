import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box, shadows } from "@mui/system";
import { color, darkerColor } from "../Home";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import { DefaultCategories } from "../constants/DefaultCategories";
import { Expense } from "../../types/expense";
import CategoryService from "../../api/CategoryService";

interface ExpenseCardProps {
  id: number;
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
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(props.title);
  const [amount, setAmount] = useState(props.amount.toString());
  const [category, setCategory] = useState(props.category);
  const [categories, setCategories] = useState<string[]>([]);

  const ref = useRef<any>();
  const service = new ExpenseService();
  const categoryService = new CategoryService();

  useEffect(() => {
    // INITIALIZE CATEGORIES
    const getData = async () => {
      let response = await categoryService.getCategories();
      if (response) {
        DefaultCategories.forEach((c) => {
          if (!response.includes(c)) {
            response = [...response, c];
          }
        });
      } else {
        setCategories(DefaultCategories);
      }
      setCategories(response);
    };
    getData();
  }, []);

  const editExpenseCard = () => {
    const expense: Expense = {
      id: props.id,
      title: name,
      category: category,
      amount: parseFloat(amount),
      createdAt: props.date,
    };
    service.setExpense(props.id, expense);
  };

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
          onClick={() => setOpen(true)}
        >
          <Edit sx={{ fontSize: "1rem" }} />
        </IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit the Expense</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              defaultValue={props.title}
              margin="dense"
              id="name"
              label="Expense"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              select
              defaultValue={props.category}
              helperText="Please select the category"
              margin="dense"
              id="name"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              style={{ maxHeight: "50%" }}
              onChange={(e) => setCategory(e.target.value)}
              SelectProps={{
                MenuProps: { PaperProps: { sx: { maxHeight: "50%" } } },
              }}
            >
              {categories
                ? categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))
                : DefaultCategories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
            </TextField>
            <TextField
              required
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              defaultValue={props.amount}
              value={amount}
              fullWidth
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{
                step: 0.5,
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setOpen(false);
                editExpenseCard();
              }}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
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
