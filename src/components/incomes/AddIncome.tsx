import { Box } from "@mui/system";
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
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { PayType } from "../../types/payType";
import IncomeService from "../../api/incomeService";
import { months } from "../constants/Months";

const AddIncome = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payType, setPayType] = useState("WEEKLY");

  const service = new IncomeService();

  const handleAdd = () => {};

  return (
    <>
      <MoneyButton onClickFunc={() => setOpen(true)} message={"Add Income"} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add an Income</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Income"
            type="text"
            fullWidth
            variant="standard"
            error={!name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Income Description"
            type="text"
            fullWidth
            variant="standard"
            error={!description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            select
            helperText="Income Description"
            margin="dense"
            id="name"
            label="Pay Type"
            type="text"
            fullWidth
            variant="standard"
            error={!payType}
            onChange={(e) => {
              setPayType(e.target.value);
              console.log(Object.keys(PayType));
            }}
          >
            {Object.values(PayType)
              .filter((key: any) => isNaN(key))
              .map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
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

export default AddIncome;
