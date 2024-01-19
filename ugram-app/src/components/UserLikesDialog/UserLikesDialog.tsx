import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';

interface Props {
  open: boolean;
  onClose: () => any;
  profiles?: Post['likers'];
}

export default function UserLikesDialog({ open, onClose, profiles }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ alignSelf: 'center', padding: '10px', fontSize: '15px' }}>
          Likes
        </DialogTitle>
        <Divider></Divider>
        <DialogContent sx={{ minWidth: '200px', minHeight: '200px' }}>
          {profiles != undefined &&
            profiles.map((profile) => {
              return (
                <Box
                  key={profile.userId}
                  sx={{
                    display: 'flex',
                    '&:hover': {
                      borderRadius: '1',
                      backgroundColor: appTheme.palette.secondary.dark,
                      cursor: 'pointer',
                    },
                    padding: '10px 20px',
                  }}
                  alignItems="center"
                  onClick={() => navigate('/users/' + profile.userId)}
                >
                  <Avatar src={profile.profilePicture}></Avatar>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {profile.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'grey',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      {profile.name}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </DialogContent>
      </Dialog>
    </>
  );
}
