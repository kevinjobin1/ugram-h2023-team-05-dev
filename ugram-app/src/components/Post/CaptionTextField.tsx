import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface Suggestion {
  value: string;
  label: string;
}

const MAX_LENGTH = 2200;

const fetchSuggestions = async (
  query: string,
  type: 'hashtag' | 'user',
): Promise<Suggestion[]> => {
  try {
    const response = await axios.get(`/api/${type}/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

const CaptionTextField: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debouncedInputValue = useDebounce(inputValue, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const searchForSuggestions = async () => {
      const match = debouncedInputValue.match(/(?:#|@)([a-zA-Z0-9-_]+)$/);
      if (match) {
        const [, query] = match;
        const type = match[0] === '#' ? 'hashtag' : 'user';
        const newSuggestions = await fetchSuggestions(query, type);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    };

    searchForSuggestions();
  }, [debouncedInputValue]);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(event, value) => setInputValue(value)}
      options={suggestions}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Caption"
          variant="outlined"
          onChange={handleInputChange}
          inputProps={{
            ...params.inputProps,
            maxLength: MAX_LENGTH,
          }}
        />
      )}
    />
  );
};

export default CaptionTextField;
