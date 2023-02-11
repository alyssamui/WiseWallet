import React from "react";
import {
  Box,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";

const Settings = () => {
  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={<Switch 
            onChange={() => {killmode()}}
            defaultChecked />}
          label="Super serious mode >:)"
        />
        {/* <FormControlLabel control = {<Switch defaultChecked />} label = "Super serious mode >:)" /> */}
      </FormGroup>
    </Box>
  );
};

function killmode() {
  
}

export default Settings;
