import { ChatBubbleRounded, Favorite } from '@mui/icons-material';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { Image } from 'mui-image';
import { useContext, useState } from 'react';

import { AuthContext } from '../../components/AuthContext/AuthContext';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import PostModal from '../Modal/PostModal';

type Props = {
  post: Post;
  onDelete: () => any;
  onEdit: () => any;
  onLike: () => any;
  onComment: () => any;
};

function GridPicture({ post, onDelete, onEdit, onLike, onComment }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);

  function openPost() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const isLiked = () => {
    return post.likers.some((liker) => liker.userId === user?.userId);
  };

  return (
    <>
      <PostModal
        onClose={closeModal}
        open={modalOpen}
        post={post}
        owner={isAuthenticated(post.userId)}
        onDelete={onDelete}
        onEdit={onEdit}
        liked={isLiked()}
        onLike={onLike}
        onComment={onComment}
      />
      <Box
        onClick={openPost}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          '& .MuiBox-root': {
            display: 'none',
          },
          '&:hover': {
            '& .MuiBox-root': {
              display: 'flex',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: appTheme.spacing(2),
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.54)',
              color: 'white',
              padding: '10px',
            },
          },
        }}
      >
        <Image
          src={post.image.small.url}
          alt={post.description}
          width="300px"
          height="300px"
          fit="cover"
          easing={appTheme.transitions.easing.easeInOut}
          duration={appTheme.transitions.duration.shortest}
          bgColor={appTheme.palette.background.default}
          showLoading={
            <Skeleton variant="rectangular" width={300} height={300} animation="pulse" />
          }
        />
        <Box>
          <IconButton
            sx={{
              color: appTheme.palette.grey[300],
            }}
          >
            <Favorite />
            <Typography
              variant="body1"
              sx={{
                color: appTheme.palette.grey[300],
                fontWeight: 'bold',
                marginLeft: appTheme.spacing(0.5),
              }}
            >
              {post.likesCount}
            </Typography>
          </IconButton>
          <IconButton
            sx={{
              color: appTheme.palette.grey[300],
            }}
          >
            <ChatBubbleRounded />
            <Typography
              variant="body1"
              sx={{
                color: appTheme.palette.grey[300],
                fontWeight: 'bold',
                marginLeft: appTheme.spacing(0.5),
              }}
            >
              {post.comments.length}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default GridPicture;
