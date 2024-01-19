import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import LoadingBackdrop from '../../components/LoadingBackdrop/LoadingBackdrop';
import { NotificationContext } from '../../components/Notifications/NotificationContext';
import PostCard from '../../components/PostCard/PostCard';
import { getAllPosts } from '../../services/post.service';
import { Post } from '../../types/Post';

function Home() {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);
  const { setErrorMessage } = useContext(NotificationContext);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    setLoading(true);
    getAllPosts()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('fetching posts');
        setLoading(false);
      });
  };

  return (
    <>
      <LoadingBackdrop loading={loading} />
      <Grid container justifyContent="center">
        <Grid item zeroMinWidth xs="auto">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostCard
                  post={post}
                  key={post.id}
                  onDelete={getPosts}
                  onEdit={getPosts}
                  onComment={getPosts}
                  onLike={getPosts}
                />
              );
            })}
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
