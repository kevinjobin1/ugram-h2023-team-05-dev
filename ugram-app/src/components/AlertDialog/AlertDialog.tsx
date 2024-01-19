import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';

type UserProfileDialogProps = {
  open: boolean;
  onClose: () => any;
};

function AlertDialog(props: UserProfileDialogProps) {
  const navigate = useNavigate();
  const handleAgree = async () => {
    await client.delete('/account', { withCredentials: true });
    sessionStorage.removeItem('userId');
    navigate('/');
    props.onClose();
    window.location.reload();
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
          sx: { backgroundColor: appTheme.palette.background.default },
        }}
      >
        <DialogTitle sx={{ alignSelf: 'center' }}>
          Are you sure you want to delete your account ?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Clicking on agree will permantly delete your account, pictures and anything
            associated with your account.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAgree}>
            Agree
          </Button>
          <Button onClick={props.onClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;
