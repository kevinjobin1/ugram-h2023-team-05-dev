import { Search as SearchIcon } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

import appTheme from '../../styles/theme';
import { SearchResult } from '../../types/Search';

type SearchResultsProps = {
  searchResults: SearchResult[];
  setSearchResults: (searchResults?: SearchResult[]) => void;
  searchHistory: SearchResult[];
  setSearchHistory: (searchHistory: SearchResult[]) => void;
  onClose: (result?: SearchResult) => void;
  showHeader?: boolean;
};

const SearchResultsHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ml: 2,
        mr: 1,
        mt: 1,
        height: '50px',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        Results
      </Typography>
    </Box>
  );
};

export default function SearchResults({
  searchResults,
  setSearchResults,
  searchHistory,
  setSearchHistory,
  onClose,
  showHeader = true,
}: SearchResultsProps) {
  return (
    <>
      {showHeader ? <SearchResultsHeader /> : null}
      {searchResults.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
            width: '100%',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'grey',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {'No results found.'}
          </Typography>
        </Box>
      ) : (
        searchResults.map((result) => (
          <Box
            key={result.id}
            onClick={() => {
              if (!searchHistory.find((previous) => previous.id === result.id)) {
                setSearchHistory([...searchHistory, result]);
              }
              setSearchResults(undefined);
              onClose(result);
            }}
            sx={{
              display: 'flex',
              left: '0',
              padding: 2,

              '&:hover': {
                borderRadius: '0',
                backgroundColor: {
                  sm: appTheme.palette.background.paper,
                  xs: appTheme.palette.grey[900],
                },
                cursor: 'pointer',
              },
            }}
          >
            <Avatar
              sx={{
                width: '40px',
                height: '40px',
                color: appTheme.palette.text.primary,
                backgroundColor: `${
                  result.type === 'posts'
                    ? appTheme.palette.grey[700]
                    : appTheme.palette.background.default
                }`,
                border: `1px solid ${appTheme.palette.grey[700]}`,
              }}
              alt={result.title}
              src={result.type === 'posts' ? undefined : result.image}
            >
              {result.type === 'posts' ? <SearchIcon sx={{ fontSize: '20px' }} /> : null}
            </Avatar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {result.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'grey',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {result.description}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </>
  );
}
