import {
  BookmarkBorder,
  GridOn,
  OndemandVideoOutlined,
  SellOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AlertDialog from '../../components/AlertDialog/AlertDialog';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import GridPicture from '../../components/GridPicture/GridPicture';
import LoadingBackdrop from '../../components/LoadingBackdrop/LoadingBackdrop';
import { NotificationContext } from '../../components/Notifications/NotificationContext';
import ProfilePictureDialog from '../../components/ProfilePictureDialog/ProfilePictureDialog';
import UserProfileDialog from '../../components/UserProfileDialog/UserProfileDialog';
import { fetchUserProfile } from '../../services/user.service.';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { Profile } from '../../types/User';
import { isValidUUID } from '../../utils/string-utils';
import NotFound from '../404/NotFound';
import ProfileHeader from './ProfileHeader';

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>();
  const [activeTab, setActiveTab] = useState(0);
  const [openUserProfileDialog, setOpenUserProfileDialog] = useState(false);
  const [openProfilePictureDialog, setOpenProfilePictureDialog] = useState(false);
  const [openAlerteDialog, setOpenAlerteDialog] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { setErrorMessage } = useContext(NotificationContext);
  const location = useLocation();

  const getUser = useCallback(async () => {
    setLoading(true);
    const userIdPath = location.pathname.slice(
      location.pathname.lastIndexOf('/') + 1,
      location.pathname.length,
    );

    if (!isValidUUID(userIdPath)) {
      setErrorMessage('Invalid user id');
      setLoading(false);
      return;
    }

    try {
      const fetchedProfile: Profile = await fetchUserProfile(userIdPath);
      if (fetchedProfile) setProfile(fetchedProfile);
      setLoading(false);
    } catch (error) {
      console.log(`Error fetching profile (userId=${userIdPath}): ${error}`);
      setLoading(false);
      setErrorMessage('Unable to fetch user profile');
    }
  }, [location.pathname, setErrorMessage]);

  useEffect(() => {
    getUser();
  }, [location, getUser]);

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCloseUserProfileDialog = () => {
    setOpenUserProfileDialog(false);
    getUser();
  };

  const handleCloseProfilePictureDialog = () => {
    setOpenProfilePictureDialog(false);
    getUser();
  };

  const handleCloseAlertDialog = () => {
    setOpenAlerteDialog(false);
  };

  if (!profile?.userId) return <NotFound />;

  return (
    <>
      <LoadingBackdrop loading={loading} />
      <UserProfileDialog
        open={openUserProfileDialog}
        onClose={handleCloseUserProfileDialog}
        key={profile?.userId}
      />
      <ProfilePictureDialog
        open={openProfilePictureDialog}
        onClose={handleCloseProfilePictureDialog}
        imageSource={profile?.profilePicture}
        isOwner={isAuthenticated(profile?.userId)}
        userId={profile?.userId}
        key={profile?.profilePicture}
      />
      <AlertDialog open={openAlerteDialog} onClose={handleCloseAlertDialog} />
      <Paper
        sx={{
          backgroundColor: appTheme.palette.background.default,
          ml: appTheme.spacing(2),
          mr: appTheme.spacing(2),
        }}
      >
        <ProfileHeader
          profile={profile}
          handleOpenProfilePictureDialog={() => setOpenProfilePictureDialog(true)}
          handleOpenUserProfileDialog={() => setOpenUserProfileDialog(true)}
          handleOpenAlertDialog={() => setOpenAlerteDialog(true)}
          isCurrentUser={isAuthenticated(profile?.userId)}
        />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="secondary"
          centered
          sx={{
            borderTop: `1px solid ${appTheme.palette.divider}`,

            '& .MuiTab-root': {
              '& .MuiSvgIcon-root': {
                height: appTheme.spacing(2),
                width: appTheme.spacing(2),
              },
            },

            '& .Mui-selected': {
              color: 'white',
            },

            '& .MuiTabs-indicator': {
              backgroundColor: appTheme.palette.text.primary,
              top: '0px',
            },
          }}
        >
          <Tab label="Posts" icon={<GridOn />} iconPosition="start" />
          <Tab label="Reel" icon={<OndemandVideoOutlined />} iconPosition="start" />
          <Tab label="Saved" icon={<BookmarkBorder />} iconPosition="start" />
          <Tab label="Tagged" icon={<SellOutlined />} iconPosition="start" />
        </Tabs>
        <Box>
          {activeTab === 0 &&
            ((profile && profile.posts.length > 0 && (
              <Grid
                container
                spacing={1}
                sx={{
                  marginTop: appTheme.spacing(2),
                  marginBottom: appTheme.spacing(2),
                }}
                justifyContent="center"
              >
                {profile.posts.map((p) => (
                  <Grid item key={p.id}>
                    <GridPicture
                      post={p}
                      onDelete={getUser}
                      onEdit={getUser}
                      onLike={getUser}
                      onComment={getUser}
                    ></GridPicture>
                  </Grid>
                ))}
              </Grid>
            )) || (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  rowGap: appTheme.spacing(2),
                  marginTop: appTheme.spacing(2),
                  width: '100%',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: appTheme.palette.background.paper,
                    color: appTheme.palette.background.default,
                    width: appTheme.spacing(10),
                    height: appTheme.spacing(10),
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Posts
                </Typography>
                <Typography variant="body1">
                  When photos and videos are shared, they will appear on the profile.
                </Typography>
              </Box>
            ))}
          {activeTab === 1 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: appTheme.spacing(2),
                marginTop: appTheme.spacing(2),
                width: '100%',
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: appTheme.palette.background.paper,
                  color: appTheme.palette.background.default,
                  width: appTheme.spacing(10),
                  height: appTheme.spacing(10),
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Reels
              </Typography>
              <Typography variant="body1">
                Moments can be shared with music and sound effects.
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: appTheme.spacing(2),
                marginTop: appTheme.spacing(2),
                width: '100%',
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: appTheme.palette.background.paper,
                  color: appTheme.palette.background.default,
                  width: appTheme.spacing(10),
                  height: appTheme.spacing(10),
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Saved Posts
              </Typography>
              <Typography variant="body1">
                When photos and videos are saved, they will appear here.
              </Typography>
            </Box>
          )}
          {activeTab === 3 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                rowGap: appTheme.spacing(2),
                marginTop: appTheme.spacing(2),
                width: '100%',
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: appTheme.palette.background.paper,
                  color: appTheme.palette.background.default,
                  width: appTheme.spacing(10),
                  height: appTheme.spacing(10),
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Tagged Photos
              </Typography>
              <Typography variant="body1">
                When people tag someone in photos, the photos will appear here.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default ProfilePage;
