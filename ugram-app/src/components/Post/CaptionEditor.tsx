import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react';

import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { SearchResult } from '../../types/Search';
import { Account, Profile } from '../../types/User';
import { convertBase64toBlob } from '../../utils/image-utils';
import { AuthContext } from '../AuthContext/AuthContext';
import SearchResults from '../Search/SearchResults';
import ImgWrapper from './ImgWrapper';
export interface CaptionEditorProps {
  open: boolean;
  onClose: () => any;
  imageUrl: string;
  onSubmit: (image: Blob, caption: string) => any;
}

const CaptionEditorDialogTitle = styled(DialogTitle)({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: appTheme.palette.background.paper,
  margin: 0,
  padding: 0,
  borderBottom: `1px solid ${appTheme.palette.grey[700]}`,
});

const CaptionEditorDialogContent = styled(DialogContent)({
  backgroundColor: appTheme.palette.background.paper,
  padding: 0,
  borderTop: `1px solid ${appTheme.palette.divider}`,
});

const CaptionEditingStack = styled(Stack)({
  width: '100%',
  display: 'flex',
  justifyContent: 'top',
  alignItems: 'top',
  overflowY: 'scroll',
  overflowX: 'hidden',
  borderLeft: `1px solid ${appTheme.palette.grey[700]}`,
  '&::-webkit-scrollbar': {
    width: '0.2em',
    height: '0.2em',
  },
  '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: `${appTheme.palette.secondary.main}`,
    outline: 'none',
  },
});

const SearchBox = styled(Box)({
  height: '280px',
  width: '100%',
  m: 0,
  p: 0,
  overflow: 'hidden',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
  backgroundColor: appTheme.palette.background.paper,
  '& em-emoji-picker': {
    height: '100%',
    width: '100%',
  },
});

const ProfileHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const BackButton = styled(IconButton)({
  color: appTheme.palette.text.primary,
  fontSize: '1.5rem',
});

const ShareButton = styled(Button)({
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: appTheme.palette.background.paper,
    color: 'white',
  },
});

const CaptionEditor: React.FC<CaptionEditorProps> = ({
  open,
  onClose,
  imageUrl,
  onSubmit,
}) => {
  const [caption, setCaption] = useState('');
  const [imageBlob, setImageBlob] = useState<Blob>(new Blob());
  const [isSending, setIsSending] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<Account | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>();
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);

  const handleSearch = async (keyword: string) => {
    console.log('searching for ' + keyword);
    if (keyword === '') {
      setSearchResults(undefined);
      return;
    }

    if (keyword.startsWith('#')) {
      keyword = keyword.substring(1);
      if (keyword === '') {
        setSearchResults(undefined);
        return;
      }

      await client
        .get('/search/tags?tag=' + keyword, {
          withCredentials: true,
        })
        .then((res) => {
          const results: SearchResult[] = [];
          const posts: Post[] = res.data;
          const tags: string[] = posts.map((post: Post) => post.tags).flat();
          const uniqueTags = [...new Set(tags)];

          uniqueTags.forEach((tag) => {
            results.push({
              id: tag,
              title: '#' + tag,
              description:
                posts.filter((post) => post.tags.includes(tag)).length +
                ' ' +
                (posts.filter((post) => post.tags.includes(tag)).length > 1
                  ? 'posts'
                  : 'post'),
              image: '/hashtag-avatar.svg',
              type: 'tags',
              keyword: keyword,
            });
          });
          setSearchResults(results);
        })
        .catch(() => {
          // console.log(err);
        });

      return;
    }
    if (keyword.startsWith('@')) {
      keyword = keyword.substring(1);
      if (keyword === '') {
        setSearchResults(undefined);
        return;
      }
      await client
        .get('/search/profiles?username=' + keyword, { withCredentials: true })
        .then((res) => {
          const results: SearchResult[] = [];
          res.data.forEach((profile: Profile) => {
            results.push({
              id: profile.userId,
              title: profile.username,
              description: profile.name,
              image: profile.profilePicture,
              type: 'profiles',
              keyword: keyword,
            });
          });
          setSearchResults(results);
        })
        .catch(() => {
          // console.log(err);
        });

      return;
    }
  };

  function getUser() {
    client
      .get('/profiles/' + user?.userId, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function onShowEmojiClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
    setOpenEmoji(!openEmoji);
  }

  function addEmoji(event: any) {
    const emoji = event.native;
    setCaption(caption + emoji);
  }

  const handleOnPreviewLoad = () => {
    convertBase64toBlob(imageUrl)
      .then((blob) => {
        blob && setImageBlob(blob);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnSubmit = () => {
    setIsSending(true);
    onSubmit(imageBlob, caption);
  };

  if (!profile) {
    getUser();
  }

  useEffect(() => {
    if (caption === '') {
      setOpenSearch(false);
    } else {
      // take only the string after the last space
      const keyword = caption.split(' ').pop();
      if (keyword) {
        handleSearch(keyword);
        setOpenSearch(true);
      } else {
        setOpenSearch(false);
      }
    }
  }, [caption]);

  const handleOnCaptionChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.value.length > 2200) {
      return;
    }

    setCaption(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '100%',
          height: 'fit-content',
          maxWidth: { xs: '100%', sm: '70vw', md: '60vw', lg: '50vw' },
          margin: 0,
          borderRadius: { xs: 0, sm: 3 },
          backgroundColor: 'transparent',
          border: `1px solid ${appTheme.palette.divider}`,
        },
      }}
    >
      <CaptionEditorDialogTitle>
        <BackButton onClick={onClose}>
          <KeyboardBackspaceIcon />
        </BackButton>
        {'Create a new post'}
        <ShareButton onClick={handleOnSubmit} color="info">
          {isSending ? (
            <CircularProgress color="secondary" size={24} sx={{ ml: 1 }} />
          ) : (
            'Share'
          )}
        </ShareButton>
      </CaptionEditorDialogTitle>
      <CaptionEditorDialogContent
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '60vw' },
            height: '100%',
            minHeight: { xs: '100%', sm: '60vh' },
            backgroundColor: appTheme.palette.background.paper,
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            alignItems: 'top',
          }}
        >
          <ImgWrapper
            imgSrc={imageUrl}
            imgRef={imgRef}
            onLoad={handleOnPreviewLoad}
            imgAlt="preview"
          />
          <CaptionEditingStack>
            <ProfileHeader sx={{ px: 2, pt: 2, pb: 0 }}>
              <Avatar
                src={profile?.profilePicture}
                sx={{
                  width: '2rem',
                  height: '2rem',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: appTheme.palette.text.primary,
                  ml: 2,
                }}
              >
                {profile?.username}
              </Typography>
            </ProfileHeader>

            <TextField
              id="caption-input"
              placeholder="Write a caption ..."
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              onFocus={(e) => {
                e.target.select();
                setOpenEmoji(false);
              }}
              value={caption}
              onChange={handleOnCaptionChange}
              sx={{
                m: 0,
                p: 0,
                width: '100%',
                color: appTheme.palette.text.primary,
                '& .MuiInputBase-root': {
                  border: 'none',
                  '& :hover': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                  '& :hover': {
                    border: 'none',
                  },
                },
              }}
              multiline
              disabled={isSending}
              rows={8}
            />
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 'fit-content',
                padding: 1,
              }}
            >
              <IconButton
                aria-label="add emoji"
                size="small"
                onClick={onShowEmojiClick}
                sx={{}}
              >
                <SentimentSatisfiedAltIcon
                  sx={{
                    color: 'grey',
                    width: '1.5rem',
                  }}
                />
              </IconButton>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  ml: 2,
                }}
              >
                {caption.length} / 2,200
              </Typography>
            </Stack>

            {openEmoji && (
              <SearchBox>
                <Picker
                  data={data}
                  onEmojiSelect={(event: any) => addEmoji(event)}
                  searchPosition="none"
                  previewPosition="none"
                  skinTonePosition="none"
                  perLine={6}
                  dynamicWidth
                  icons="solid"
                  emojiSize={18}
                  emojiButtonSize={36}
                  navPosition="none"
                />
              </SearchBox>
            )}
            {searchResults && searchResults.length > 0 && (
              <SearchBox
                sx={{
                  backgroundColor: appTheme.palette.background.default,
                }}
              >
                <SearchResults
                  showHeader={false}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  searchHistory={searchHistory}
                  setSearchHistory={setSearchHistory}
                  onClose={(result?: SearchResult) => {
                    if (result) {
                      setCaption((prev) => {
                        const words = prev.split(' ');
                        words.pop();
                        const symbol = result.type === 'profiles' ? '@' : '';
                        return [...words, symbol + result.title, ' '].join(' ');
                      });
                    }
                    setOpenSearch(false);
                  }}
                />
              </SearchBox>
            )}
          </CaptionEditingStack>
        </Stack>
      </CaptionEditorDialogContent>
    </Dialog>
  );
};

export default CaptionEditor;
