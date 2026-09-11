import React from "react";
import { CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
      }}
    >
      <CircularProgress />
    </div>
  );
}
