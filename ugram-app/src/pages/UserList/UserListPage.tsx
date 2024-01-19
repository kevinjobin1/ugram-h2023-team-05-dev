import './UserListPage.css';

import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingBackdrop from '../../components/LoadingBackdrop/LoadingBackdrop';
import { NotificationContext } from '../../components/Notifications/NotificationContext';
import client from '../../modules/axios-client';
import { Profile } from '../../types/User';

function UserListPage() {
  const navigate = useNavigate();
  const navigateToProfilePage = (id: string) =>
    navigate('/users/' + id, { replace: true });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Profile[]>([]);
  const { setErrorMessage } = useContext(NotificationContext);

  useEffect(() => {
    setLoading(true);
    client
      .get('/profiles')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage('fetching profiles');
      });
  }, []);

  return (
    <div>
      <div className="members">
        <h2>Our newest members</h2>
      </div>
      <div className="images">
        <LoadingBackdrop loading={loading} />
        <Grid container justifyContent="center" spacing={2}>
          {users &&
            users.map((user) => {
              return (
                <Grid item key={user.userId}>
                  <Stack
                    onClick={() => navigateToProfilePage(user.userId)}
                    key={user.userId}
                    alignItems="center"
                    spacing={1}
                    direction="column"
                    sx={{
                      '&:hover': { cursor: 'pointer' },
                      background: '#444444db',
                      borderRadius: '5px',
                      padding: '10px',
                      maxWidth: '300px',
                      maxHeight: '300px',
                    }}
                  >
                    <Typography>{user.username}</Typography>
                    <Avatar
                      variant="rounded"
                      alt={user.name}
                      srcSet={
                        user.profilePicture == ''
                          ? user.posts[0]?.image.small.url ?? ''
                          : user.profilePicture
                      }
                      sx={{ width: '150px', height: '150px' }}
                      imgProps={{
                        sx: { objectFit: 'contain' },
                      }}
                    />
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default UserListPage;
