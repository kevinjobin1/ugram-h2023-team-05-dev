import client from '../modules/axios-client';
import { Comment, Post, PostUpdate } from '../types/Post';

export async function getPost(id: string): Promise<Post> {
  return await client
    .get(`/posts/${id}`, { withCredentials: true })
    .then((res) => res.data as Post);
}

export async function getAllPosts() {
  return await client.get('/posts/', { withCredentials: true });
}

export async function updatePost(id: string, postUpdate: PostUpdate) {
  await client.patch('/posts/' + id, postUpdate, {
    withCredentials: true,
  });
}

export async function deletePost(id: string) {
  await client.delete('/posts/' + id, { withCredentials: true });
}

export async function likePost(id: string) {
  await client.post('/posts/' + id + '/like', {}, { withCredentials: true });
}

export async function unLikePost(id: string) {
  await client.post('/posts/' + id + '/unlike', {}, { withCredentials: true });
}

export async function commentOnPost(id: string, text: string) {
  const comment = await client
    .post(`/posts/${id}/comments`, { text: text }, { withCredentials: true })
    .then((res) => {
      return res.data as Comment;
    });

  return comment;
}

export async function getCommentsFromPost(id: string): Promise<Comment[]> {
  return await client.get('/posts/' + id + '/comments', {
    withCredentials: true,
  });
}
