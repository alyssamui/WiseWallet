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
  TextField,
} from "@mui/material";
import { useState } from "react";

import BudgetService from "../../api/BudgetService";

interface EditBudgetProps {
  loadBudget: () => {};
}

const EditBudget = (props: EditBudgetProps) => {
  const [open, setOpen] = useState(false);

  const [budget, setBudget] = useState("");

  const service = new BudgetService();

  const handleEdit = () => {
    service.editBudget(parseFloat(budget));
    setOpen(false);
    props.loadBudget();
  };

  return (
    <>
      <MoneyButton onClickFunc={() => setOpen(true)} message={"Edit Budget"} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Budget</DialogTitle>
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
            onChange={(e) => setBudget(e.target.value)}
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
