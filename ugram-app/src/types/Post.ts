/**
 * This file contains the type definition for a post
 * @module types/Post
 * @category Post Types
 * @subcategory Post, Image, Comment, Like, Profile
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} userId
 * @property {Image} image
 * @property {string} description
 * @property {string[]} mentions
 * @property {string[]} tags
 * @property {Comment[]} comments
 * @property {Date} createdAt
 * @property {Profile} profile
 * @property {Like[]} likes
 * @property {Profile[]} likers
 * @property {Profile[]} commenters
 *
 * @example
 * {
 *  "id": "1",
 * "userId": "1",
 * "image": {
 *  "id": "1",
 * "url": "https://ugram-pictures.s3.amazonaws.com/1"
 * },
 * "description": "This is a description",
 * "mentions": [],
 * "tags": [],
 * "comments": [],
 * "createdAt": "2021-03-01T00:00:00.000Z",
 * "profile": {
 * "userId": "1",
 * "name": "John Doe",
 * "username": "johndoe"
 * },
 * "likes": [],
 * "likers": [],
 * "commenters": []
 * }
 *
 *
 */

export type Post = {
  id: string;
  userId: string;
  image: Image;
  description: string;
  mentions: string[];
  tags: string[];
  comments: Comment[];
  creationDate: string;
  profile: PostProfile;
  likes: Like[];
  likers: PostProfile[];
  commenters: PostProfile[];
  likesCount: number;
};

/**
 * @typedef {Object} PostUpdate
 * @property {string} description
 * @example
 * {
 * "description": "This is a description"
 * }
 * @see Post
 */

export type PostUpdate = {
  description: string;
};

/**
 * @typedef {Object} Image
 * @property {SingleSizeImage} full
 * @property {SingleSizeImage} medium
 * @property {SingleSizeImage} small
 * @example
 * {
 *  full: {
 *    "id": "1",
 *    "url": "https://ugram-pictures.s3.amazonaws.com/1"
 *  },
 *  medium: {
 *    "id": "2",
 *    "url": "https://ugram-pictures.s3.amazonaws.com/2"
 *  },
 *  small: {
 *    "id": "3",
 *    "url": "https://ugram-pictures.s3.amazonaws.com/3"
 *  }
 * }
 * @see Post
 */

type Image = {
  full: SingleSizeImage;
  medium: SingleSizeImage;
  small: SingleSizeImage;
};

/**
 * @typedef {Object} SingleSizeImage
 * @property {string} id
 * @property {string} url
 * @example
 * {
 *   "id": "3",
 *   "url": "https://ugram-pictures.s3.amazonaws.com/3"
 *  }
 * }
 * @see Image
 */

type SingleSizeImage = {
  id: string;
  url: string;
};

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} postId
 * @property {string} userId
 * @property {string} text
 * @property {Date} createdAt
 * @example
 * {
 * "id": "1",
 * "postId": "1",
 * "userId": "1",
 * "text": "This is a comment",
 * "createdAt": "2021-03-01T00:00:00.000Z"
 * }
 */

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
};

/**
 * @typedef {Object} Like
 * @property {string} id
 * @property {string} postId
 * @property {string} userId
 * @property {Date} createdAt
 * @example
 * {
 * "id": "1",
 * "postId": "1",
 * "userId": "1",
 * "createdAt": "2021-03-01T00:00:00.000Z"
 * }
 */

export type Like = {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
};

/**
 * @typedef {Object} Profile
 * @property {string} userId
 * @property {string} name
 * @property {string} username
 * @example
 * {
 * "userId": "1",
 * "name": "John Doe",
 * "username": "johndoe"
 * }
 */

export type PostProfile = {
  userId: string;
  name: string;
  username: string;
  profilePicture: string;
};
