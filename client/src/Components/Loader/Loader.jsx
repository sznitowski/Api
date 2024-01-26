import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ size = 100 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}

export default Loader;
