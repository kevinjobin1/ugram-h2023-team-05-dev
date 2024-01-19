import './ImageListPage.css';

import { Box } from '@chakra-ui/react';
import { Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GridPicture from '../../components/GridPicture/GridPicture';
import LoadingBackdrop from '../../components/LoadingBackdrop/LoadingBackdrop';
import { NotificationContext } from '../../components/Notifications/NotificationContext';
import client from '../../modules/axios-client';
import appTheme from '../../styles/theme';
import { Post } from '../../types/Post';

function ImageListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const { setErrorMessage } = useContext(NotificationContext);

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  function getPosts() {
    setLoading(true);
    client
      .get(encodeURI('/posts?search=' + searchParams.get('search')))
      .then((res) => {
        setPosts(res.data);
        const resPosts = res.data as Post[];
        const newPost = resPosts.find((p) => p.id == post?.id);
        setPost(newPost);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage('fetching posts');
      });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
        justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Typography
          sx={{
            marginTop: appTheme.spacing(2),
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          {searchParams.get('search')?.replace('%23', '#')}
        </Typography>
        <LoadingBackdrop loading={loading} />
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: appTheme.spacing(2),
            marginBottom: appTheme.spacing(2),
          }}
          justifyContent="center"
        >
          {posts.map((p) => (
            <Grid item key={p.id}>
              <GridPicture
                post={p}
                onDelete={getPosts}
                onEdit={getPosts}
                onLike={getPosts}
                onComment={getPosts}
              ></GridPicture>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default ImageListPage;
