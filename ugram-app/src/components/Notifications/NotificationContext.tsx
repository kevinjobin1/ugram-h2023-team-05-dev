import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { createContext, SyntheticEvent, useContext, useEffect, useState } from 'react';

import { SocketClient } from '../../modules/socket-client';
import { fetchUserProfile } from '../../services/user.service.';
import { Comment, Like } from '../../types/Post';
import { Profile } from '../../types/User';
import { AuthContext } from '../AuthContext/AuthContext';

type NotificationContext = {
  setErrorMessage: (errorMessage: string | undefined) => void;
};

export const NotificationContext = createContext<NotificationContext>(null!);

export const NotificationContextProvider = ({ children }: any) => {
  const [error, setError] = useState(false);

  const setErrorMessage = (errorMessage?: string) => {
    setError(true);
    handleNotification(`There was an error : ${errorMessage}`);
  };

  async function onLikeReceived(like: Like) {
    setError(false);
    const profile = (await fetchUserProfile(like.userId)) as Profile;
    handleNotification(`${profile.username} liked your post.`);
  }

  async function onCommentReceived(comment: Comment) {
    setError(false);
    const profile = (await fetchUserProfile(comment.userId)) as Profile;
    handleNotification(`${profile.username} commented on your post.`);
  }

  const { user } = useContext(AuthContext);
  const [socketClient, setSocketClient] = useState<SocketClient>();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (user) {
      setSocketClient(new SocketClient({ onLikeReceived, onCommentReceived }));
    }
    return socketClient?.disconnect;
  }, [user]);

  function handleNotification(message: string) {
    setMessage(message);
    setOpen(true);
  }

  function handleClose(event: SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage('');
  }

  const CloseButton = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <NotificationContext.Provider value={{ setErrorMessage }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={4500}
        onClose={handleClose}
        action={CloseButton}
      >
        <Alert
          onClose={handleClose}
          severity={error ? 'error' : 'info'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};
