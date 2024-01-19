import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

export default function NotFound() {
  const navigate = useNavigate();
  const returnHome = useCallback(() => navigate('/', { replace: true }), [navigate]);
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        textAlign: 'center',
        rowGap: 3,
        backgroundColor: 'black',
      }}
    >
      <ErrorIcon sx={{ fontSize: 100, color: 'grey.A200' }} />
      <Typography variant="h4" sx={{ color: 'grey.A200' }}>
        Sorry, this page isn't available...
      </Typography>
      <Typography variant="h6" sx={{ color: 'grey.A200' }}>
        The link may be broken, or the page may have been removed.
      </Typography>
      <Button onClick={returnHome} variant="contained">
        Go back to Ugram
      </Button>
    </Paper>
  );
}
