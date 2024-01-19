import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import React from 'react';

import { isFieldInError, mapFormError } from '../../modules/axios-client';
import { editUser } from '../../services/user.service.';
import appTheme from '../../styles/theme';
import { UserEdit } from '../../types/User';
import { formatDate } from '../../utils/date-utils';
import { AuthContext } from '../AuthContext/AuthContext';

type UserProfileDialogProps = {
  open: boolean;
  onClose: () => any;
};

function UserProfileDialog({ open, onClose }: UserProfileDialogProps) {
  const { user } = React.useContext(AuthContext);

  const [firstName, setName] = useState<string>(user?.name ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [phone, setPhone] = useState<string>(user?.phoneNumber ?? '');
  const [error, setError] = useState();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSave = () => {
    const userEdit: UserEdit = {
      name: firstName,
      email: email,
      phoneNumber: phone,
    };
    editUser(userEdit)
      .then(() => {
        onClose();
      })
      .catch((err) => setError(err));
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
        <DialogTitle sx={{ alignSelf: 'center' }}>{user?.username}</DialogTitle>
        <DialogContent>
          <Stack>
            <Avatar
              src={user?.profilePicture}
              sx={{ width: 170, height: 170, alignSelf: 'center', marginBottom: 3 }}
            />
            <TextField
              error={isFieldInError('name', error)}
              label="Name"
              value={firstName}
              fullWidth
              variant="standard"
              onChange={handleNameChange}
              helperText={mapFormError('name', error)}
            />
            <TextField
              error={isFieldInError('email', error)}
              label="Email"
              value={email}
              type="email"
              fullWidth
              variant="standard"
              margin="dense"
              onChange={handleEmailChange}
              helperText={mapFormError('email', error)}
            />
            <TextField
              error={isFieldInError('phoneNumber', error)}
              label="Phone"
              value={phone}
              fullWidth
              variant="standard"
              margin="dense"
              onChange={handlePhoneChange}
              helperText={mapFormError('phoneNumber', error)}
            />
            <Typography align="center" sx={{ marginTop: 3 }}>
              {user && user.creationDate
                ? `Profile created on ${formatDate(user?.creationDate)}`
                : ''}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserProfileDialog;
