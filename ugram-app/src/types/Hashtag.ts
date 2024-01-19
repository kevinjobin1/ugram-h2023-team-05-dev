/**
 * @module types/Hashtag - The module containing the type definition for a hashtag
 */

/**
 * Represents a hashtag
 * @typedef {Object} Hashtag
 * @property {string} id - The hashtag id (v4 uuid)
 * @property {string} name - The hashtag name (without the leading #)
 * @example
 * {
 * "id": "f9b5b9b0-5b9b-11ea-8d77-2b66f5e7c4d2",
 * "name": "myHashtag"
 * }
 * */

export type Hashtag = {
  id: string;
  name: string;
};
