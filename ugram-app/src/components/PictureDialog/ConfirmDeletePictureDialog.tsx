import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';

type Props = {
  onDelete: () => any;
  onClose: () => any;
  id?: string;
  open: boolean;
};

function ConfirmDeletePictureDialog({ id, open, onDelete, onClose }: Props) {
  const handleAgree = () => {
    if (id) {
      client.delete('/posts/' + id, { withCredentials: true }).then(() => {
        onDelete();
        onClose();
      });
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { backgroundColor: appTheme.palette.background.default },
        }}
      >
        <DialogTitle sx={{ alignSelf: 'center' }}>
          Are you sure you want to delete your picture ?
        </DialogTitle>
        <DialogContent>
          <Typography>Clicking on agree will permantly delete your picture</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAgree}>
            Agree
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmDeletePictureDialog;
