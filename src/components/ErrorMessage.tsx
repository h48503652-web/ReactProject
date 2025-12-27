import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <Snackbar 
      open={!!message} 
      autoHideDuration={6000} // נעלם לבד אחרי 6 שניות
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // מיקום מרכזי עליון
    >
      <Alert 
        onClose={onClose} 
        severity="error" 
        variant="filled" 
        sx={{ width: '100%', boxShadow: 3 }}
      >
        <AlertTitle>שגיאה</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;