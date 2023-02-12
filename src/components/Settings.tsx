import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FeatureFlagService from "../api/FeatureFlagService";
import { goTo } from "react-chrome-extension-router";
import Home from "./Home";
import { bgcolor } from "@mui/system";
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
          sx={{ color: "red", ":hover": { bgcolor: "#8e1b1b" } }}
          onClick={() => {
            service.deleteAllExpenses();
          }}
        >
          Delete all Expenses
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
