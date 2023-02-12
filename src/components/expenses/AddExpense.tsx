import { Box, maxHeight } from "@mui/system";
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
  Tooltip,
} from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import dayjsConfig, { DATETIME_FORMAT } from "../../config/dayjsConfig";
import CategoryService from "../../api/CategoryService";
import { Expense } from "../../types/expense";
import { DefaultCategories } from "../constants/DefaultCategories";

interface AddExpenseProps {
  numExpenses: number;
  setState: () => void;
}

const AddExpense = (props: AddExpenseProps) => {
  const [open, setOpen] = useState(false);

  const [nextId, setNextId] = useState(-1);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

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

      setNextId(await service.getNextId());
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(nextId);
  }, [nextId]);

  const handleAdd = () => {
    setAmount(parseFloat(amount).toFixed(2));
    if (name && amount && category) {
      const expense: Expense = {
        id: nextId,
        title: name,
        category: category,
        amount: parseFloat(amount),
        createdAt: dayjsConfig().format(),
      };
      service.setExpense(props.numExpenses + 1, expense);
      setOpen(false);

      // update parent
      props.setState();
      setAmount("");
      setNextId(nextId + 1);
    }
  };
  return (
    <>
      <Tooltip title="Add an Expense" arrow>
        <IconButton sx={{ marginTop: 1 }} onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
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
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExpense;
