import { Alert, Backdrop, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../components/AuthContext/AuthContext';

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .catch(() => navigate('/'))
      .then(() => navigate('/login'));
  }, []);

  return (
    <Backdrop sx={{ color: '#ccc', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <Alert
        severity="success"
        iconMapping={{
          success: <CircularProgress />,
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography ml={2}>Logging out ...</Typography>
      </Alert>
    </Backdrop>
  );
}

export default Logout;
