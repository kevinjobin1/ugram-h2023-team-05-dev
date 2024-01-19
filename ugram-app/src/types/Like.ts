import { Owner } from './User';

/**
 * @module types/Like - The module containing the type definition for a like
 */

/**
 * Represents a like on a post or a comment on a post
 * @typedef {Object} Like
 * @property {string} id - The like id (v4 uuid)
 * @property {Owner} from - The username and id of the like owner
 * @property {string?} mediaId - The media id of the like (if the like is on a post)
 * @property {string?} commentId - The comment id of the like (if the like is on a comment)
 * @example
 * {
 * "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 * "from": {
 *  "username": "user1",
 *  "userId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 *  },
 * "mediaId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 * "commentId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type Like = {
  id: string;
  from: Owner;
  mediaId: string;
  commentId: string;
};
