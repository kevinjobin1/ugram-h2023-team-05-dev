// This file contains the types for the user
//
/** @module types/User */

import { Post } from './Post';

/**
 * @typedef {Object} Account - The type to get a user
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} phoneNumber - The phone number of the user
 * @property {string} profilePicture - The profile picture url of the user
 * @property {string} username - The username of the user
 * @property {string} creationDate - The creation date of the user
 * @property {string} id - The id of the user
 * @example
 * {
 * "name": "John Doe",
 * "email": "
 * "phoneNumber": "+1234567890",
 * "profilePicture": "https://picsum.photos/200/300",
 * "username": "johndoe",
 * "creationDate": "2020-01-01T00:00:00.000Z"
 * "id": "1234567890"
 * }
 * */
export type Account = {
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  username: string;
  creationDate: string;
  userId: string;
};

/**
 * @typedef {Object} UserContext - The type to get the user context
 * @property {User} user - The user
 * @property {function} login - The function to login a user
 * @property {function} logout - The function to logout a user
 * @property {function} getUser - The function to get the user
 * @property {function} isAuthenticated - The function to check if the user is authenticated
 * @example
 * {
 * "user": {
 * "name": "John Doe",
 * "email": "jonhdoe@special.ca",
 * "phoneNumber": "+1234567890",
 * "profilePicture": "https://picsum.photos/200/300",
 * "username": "johndoe",
 * "creationDate": "2020-01-01T00:00:00.000Z"
 * "id": "1234567890"
 * }
 * "login": (userLogin: UserLogin) => any;
 * "logout": () => any;
 * "getUser": () => any;
 * "isAuthenticated": (id: string) => false,
 * }
 * */
export type UserContext = {
  user: null | Account;
  login: (userLogin: UserLogin) => any;
  logout: () => any;
  getUser: () => any;
  isAuthenticated: (id: string) => any;
};

/**
 * @typedef {Object} UserRegister - The type to register a user
 * @property {string} name - The name of the user
 * @property {string} username - The username of the user
 * @property {string} email - The email of the user
 * @property {string} phoneNumber - The phone number of the user
 * @property {string} password - The password of the user
 * @example
 * {
 * "name": "John Doe",
 * "username": "johndoe",
 * "email": "abc@default.com",
 * "phoneNumber": "+1234567890",
 * "password": "PasSword123$"
 * }
 * */
export type UserRegister = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

/**
 * @typedef {Object} UserLogin - The type to login a user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @example
 * {
 * "email": "abc@benjaminMatteJean.com",
 * "password": "PasSword123$"
 * }
 * */
export type UserLogin = {
  email: string;
  password: string;
};

/**
 * @typedef {Object} UserEdit - The type to edit a user
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} phoneNumber - The phone number of the user
 * @example
 * {
 * "name": "John Doe",
 * "email": "johndoe@bca.com",
 * "phoneNumber": "+1234567890",
 * }
 * */
export type UserEdit = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type Profile = {
  userId: string;
  name: string;
  username: string;
  profilePicture: string;
  posts: Post[];
};

/**
 * Represents a media owner
 * @typedef {Object} Owner
 * @property {string} username - The username of the owner
 * @property {string} userId - The id of the owner (v4 uuid)
 * @example
 * {
 *  "username": "user1",
 *  "userId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type Owner = {
  username: string;
  userId: string;
};

/**
 * Represents an UserProfile
 * @typedef {Object} UserProfile
 * @property {string} id - The user id (v4 uuid)
 * @property {string} username - The user username
 * @property {string} name - The user name
 * @property {string} biography - The user biography (max 150 characters)
 * @property {string} profile_picture_url - The user profile picture URL
 * @property {string} profile_url - The user profile URL
 * @property {number} followers_count - The user followers count
 * @property {number} follows_count - The user follows count
 * @property {number} media_count - The user media count
 * @example
 * {
 * "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 * "username": "user1",
 * "name": "User 1",
 * "biography": "This is a nice and short biography",
 * "profile_picture_url": "https://picsum.photos/200/300",
 * "profile_url": "https://ugram.link/user1",
 * "followers_count": 0,
 * "follows_count": 0,
 * "media_count": 0
 * }
 * */
export type UserProfile = {
  id: string;
  username: string;
  name: string;
  biography: string;
  profile_picture_url: string;
  profile_url: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
};
