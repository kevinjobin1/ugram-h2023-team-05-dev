import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { AppBar, IconButton, SvgIcon, Toolbar } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../public/logo-name.svg';
import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';
import { SearchResult } from '../../types/Search';
import { Profile } from '../../types/User';
import { appBarHeight } from '../Layout/ResponsiveLayout';
import { NotificationContext } from '../Notifications/NotificationContext';
import SearchInput from '../Search/SearchInput';
import SearchPopover from '../Search/SearchPopover';

export default function AppBarTop() {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>();
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [openPopover, setOpenPopover] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
          setOpenPopover(true);
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
        results.push({
          id: keyword,
          title: keyword,
          description: posts.length + ' ' + (posts.length > 1 ? 'posts' : 'post'),
          image: '',
          type: 'posts',
          keyword: keyword,
        });
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
    setOpenPopover(true);
  };

  const handleOnFocus = () => {
    setOpenPopover(true);
    setSearchResults(undefined);
  };

  const handleOnClear = () => {
    setOpenPopover(false);
    setSearchResults(undefined);
  };

  function onSearchClick(result?: SearchResult) {
    switch (result?.type) {
      case 'profiles':
        navigate('/users/' + result.id, { replace: true });
        break;
      case 'posts':
        navigate(encodeURI('/pictures?' + 'search=' + result.keyword), {
          replace: true,
        });
        break;
      case 'tags':
        navigate(encodeURI('/pictures?' + 'search=' + result.title.replace('#', '%23')), {
          replace: true,
        });
        break;
      default:
        break;
    }
    setOpenPopover(false);
    setSearchResults(undefined);
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        display: { xs: 'block', sm: 'none' },
        height: appBarHeight,
        backgroundColor: appTheme.palette.background.default,
        borderBottom: `1px solid ${appTheme.palette.divider}`,
        overflow: 'hidden',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <IconButton sx={{ p: 0, display: { xs: 'flex', sm: 'none' } }}>
          <SvgIcon
            component={Logo}
            viewBox="0 30 560 100"
            sx={{
              width: '5rem',
              height: '2rem',
              color: 'white',
            }}
          />
        </IconButton>
        <div ref={anchorRef}>
          <SearchInput
            inputRef={inputRef}
            onSearch={handleSearch}
            onClear={handleOnClear}
            onFocus={handleOnFocus}
            onClick={() => setOpenPopover(false)}
          />
        </div>

        <IconButton sx={{ p: 0, display: { xs: 'flex', sm: 'none' } }}>
          <FavoriteBorderOutlinedIcon
            sx={{
              color: 'white',
              fontSize: '1.8rem',
            }}
          />
        </IconButton>
      </Toolbar>

      <SearchPopover
        open={openPopover}
        onClick={onSearchClick}
        anchorEl={anchorRef}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        onClose={() => setOpenPopover(false)}
      />
    </AppBar>
  );
}
