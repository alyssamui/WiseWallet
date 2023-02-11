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
             />}
          label="Super serious mode >:)"
        />
        {/* <FormControlLabel control = {<Switch defaultChecked />} label = "Super serious mode >:)" /> */}
      </FormGroup>
    </Box>
  );
};

function killmode() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>{
    const activeTab : any = tabs[0];

    chrome.tabs.executeScript(activeTab.id, {
      code: `(() => {
        // Get the DOM of the page
        const pageDom = document;
  
        // Do something with the DOM
        console.log(pageDom.body.innerHTML);
      })()`
    })

  })
}

export default Settings;
