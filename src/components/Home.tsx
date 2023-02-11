import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import { goTo } from "react-chrome-extension-router";
import Settings from "./Settings";

function Home() {
  return (
    <Box className="Home" sx={{ flexDirection: "row" }}>
      Home
      <Box className="header" sx={{ flexDirection: "row-reverse" }}>
        <Button
          onClick={() => {
            console.log("CLICKED");
            goTo(Settings);
          }}
        >
          Settings
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
