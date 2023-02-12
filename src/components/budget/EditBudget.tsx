import MoneyButton from "../MoneyButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";

import BudgetService from "../../api/BudgetService";

interface EditBudgetProps {
  loadBudget: () => {};
  budgetLimit: number;
}

const EditBudget = (props: EditBudgetProps) => {
  const [open, setOpen] = useState(false);

  const [budget, setBudget] = useState(props.budgetLimit.toString());

  const service = new BudgetService();

  const handleEdit = () => {
    service.editBudget(Number(parseFloat(budget).toFixed(2)));
    setOpen(false);
    props.loadBudget();
  };

  return (
    <>
      <MoneyButton
        onClickFunc={() => setOpen(true)}
        message={"Edit Spending Limit"}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Spending Limit</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="budget"
            label="Budget"
            type="number"
            value={budget}
            fullWidth
            variant="standard"
            error={!budget}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            inputProps={{
              step: 0.5,
            }}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditBudget;
