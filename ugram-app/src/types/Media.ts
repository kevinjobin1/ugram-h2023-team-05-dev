import { Owner } from './User';
/**
 * @module types/Media - The module containing the type definition for a media
 */

/**
 * Represents a media type
 * @typedef {Object} MediaType
 * @property {string} type - The name of the media type
 * @example
 * {
 *  "type": "picture"
 * }
 * */

export type MediaType = {
  type: 'picture' | 'video' | 'carousel';
};

/**
 * Represents a media share type
 * @typedef {Object} MediaShareType
 * @property {string} type - The name of the media share type
 * @example
 * {
 *  "type": "feed"
 * }
 * */

export type MediaShareType = {
  type: 'feed' | 'stories';
};

/**
 * Represents a media
 * @typedef {Object} Media
 * @property {string} id - The media id (v4 uuid)
 * @property {Owner} from - The username and id of the media owner
 * @property {string} caption - The caption of the media
 * @property {string[]} url - The URL of the media
 * @property {string?} thumbnail_url - The thumbnail URL of the media (only for videos)
 * @property {string} permalink - The permanent URL of the media
 * @property {string} createdAt - The date of the media creation (ISO 8601)
 * @property {MediaType} source_type - The type of the media (carousel | picture | video)
 * @property {MediaShareType} share_type - The type of the media share (feed | stories)
 * @property {number} comments_count - The number of comments of the media (The value is 0 if the media owner has hidden comments.)
 * @property {number} likes_count - The number of likes of the media (The value is 0 if the media owner has hidden like counts.)
 * @property {boolean} comments_enabled - Indicates if comments are enabled or disabled. (default: true)
 * @property {boolean} likes_enabled - Indicates if likes are shown or hidden. (default: true)
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "from": {
 *    "username": "user1",
 *    "userId": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 *  },
 *  "caption": "This is a picture",
 *  "url": [
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture2.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture3.jpg"
 *  ],
 *  "permalink": "https://www.ugram.links/pictures/f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2/",
 *  "createdAt": "2020-03-03T12:34:56.789Z",
 *  "source_type": "picture",
 *  "share_type": "feed",
 *  "comments_count": 0,
 *  "likes_count": 0,
 *  "comments_enabled": true,
 *  "likes_enabled": true
 * }
 * */

export type Media = {
  id: string;
  from: Owner;
  caption: string;
  source: string[];
  createdAt: string;
  source_type: MediaType;
  share_type: MediaShareType;
  comments_count: number;
  likes_count: number;
  comments_enabled: boolean;
  likes_enabled: boolean;
  thumbnail_url?: string;
};

/**
 * Represents a media creation
 * @typedef {Object} MediaCreate
 * @property {string} caption - The caption of the media
 * @property {string[]} url - The URL of the media (only for pictures)
 * @property {string?} thumbnail_url - The thumbnail URL of the media (only for videos)
 * @property {MediaType} source_type - The type of the media (carousel | picture | video)
 * @property {MediaShareType} share_type - The type of the media share (feed | stories)
 * @property {boolean} comments_enabled - Indicates if comments are enabled or disabled. (default: true)
 * @property {boolean} likes_enabled - Indicates if likes are shown or hidden. (default: true)
 * @example
 * {
 *  "caption": "This is a picture",
 *  "url": [
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture2.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture3.jpg"
 *  ],
 *  "source_type": "picture",
 *  "share_type": "feed",
 *  "comments_enabled": true,
 *  "likes_enabled": true
 * }
 * */

export type MediaCreate = {
  caption: string;
  source: string[];
  source_type: MediaType;
  share_type: MediaShareType;
  comments_enabled: boolean;
  likes_enabled: boolean;
  thumbnail_url?: string;
};

/**
 * Represents a media update
 * @typedef {Object} MediaUpdate
 * @property {string} caption - The caption of the media
 * @property {string[]} url - The URL of the media (only for pictures)
 * @property {string?} thumbnail_url - The thumbnail URL of the media (only for videos)
 * @property {MediaType} source_type - The type of the media (carousel | picture | video)
 * @property {MediaShareType} share_type - The type of the media share (feed | stories)
 * @property {boolean} comments_enabled - Indicates if comments are enabled or disabled. (default: true)
 * @property {boolean} likes_enabled - Indicates if likes are shown or hidden. (default: true)
 * @example
 * {
 *  "caption": "This is a picture",
 *  "url": [
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture2.jpg",
 *    "https://ugram-pictures.s3.amazonaws.com/myFolder/myPicture3.jpg"
 *  ],
 *  "source_type": "picture",
 *  "share_type": "feed",
 *  "comments_enabled": true,
 *  "likes_enabled": true
 * }
 * */

export type MediaUpdate = {
  caption: string;
  source: string[];
  source_type: MediaType;
  share_type: MediaShareType;
  comments_enabled: boolean;
  likes_enabled: boolean;
  thumbnail_url?: string;
};

/**
 * Represents a media delete
 * @typedef {Object} MediaDelete
 * @property {string} id - The id of the media
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type MediaDelete = {
  id: string;
};

/**
 * Represents a media get
 * @typedef {Object} MediaGet
 * @property {string} id - The id of the media
 * @example
 * {
 *  "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2"
 * }
 * */

export type MediaGet = {
  id: string;
};

/**
 * Represents a media list
 * @typedef {Object} MediaList
 * @property {string} from - The id of the owner
 * @property {string} [cursor] - The cursor to get the next page
 * @property {number} [limit] - The limit of media to get (default: 10)
 * @example
 * {
 *  "from": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "cursor": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 *  "limit": 10
 * }
 * */

export type MediaList = {
  from: string;
  cursor?: string;
  limit?: number;
};
