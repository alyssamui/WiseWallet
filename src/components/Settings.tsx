import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FeatureFlagService from "../api/FeatureFlagService";
import { goTo } from "react-chrome-extension-router";
import Home from "./Home";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpenseService from "../api/ExpenseService";

const featureFlagService = new FeatureFlagService();

const Settings = () => {
  const loadEvilOn = async () => {
    const evilOn = await featureFlagService.getState("EvilMode");
    if ((evilOn as any)["EvilMode"] === undefined) {
      featureFlagService.toggle("EvilMode", false);
      setEvilMode(false);
    } else {
      setEvilMode((evilOn as any)["EvilMode"] as boolean);
    }
  };
  const [evilMode, setEvilMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    loadEvilOn();
  }, []);

  const service = new ExpenseService();

  const optionStyle = {
    margin: "5%",
    bgcolor: evilMode ? "#de9292" : "#EEEAEC",
    borderRadius: "15px",
    padding: "5%",
    width: "80%",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        height: "600px",
        bgcolor: evilMode ? "#8e1b1b" : "white",
        color: evilMode ? "white" : "black",
      }}
    >
      <IconButton onClick={() => goTo(Home)} sx={{ padding: "5%" }}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          fontSize: 25,
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        Settings
      </Box>
      <Box sx={optionStyle}>
        <FormControlLabel
          control={
            <Switch
              checked={evilMode}
              onChange={() => {
                featureFlagService.toggle("EvilMode", !evilMode);
                setEvilMode(!evilMode);
              }}
              color="warning"
            />
          }
          label="Evil"
        />
      </Box>
      <Box sx={optionStyle}>
        <Button
          startIcon={<DeleteIcon />}
          sx={{ color: "red"}}
          onClick={() => {
            service.deleteAllExpenses();
            setOpenDeleteDialog(true);
          }}
        >
          Delete all Expenses
        </Button>
        <Dialog
          open={openDeleteDialog}
          keepMounted
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>{"Deleted All Expense Data"}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Settings;
