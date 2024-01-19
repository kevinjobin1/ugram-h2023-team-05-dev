import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { likePost, unLikePost } from '../../services/post.service';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { formatPostDate } from '../../utils/date-utils';
import {
  removeHashtagsFromDescription,
  truncateDescription,
} from '../../utils/string-utils';
import { AuthContext } from '../AuthContext/AuthContext';
import PostModal from '../Modal/PostModal';
import UserLikesDialog from '../UserLikesDialog/UserLikesDialog';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';

type Props = {
  post: Post;
  onDelete: () => any;
  onEdit: () => any;
  onComment: () => any;
  onLike: () => any;
};

const MAX_DESCRIPTION_LENGTH = 100;

const PostCard = ({ post, onDelete, onEdit, onComment, onLike }: Props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);
  const { user } = useContext(AuthContext);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const userContext = useContext(AuthContext);

  const isLiked = () => {
    return post.likers.some((liker) => liker.userId === user?.userId);
  };

  const handleLike = async (postId: string) => {
    if (!isLiked()) {
      await likePost(postId);
    } else {
      await unLikePost(postId);
    }
    onLike();
  };

  function openModal() {
    setModalOpen(true);
  }

  function openLikesList() {
    setOpenLikes(true);
  }

  function closeLikes() {
    setOpenLikes(false);
  }
  function openProfile() {
    navigate('/users/' + post.userId);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function onMoreClick() {
    setShowFullDescription(!showFullDescription);
  }

  return (
    <>
      <PostModal
        onClose={closeModal}
        open={modalOpen}
        post={post}
        owner={userContext.isAuthenticated(post.userId)}
        onDelete={onDelete}
        onEdit={onEdit}
        liked={isLiked()}
        onLike={onLike}
        onComment={onComment}
      />
      <UserLikesDialog
        open={openLikes}
        onClose={closeLikes}
        profiles={post.likers}
      ></UserLikesDialog>
      <Card
        sx={{
          margin: '1rem 0',
          width: { xs: '90vw', sm: '450px' },
          minWidth: { xs: '300px', sm: '450px' },
          maxWidth: { xs: '90vw', sm: '450px' },
          border: 'none',
        }}
      >
        <CardHeader
          sx={{ borderBottom: 'none', padding: '16px 8px' }}
          avatar={
            <Avatar
              sx={{
                width: '30px',
                height: '30px',
              }}
              src={post.profile.profilePicture ?? ''}
            />
          }
          title={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                onClick={openProfile}
              >
                {post.profile.username + ' '}
              </Typography>
              <Typography
                sx={{ color: 'grey', fontSize: '14px', marginLeft: '10px' }}
                variant="body2"
              >
                {' • ' + formatPostDate(post.creationDate)}
              </Typography>
            </Box>
          }
          action={
            <IconButton aria-label="options" sx={{ color: 'white' }}>
              <MoreHorizIcon />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="450"
          image={post.image.medium.url}
          onClick={openModal}
          sx={{
            border: `1px solid ${appTheme.palette.divider}`,
            objectFit: 'cover',
            objectPosition: '50% 50%',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
            '&:active': {
              opacity: 0.6,
            },
          }}
        />
        <CardActions
          disableSpacing
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'left',
            padding: '16px 16px 16px 0px',
            margin: '0',
            '& .MuiIconButton-root': {
              padding: '0 15px 0 0',
              margin: '0',
            },
          }}
        >
          <IconButton
            aria-label="like this post"
            onClick={() => {
              handleLike(post.id);
            }}
          >
            {isLiked() ? (
              <FavoriteIcon sx={{ color: 'red' }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
          <IconButton
            aria-label="open comment section"
            sx={{ color: 'white' }}
            onClick={openModal}
          >
            <MapsUgcOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="share post on other social media"
            sx={{ color: 'white' }}
          >
            <SendOutlinedIcon />
          </IconButton>
        </CardActions>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '0',
            margin: '0',
            '& .MuiTypography-root': {
              display: 'inline',
              justifyContent: 'flex-start',
              alignItems: 'left',
            },
            '&:last-child': {
              paddingBottom: '0',
            },
          }}
        >
          <Box onClick={openLikesList} sx={{ cursor: 'pointer' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {post.likesCount} likes
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body2"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
                fontWeight: 'bold',
              }}
              onClick={() => {
                navigate(encodeURI('/users/' + post.profile.userId), {
                  replace: true,
                });
              }}
            >
              {post.profile.username}
            </Typography>
            {showFullDescription ? (
              <Typography variant="body2">
                {removeHashtagsFromDescription(post.description)}
              </Typography>
            ) : (
              <>
                <Typography variant="body2">
                  {removeHashtagsFromDescription(
                    truncateDescription(post.description, MAX_DESCRIPTION_LENGTH),
                  )}
                </Typography>
                {post.description.length > 100 && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'grey',
                      fontSize: '14px',
                      cursor: 'pointer',
                      alignSelf: 'center',
                    }}
                    onClick={onMoreClick}
                  >
                    {' more'}
                  </Typography>
                )}
              </>
            )}
          </Stack>
          <Box>
            {post.tags &&
              post.tags.map((tag, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: '#adc6e0',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => {
                    navigate(encodeURI('/pictures?' + 'search=%23' + tag), {
                      replace: true,
                    });
                  }}
                >
                  {'#' + tag + ' '}
                </Typography>
              ))}
          </Box>
          <Stack direction="column" spacing="2px">
            <CommentList
              comments={post.comments}
              commenters={post.commenters}
            ></CommentList>
          </Stack>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: 'grey',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onClick={openModal}
            >
              {'View all comments'}
            </Typography>
          </Box>
          <CommentInput postId={post.id} onComment={onComment} />
        </CardContent>
      </Card>
      <Divider />
    </>
  );
};
export default PostCard;
