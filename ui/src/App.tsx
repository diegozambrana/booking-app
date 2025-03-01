import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Typography } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <Button
        onClick={() => setCount((count) => count + 1)}
        color="primary"
        variant="contained"
      >
        count is {count}
      </Button>
    </div>
  );
}

export default App;
