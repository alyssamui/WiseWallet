import { Button } from "@mui/material";
import "./Home.css";
import { color, darkerColor } from "./Home";

interface MoneyButtonProps {
  message: string;
  onClickFunc: (values: any) => void;
}

const MoneyButton = (props: MoneyButtonProps) => {
  return (
    <Button
      onClick={props.onClickFunc}
      sx={{
        padding: "3%",
        color: "white",
        bgcolor: color,
        boxShadow: 5,
        ":hover": { bgcolor: darkerColor },
      }}
    >
      {props.message}
    </Button>
  );
};

export default MoneyButton;
