import Snackbar from '@mui/material/Snackbar';

export default function MySnackBar({ open, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      message={message}
    />
  );
}