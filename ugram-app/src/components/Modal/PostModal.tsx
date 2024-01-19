import { Delete, Edit } from '@mui/icons-material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Avatar,
  Box,
  Container,
  Dialog,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { likePost, unLikePost } from '../../services/post.service';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { removeHashtagsFromDescription } from '../../utils/string-utils';
import ConfirmDeletePictureDialog from '../PictureDialog/ConfirmDeletePictureDialog';
import EditPictureDialog from '../PictureDialog/EditPictureDialog';
import { CommentInput } from '../PostCard/CommentInput';
import { CommentItem } from '../PostCard/CommentItem';
import { CommentList } from '../PostCard/CommentList';
import UserLikesDialog from '../UserLikesDialog/UserLikesDialog';

interface PostModalProps {
  open: boolean;
  onClose: () => any;
  post?: Post;
  owner: boolean;
  onEdit?: () => any;
  onDelete?: () => any;
  liked: boolean;
  onLike: () => any;
  onComment: () => any;
}

export default function PostModal({
  open,
  onClose,
  post,
  owner,
  onEdit,
  onDelete,
  onLike,
  onComment,
  liked,
}: PostModalProps) {
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);
  const mobile = useMediaQuery('(max-width:600px)');
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if (mobile && post) {
      setImgSrc(post.image.medium.url);
    } else if (post) {
      setImgSrc(post.image.full.url);
    }
    setIsLoading(false);
  }, [mobile, post]);

  const handleLike = async () => {
    if (!post?.id) return;

    if (!liked) {
      await likePost(post?.id);
    } else {
      await unLikePost(post?.id);
    }
    onLike();
  };

  const navigate = useNavigate();

  const openEdit = () => {
    setEditOpened(true);
  };
  const handleCloseEdit = () => {
    setEditOpened(false);
  };

  const handleCloseDelete = () => {
    setDeleteOpened(false);
  };

  const handleOpenDelete = () => {
    setDeleteOpened(true);
  };

  const handleDelete = () => {
    onClose();
    if (onDelete) onDelete();
  };

  function openLikesList() {
    setOpenLikes(true);
  }

  function closeLikes() {
    setOpenLikes(false);
  }

  function CustomDivider() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const orientation = isSmall ? 'horizontal' : 'vertical';

    return <Divider orientation={orientation}></Divider>;
  }

  return (
    <>
      <UserLikesDialog
        open={openLikes}
        onClose={closeLikes}
        profiles={post?.likers}
      ></UserLikesDialog>
      <EditPictureDialog
        pictureId={post?.id}
        open={editOpened}
        onClose={handleCloseEdit}
        description={post?.description}
        onEdit={onEdit}
      />
      <ConfirmDeletePictureDialog
        onDelete={handleDelete}
        onClose={handleCloseDelete}
        id={post?.id}
        open={deleteOpened}
      />
      <Dialog
        maxWidth={'lg'}
        fullWidth={true}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            height: '100%',
            backgroundColor: `${appTheme.palette.background.default}`,
            borderRadius: '0px',
            border: `1px solid ${appTheme.palette.divider}`,
          },
        }}
      >
        <Container
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            className="modal-picture"
            sx={{
              width: { xs: '100%', sm: '100%', md: '66%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading && <Skeleton variant="rectangular" width="100%" height="100%" />}
            {!isLoading && (
              <img
                src={imgSrc}
                alt="post"
                style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                loading="lazy"
              />
            )}
          </Box>
          <CustomDivider></CustomDivider>
          <Container
            className="modal-info"
            disableGutters
            sx={{
              width: { sm: '100%', md: '34%' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Container disableGutters className="above-comments">
              <Container
                disableGutters
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1,
                  py: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    pl: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                    }}
                    src={post?.profile.profilePicture}
                  />
                  <Typography
                    variant="subtitle2"
                    onClick={() => navigate('/users/' + post?.userId, { replace: true })}
                    sx={{
                      minWidth: '150px',
                      '&:hover': {
                        cursor: 'pointer',
                        color: `${appTheme.palette.grey[500]}`,
                      },
                    }}
                  >
                    {post?.profile.username}
                  </Typography>
                </Stack>
                {owner && (
                  <Container
                    disableGutters
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'right',
                    }}
                  >
                    <IconButton onClick={openEdit} color="secondary">
                      <Edit
                        sx={{
                          height: '20px',
                          width: '20px',
                        }}
                      />
                    </IconButton>
                    <IconButton onClick={handleOpenDelete} color="secondary">
                      <Delete
                        sx={{
                          height: '20px',
                          width: '20px',
                        }}
                      />
                    </IconButton>
                  </Container>
                )}
              </Container>
            </Container>
            <Divider />
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                flex: 10,
                px: 2,
                py: 2,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                  '&-track': {
                    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    WebkitBorderRadius: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                  },
                  '&-thumb': {
                    WebkitBorderRadius: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0,0,0,.1)',
                  },
                },
              }}
            >
              <CommentItem
                text={removeHashtagsFromDescription(post?.description ?? '')}
                username={post?.profile.username}
                createdAt={post?.creationDate}
                profilePicture={post?.profile.profilePicture}
                tags={post?.tags}
                userId={post?.profile.userId}
              />
              <CommentList
                comments={post?.comments}
                commenters={post?.commenters ?? []}
                isModal={true}
              ></CommentList>
            </Stack>
            <Divider />
            <Container disableGutters className="under-comments" sx={{ flex: 2 }}>
              <Container
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1,
                }}
                disableGutters
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '2px',
                    '& .MuiIconButton-root': {
                      '& .MuiSvgIcon-root': {
                        '&:hover': {
                          color: `${appTheme.palette.grey[500]}`,
                        },
                      },
                    },
                  }}
                >
                  <IconButton aria-label="like this post" onClick={handleLike}>
                    {liked ? (
                      <FavoriteIcon sx={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon sx={{ color: 'white' }} />
                    )}
                  </IconButton>
                  <IconButton>
                    <ModeCommentOutlinedIcon sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton>
                    <SendOutlinedIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
                <IconButton>
                  <BookmarkBorderOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
              </Container>
              <Stack>
                <Container
                  onClick={openLikesList}
                  disableGutters
                  sx={{ px: 2, pb: 1, cursor: 'pointer' }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {post?.likesCount} likes
                  </Typography>
                </Container>
              </Stack>
              <Divider />
              <Box sx={{ px: 2, py: 1, mb: 2 }}>
                <CommentInput postId={post?.id} onComment={onComment} />
              </Box>
            </Container>
          </Container>
        </Container>
      </Dialog>
    </>
  );
}
