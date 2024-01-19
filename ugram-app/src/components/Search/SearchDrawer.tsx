import { Box, Divider, Drawer, Fade, Slide, Typography } from '@mui/material';
import { useContext, useState } from 'react';

import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { SearchResult } from '../../types/Search';
import { Profile } from '../../types/User';
import { drawerWidth } from '../Layout/ResponsiveLayout';
import { NotificationContext } from '../Notifications/NotificationContext';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

type SearchDrawerProps = {
  open: boolean;
  onClose: (result?: SearchResult) => void;
};

export default function SearchDrawer({ open, onClose }: SearchDrawerProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>();
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const { setErrorMessage } = useContext(NotificationContext);

  const handleSearch = async (keyword: string) => {
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
          setErrorMessage('searching tags');
        });

      return;
    }

    setSearchResults(undefined);
    const results: SearchResult[] = [];

    await client
      .get('/search/posts?description=' + keyword, { withCredentials: true })
      .then((res) => {
        const posts: Post[] = res.data;
        if (posts.length > 0) {
          results.push({
            id: keyword,
            title: keyword,
            description: posts.length + ' ' + (posts.length > 1 ? 'posts' : 'post'),
            image: '',
            type: 'posts',
            keyword: keyword,
          });
        }
      })
      .catch(() => {
        setErrorMessage('searching posts with description');
      });

    await client
      .get('/search/profiles?username=' + keyword, { withCredentials: true })
      .then((res) => {
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
      })
      .catch(() => {
        setErrorMessage('searching profiles with username');
      });

    await client
      .get('/search/tags?tag=' + keyword, {
        withCredentials: true,
      })
      .then((res) => {
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
      })
      .catch(() => {
        setErrorMessage('searching tags');
      });

    // Sort results so that profiles are first, then hashtags, then posts
    results.sort((a, b) => {
      if (a.type === 'profiles' && b.type !== 'profiles') {
        return -1;
      } else if (a.type !== 'profiles' && b.type === 'profiles') {
        return 1;
      } else if (a.type === 'tags' && b.type !== 'tags') {
        return -1;
      } else if (a.type !== 'tags' && b.type === 'tags') {
        return 1;
      } else {
        return 0;
      }
    });

    setSearchResults(results);
  };

  const handleClear = () => {
    setSearchResults(undefined);
  };

  return (
    <Drawer
      variant="temporary"
      transitionDuration={500}
      open={open}
      onClose={() => {
        handleClear();
        onClose();
      }}
      BackdropProps={{
        invisible: true,
      }}
      anchor="left"
      PaperProps={{
        sx: {
          top: 0,
          left: drawerWidth,
          width: '400px',
          borderRight: `1px solid ${appTheme.palette.divider}`,
          borderLeft: `1px solid ${appTheme.palette.divider}`,
          borderRadius: '0 10px 10px 0',
          backgroundColor: 'background.default',
          position: 'fixed',
          overflowX: 'hidden',
          overflowY: 'auto',
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
        },
      }}
      closeAfterTransition
      sx={{
        zIndex: 0,
        display: { xs: 'none', sm: 'block', md: 'block' },
      }}
    >
      <Slide direction="right" in={open} timeout={500}>
        <Box>
          <Fade in={open} timeout={500}>
            <Box>
              <Typography variant="h5" sx={{ margin: 2, fontWeight: 'bold' }}>
                Search
              </Typography>
              <SearchInput
                onSearch={handleSearch}
                onClear={handleClear}
                onClick={() => onClose()}
              />
              <Divider sx={{ width: '100%', height: '10', margin: '10px 0' }} />
              {searchResults ? (
                <SearchResults
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  searchHistory={searchHistory}
                  setSearchHistory={setSearchHistory}
                  onClose={(result?: SearchResult) => {
                    onClose(result);
                  }}
                />
              ) : (
                <SearchHistory
                  searchHistory={searchHistory}
                  setSearchHistory={setSearchHistory}
                  onClick={(result?: SearchResult) => {
                    onClose(result);
                  }}
                />
              )}
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Drawer>
  );
}
