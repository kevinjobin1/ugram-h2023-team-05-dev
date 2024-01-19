import { Box, Popover } from '@mui/material';

import appTheme from '../../styles/theme';
import { SearchResult } from '../../types/Search';
import SearchHistory from './SearchHistory';
import SearchResults from './SearchResults';

type SearchPopoverProps = {
  open: boolean;
  onClick: (result?: SearchResult) => void;
  // onBlur: () => void;
  anchorEl: React.RefObject<HTMLDivElement>;
  searchResults: SearchResult[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[] | undefined>>;
  searchHistory: SearchResult[];
  setSearchHistory: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  onClose: () => void;
};

const SearchPopover: React.FC<SearchPopoverProps> = ({
  open,
  onClick,
  anchorEl,
  searchResults,
  setSearchResults,
  searchHistory,
  setSearchHistory,
  onClose,
}: SearchPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl.current}
      onClose={onClose}
      // onBlur={onClose}
      BackdropProps={{
        invisible: true,
      }}
      disableEnforceFocus
      disableAutoFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mt: '10px',
          '&::before': {
            backgroundColor: appTheme.palette.background.paper,
            content: '""',
            display: 'block',
            position: 'absolute',
            width: 12,
            height: 12,
            top: -6,
            transform: 'rotate(45deg)',
            left: 'calc(50% - 6px)',
          },
        }}
      />
      <Box
        sx={{
          width: '80vw',
          maxWidth: '400px',
          minHeight: '40vh',
          p: 0,
          mt: '10px',
          backgroundColor: appTheme.palette.background.paper,
          borderRadius: '5px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        }}
      >
        {searchResults ? (
          <>
            <SearchResults
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              onClose={(result?: SearchResult) => {
                onClick(result);
                onClose();
              }}
            />
          </>
        ) : (
          <SearchHistory
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
            onClick={(result?: SearchResult) => {
              onClick(result);
              onClose();
            }}
          />
        )}
      </Box>
    </Popover>
  );
};

export default SearchPopover;
