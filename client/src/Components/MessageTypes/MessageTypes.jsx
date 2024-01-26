import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const MessageTypes = ({ variant = "error", children }) => {
  const severity = variant === "error" ? "error" : variant === "warning" ? "warning" : variant === "info" ? "info" : "success"; // Map variant to valid severity

  return (
    <Alert severity={severity} style={{ fontSize: 20 }}>
      <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</AlertTitle>
      {children}
    </Alert>
  );
}

//<MessageTypes variant="error">
//<MessageTypes variant="warning">
//<MessageTypes variant="info">
//<MessageTypes variant="success">




export default MessageTypes;