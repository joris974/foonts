import React from "react";
import { Button, Typography } from "@mui/material";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function LoadError({ message, onRetry }: Props) {
  return (
    <div className="text-center" role="alert">
      <Typography color="error" gutterBottom>
        {message}
      </Typography>
      <Button variant="outlined" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
