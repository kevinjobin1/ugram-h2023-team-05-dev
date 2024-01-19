import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Box, Button, IconButton, Popper, TextField } from '@mui/material';
import { MouseEvent, useState } from 'react';

import { commentOnPost } from '../../services/post.service';

type CommentInputProps = {
  postId?: string;
  onComment: () => any;
};

export const CommentInput = ({ postId, onComment }: CommentInputProps) => {
  const [comment, setComment] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function onShowEmojiClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
    setOpenEmoji(!openEmoji);
  }

  function addEmoji(event: any) {
    const emoji = event.native;
    setComment(comment + emoji);
  }

  async function onCommentSubmit() {
    if (!postId) return;

    await commentOnPost(postId, comment);
    await onComment();

    setComment('');
    setOpenEmoji(false);
    setAnchorEl(null);
  }

  function onCommentChange(event: any) {
    setComment(event.target.value);
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '100%',
          marginTop: '10px',
        }}
      >
        <TextField
          id="add-comment"
          value={comment}
          fullWidth
          multiline
          maxRows={4}
          onChange={(event: any) => onCommentChange(event)}
          autoComplete="off"
          placeholder="Add a comment..."
          variant="standard"
          sx={{
            height: '100%',
            padding: '0',
            margin: '0',
            '& .MuiInputBase-root': {
              color: 'white',
              fontSize: '14px',
            },
            '& .MuiInput-underline:before': {
              border: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              border: 'none',
            },
            '& .MuiInput-underline:after': {
              border: 'none',
            },
          }}
        />
        {comment.length > 0 && (
          <Button
            variant="text"
            color="info"
            onClick={onCommentSubmit}
            sx={{
              fontSize: '12px',
              height: '100%',
              padding: '0',
              margin: '0',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            Post
          </Button>
        )}

        <IconButton
          aria-label="add emoji"
          size="small"
          onClick={onShowEmojiClick}
          sx={{
            padding: '0',
            margin: '0',
          }}
        >
          <SentimentSatisfiedAltIcon
            sx={{
              color: 'grey',
              width: '18px',
            }}
          />
        </IconButton>
      </Box>
      {openEmoji && (
        <Popper
          open={openEmoji}
          anchorEl={anchorEl}
          placement="top-start"
          sx={{ zIndex: '2000' }}
          onMouseLeave={() => setOpenEmoji(false)}
        >
          <Picker
            data={data}
            onEmojiSelect={(event: any) => addEmoji(event)}
            theme="dark"
            searchPosition="none"
            previewPosition="none"
            skinTonePosition="none"
            perLine={7}
            icons="solid"
            emojiSize={32}
            emojiButtonSize={48}
            navPosition="none"
          />
        </Popper>
      )}
    </div>
  );
};
