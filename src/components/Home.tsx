import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import WebFont from "webfontloader";
import Settings from "./Settings";
import './Home.css';


function Home() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Julee']
      }
    })
  }, []);
  return (
    <Box className="Home font-loader" sx={{ flexDirection: "row" }}>
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
