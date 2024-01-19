import { Clear as ClearIcon } from '@mui/icons-material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import appTheme from '../../styles/theme';
import { SearchResult } from '../../types/Search';

type SearchHistoryProps = {
  searchHistory: SearchResult[];
  setSearchHistory: (searchHistory: SearchResult[]) => void;
  onClick: (result?: SearchResult) => void;
};

export default function SearchHistory({
  searchHistory,
  setSearchHistory,
  onClick,
}: SearchHistoryProps) {
  const SearchHistoryHeader = () => {
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
          Recent
        </Typography>
        {searchHistory && searchHistory.length > 0 && (
          <Button
            size="small"
            variant="text"
            color="info"
            onClick={() => setSearchHistory([])}
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 'regular',
              '&:hover': {
                color: 'white',
                backgroundColor: 'transparent',
              },
            }}
          >
            Clear all
          </Button>
        )}
      </Box>
    );
  };

  const SearchHistoryList = () => {
    return (
      <List sx={{ width: '100%' }}>
        {searchHistory.map((result) => (
          <ListItem
            key={result.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setSearchHistory([
                    ...searchHistory.filter((previous) => previous.id !== result.id),
                  ]);
                }}
              >
                <ClearIcon
                  sx={{
                    color: 'grey',
                  }}
                />
              </IconButton>
            }
            sx={{
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
            <ListItemButton
              onClick={() => onClick(result)}
              sx={{
                m: 0,
                p: 0,
                '&:hover': {
                  borderRadius: '0',
                  backgroundColor: 'transparent',
                },
              }}
            >
              <ListItemAvatar
                sx={{
                  maxWidth: '40px',
                  maxHeight: '40px',
                  minWidth: '40px',
                  minHeight: '40px',
                }}
              >
                <Avatar
                  alt={result.title}
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
                  src={result.type === 'posts' ? undefined : result.image}
                >
                  {result.type === 'posts' ? (
                    <SearchIcon sx={{ fontSize: '20px' }} />
                  ) : null}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={result.title}
                secondary={result.description}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '14px',
                    fontWeight: 'bold',
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '14px',
                    color: 'grey',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Box sx={{ width: '100%', height: '100%', mt: 1 }}>
      <SearchHistoryHeader />

      {searchHistory.length === 0 ? (
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
            {'No recent searches.'}
          </Typography>
        </Box>
      ) : (
        <SearchHistoryList />
      )}
    </Box>
  );
}
