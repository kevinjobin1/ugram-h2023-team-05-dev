import { Avatar, Stack, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import appTheme from '../../styles/theme';
import { formatPostDate } from '../../utils/date-utils';

type CommentItemProps = {
  profilePicture?: string;
  text?: string;
  createdAt?: string;
  username?: string;
  tags?: string[];
  userId?: string;
  showAvatar?: boolean;
};

const UsernameLink = styled('a')({
  color: `${appTheme.palette.text.primary}`,
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    color: `${appTheme.palette.grey[500]}`,
  },
});

export const CommentItem: React.FC<CommentItemProps> = ({
  profilePicture,
  text,
  createdAt,
  username,
  tags,
  userId,
  showAvatar = true,
}) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2} alignContent="start">
      {showAvatar && (
        <Avatar
          sx={{
            maxWidth: '32px',
            maxHeight: '32px',
          }}
          src={profilePicture}
        />
      )}
      <Stack direction="column" spacing={0.5}>
        <Typography variant="body2">
          <UsernameLink href={`/users/${userId}`}>{username}</UsernameLink>
          {' ' + text}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {tags &&
            tags.map((tag, index) => (
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
                {'#' + tag}
              </Typography>
            ))}
        </Stack>
        {createdAt && (
          <Typography
            variant="caption"
            color="secondary"
            sx={{
              fontSize: '0.7rem',
            }}
          >
            {formatPostDate(createdAt)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
