import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import appTheme from '../../styles/theme';

type SearchInputProps = {
  onSearch: (keyword: string) => Promise<void>;
  onClick?: () => any;
  onClear?: () => void;
  onFocus?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
};

function SearchInput({ onSearch, onClear, onFocus, inputRef }: SearchInputProps) {
  const [keyword, setSearchText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(async () => {
        await onSearch(keyword);
        setIsTyping(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [keyword, isTyping, onSearch]);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setIsTyping(true);
    setSearchText(event.target.value);
  };

  const handleOnFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleOnClear = () => {
    setSearchText('');
    onClear && onClear();
  };

  return (
    <>
      <FormControl
        sx={{
          display: 'flex',
          margin: '10px',
          minWidth: '130px',
        }}
        variant="outlined"
      >
        <OutlinedInput
          ref={inputRef}
          autoComplete="off"
          placeholder="Search"
          inputProps={{ 'aria-label': 'search user' }}
          size="small"
          value={keyword}
          onChange={handleTextChange}
          onFocus={handleOnFocus}
          endAdornment={
            isFocused ? (
              <InputAdornment position="end">
                {isTyping ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton onClick={handleOnClear}>
                    <ClearIcon
                      sx={{
                        color: appTheme.palette.background.paper,
                        fontSize: '1rem',
                        backgroundColor: appTheme.palette.grey[500],
                        p: '2px',
                        borderRadius: '50%',
                      }}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ) : null
          }
          startAdornment={
            !isFocused ? (
              <InputAdornment position="start" sx={{ p: '0', m: '0' }}>
                <IconButton disabled aria-label="search">
                  <SearchIcon
                    sx={{
                      color: 'common.white',
                      fontSize: '1.5rem',
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ) : null
          }
          sx={{
            border: 'none',
            backgroundColor: 'background.paper',
            borderRadius: '10px',
            padding: '0 10px',
            '&:hover': {
              border: 'none',
            },
            '&.Mui-focused': {
              border: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
      </FormControl>
    </>
  );
}

export default SearchInput;
