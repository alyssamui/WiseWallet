import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import FeatureFlagService from "../api/FeatureFlagService";

const featureFlagService = new FeatureFlagService();

const Settings = () => {
  const loadEvilOn = async () => {
    const evilOn = await featureFlagService.getState("EvilMode");
    if((evilOn as any)["EvilMode"] === undefined) {
      featureFlagService.toggle("EvilMode", false);
      setEvilMode(false);
    } else {
      setEvilMode((evilOn as any)["EvilMode"] as boolean);
    }
  };
  const [evilMode, setEvilMode] = useState(false);

  useEffect(() => {
    loadEvilOn();
  }, [])

  return (
    <>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Switch checked = {evilMode} onChange={() => {
            featureFlagService.toggle("EvilMode", !evilMode);
            setEvilMode(!evilMode);
            }}/>} label="Evil" />
        </FormGroup>
      </Box>
    </>
  );
};

export default Settings;
