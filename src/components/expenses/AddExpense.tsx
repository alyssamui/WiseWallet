import { Box } from "@mui/system";
import ExpenseCard from "./ExpenseCard";
import { color } from "../Home";
import MoneyButton from "../MoneyButton";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import dayjsConfig, { DATETIME_FORMAT } from "../../config/dayjsConfig";

interface AddExpenseProps {
  numExpenses: number;
}

const AddExpense = (props: AddExpenseProps) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const service = new ExpenseService();

  const categories = [
    {
      value: "food",
      label: "Food",
    },
    {
      value: "misc",
      label: "Misc",
    },
  ];

  const handleAdd = () => {
    setAmount(parseFloat(amount).toFixed(2));
    if (name && amount && category) {
      const expense = {
        title: name,
        type: category,
        amount: parseFloat(amount),
        createdAt: new dayjsConfig.Dayjs().format(),
      };
      console.log(props.numExpenses);
      console.log(expense);
      service.setExpense(props.numExpenses + 1, expense);
      setOpen(false);
    }
  };
  return (
    <>
      <IconButton sx={{ marginTop: 1 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add an Expense</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Expense"
            type="text"
            fullWidth
            variant="standard"
            error={!name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            select
            helperText="Please select the category"
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            error={!category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            fullWidth
            variant="standard"
            error={!amount}
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
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExpense;
