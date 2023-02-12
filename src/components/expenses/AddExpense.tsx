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
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import ExpenseService from "../../api/ExpenseService";
import dayjsConfig, { DATETIME_FORMAT } from "../../config/dayjsConfig";
import CategoryService from "../../api/CategoryService";
import { Expense } from "../../types/expense";
import { DefaultCategories } from "../constants/DefaultCategories";
import { months } from "../constants/Months";

interface AddExpenseProps {
  numExpenses: number;
  setState: () => void;
  setExpenseMonth: (n: number) => void;
  nextId: number;
  setNextId: (n: number) => void;
}

const AddExpense = (props: AddExpenseProps) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const [nameError, setNameError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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

      props.setNextId(await service.getNextId());
    };
    getData();
  }, []);

  const resetErrors = () => {
    setNameError(false);
    setAmountError(false);
    setCategoryError(false);
  };

  const handleAdd = async () => {
    setAmount(parseFloat(amount).toFixed(2));

    if (!name || name.length > 20) {
      setNameError(true);
    }
    if (!amount || amount.length > 20) {
      setAmountError(true);
    }
    if (!category) {
      setCategoryError(true);
    }

    if (
      name &&
      name.length <= 20 &&
      amount &&
      amount.length <= 20 &&
      category
    ) {
      resetErrors();
      const expense: Expense = {
        id: props.nextId,
        title: name,
        category: category,
        amount: parseFloat(amount),
        createdAt: dayjsConfig().format(),
      };
      await service.setExpense(props.numExpenses, expense);
      setOpen(false);

      // update parent
      setAmount("");
      props.setNextId(props.nextId + 1);
      props.setState();
    }
  };
  return (
    <>
      <Select
        defaultValue={months[new Date().getMonth()]}
        id="month"
        label="Selected Month"
        type="text"
        fullWidth
        variant="standard"
        MenuProps={{ PaperProps: { sx: { maxHeight: "50%" } } }}
        onChange={(e) => {
          const monthNum = months.indexOf(e.target.value);
          console.log("setmonthnum", monthNum);
          props.setExpenseMonth(monthNum);
        }}
        sx={{
          marginRight: -10,
          maxWidth: "40%",
        }}
      >
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <Tooltip title="Add an Expense" arrow placement="top">
        <IconButton
          sx={{ marginTop: 1, marginRight: -2 }}
          onClick={() => setOpen(true)}
        >
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
            helperText={"Please enter an expense name (max 20 characters long)"}
            id="name"
            label="Expense"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
          <TextField
            required
            error={categoryError}
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
            error={amountError}
            required
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            helperText={"Please enter an amount (max 20 characters long)"}
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
