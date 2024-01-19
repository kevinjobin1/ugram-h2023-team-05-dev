import client from '../modules/axios-client';
import { SearchResult, SearchType } from '../types/Search';

export const fetchSuggestions = async (
  query: string,
  type: SearchType,
): Promise<SearchResult[]> => {
  try {
    const response = await client.get(`/search/${type}/`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
