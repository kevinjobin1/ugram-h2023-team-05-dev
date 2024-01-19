/**
 * The search result type
 * @typedef {Object} SearchResult
 * @property {string} id - The id of the search result
 * @property {string} title - The title of the search result
 * @property {string} description - The description of the search result
 * @property {string} image - The image of the search result
 * @property {SearchType} type - The type of the search result
 */
export type SearchType = 'profiles' | 'posts' | 'tags' | 'locations';

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: SearchType;
  keyword: string;
};

export interface Suggestions {
  label: string;
  value: string;
}
