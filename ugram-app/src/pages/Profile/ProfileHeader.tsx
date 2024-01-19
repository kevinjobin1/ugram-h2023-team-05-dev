import { DeleteForever } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';

import appTheme from '../../styles/theme';
import { Profile } from '../../types/User';

type Props = {
  profile: Profile | undefined;
  handleOpenProfilePictureDialog: () => void;
  handleOpenUserProfileDialog: () => void;
  handleOpenAlertDialog: () => void;
  isCurrentUser: boolean;
};

export default function ProfileHeader({
  profile,
  handleOpenProfilePictureDialog,
  handleOpenUserProfileDialog,
  handleOpenAlertDialog,
  isCurrentUser,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        rowGap: appTheme.spacing(2),
        columnGap: appTheme.spacing(2),
        alignItems: 'center',
        marginBottom: appTheme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '50px',
        }}
      >
        <Avatar
          onClick={handleOpenProfilePictureDialog}
          sx={{
            height: appTheme.spacing(18),
            width: appTheme.spacing(18),
            cursor: 'pointer',
          }}
          src={profile?.profilePicture}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            columnGap: { xs: appTheme.spacing(2), sm: appTheme.spacing(8) },
            marginBottom: appTheme.spacing(2),
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            {profile?.username}
          </Typography>
          {isCurrentUser && (
            <Box>
              <Stack direction="row">
                <Button
                  onClick={handleOpenUserProfileDialog}
                  size="small"
                  type="button"
                  color="secondary"
                  variant="outlined"
                  title="Edit profile"
                  sx={{
                    padding: '0 0',
                    minWidth: '100px',
                    fontSize: '0.8rem',
                  }}
                >
                  Edit profile
                </Button>
                <IconButton onClick={handleOpenAlertDialog}>
                  <DeleteForever
                    sx={{
                      color: 'grey',
                      height: appTheme.spacing(4),
                      width: appTheme.spacing(4),
                    }}
                  />
                </IconButton>
              </Stack>
            </Box>
          )}
          {!isCurrentUser && (
            <Box>
              <Button
                size="small"
                type="button"
                color="secondary"
                variant="outlined"
                title="Edit profile"
                sx={{
                  padding: '0 0',
                  minWidth: '100px',
                  fontSize: '0.8rem',
                }}
              >
                Follow
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            columnGap: { xs: appTheme.spacing(2), sm: appTheme.spacing(6) },
            marginBottom: appTheme.spacing(2),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: appTheme.spacing(2),
            }}
          >
            <Typography variant="h6">0</Typography>
            <Typography variant="body1" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: appTheme.spacing(2),
            }}
          >
            <Typography variant="h6">0</Typography>
            <Typography variant="body1" color="textSecondary">
              Following
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: appTheme.spacing(2),
            }}
          >
            <Typography variant="h6">{profile?.posts.length}</Typography>
            <Typography variant="body1" color="textSecondary">
              Posts
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            columnGap: appTheme.spacing(2),
            textAlign: 'justify',
          }}
        >
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profile?.name}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
