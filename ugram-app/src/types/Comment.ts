import { Owner } from './User';

/**
 * @module types/Comment - The module containing the type definition for a comment
 */

/**
 * Represents a comment
 * @typedef {Object} Comment
 * @property {string} id - The comment id (v4 uuid)
 * @property {Owner} from - The user who posted the comment (userId and username)
 * @property {string} parentId - The parent id of the comment (null if no parent)
 * @property {string} pictureId - The picture id of the comment
 * @property {string} text - The text of the comment
 * @property {string} createdAt - The timestamp when the comment was created. (ISO 8601 formatted timestamp)
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "from": {
 *    "userId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *    "username": "user1"
 *  },
 *  "parentId": null,
 *  "pictureId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "text": "This is a comment",
 *  "createdAt": "2020-03-02T15:00:00.000Z"
 * }
 * */

export type Comment = {
  id: string;
  from: Owner;
  parentId?: string | null;
  pictureId: string;
  text: string;
  createdAt: string;
  replies: Comment[];
};

/**
 * Represents a comment
 * @typedef {Object} CommentCreate
 * @property {string} pictureId - The picture id of the comment
 * @property {string} text - The text of the comment
 * @property {string} parentId - The parent id of the comment (null if no parent)
 * @example
 * {
 *  "pictureId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "text": "This is a comment",
 *  "parentId": null
 * }
 * */

export type CommentCreate = {
  pictureId: string;
  text: string;
  parentId?: string | null;
};

/**
 * Represents a comment update
 * @typedef {Object} CommentUpdate
 * @property {string} text - The text of the comment
 * @example
 * {
 *  "text": "This is a comment"
 * }
 * */

export type CommentUpdate = {
  text: string;
};

/**
 * Represents a comment delete
 * @typedef {Object} CommentDelete
 * @property {string} id - The comment id (v4 uuid)
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type CommentDelete = {
  id: string;
};

/**
 * Represents a comment
 * @typedef {Object} CommentGet
 * @property {string} id - The comment id (v4 uuid)
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type CommentGet = {
  id: string;
};

/**
 * Represents a comment
 * @typedef {Object} CommentGetAllFromUser
 * @property {string} userId - The user id of the comment
 * @example
 * {
 *  "userId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type CommentGetAllFromUser = {
  userId: string;
};

/**
 * Represents a comment
 * @typedef {Object} CommentGetAllFromPicture
 * @property {string} pictureId - The picture id of the comment
 * @example
 * {
 *  "pictureId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type CommentGetAllFromPicture = {
  pictureId: string;
};
