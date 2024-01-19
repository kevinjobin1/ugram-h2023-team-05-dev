import { Card, Grid, Stack, styled, Typography } from '@mui/material';
import React from 'react';

import appTheme from '../../styles/theme';
import { Filter, filters } from '../../types/Filter';

const THUMBNAIL_SIZE_PX = 88;

const FiltersGrid = styled(Grid)({
  padding: 2,
  justifyContent: 'space-between',
  width: '100%',
});

const FilterGridItem = styled(Grid, { shouldForwardProp: (prop) => prop !== 'active' })<{
  active: boolean;
}>(({ active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '4px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  color: appTheme.palette.grey[500],
  '& .MuiCard-root': {
    marginBottom: '4px',
  },
  ...(active && {
    '& .MuiCard-root': {
      transition: 'transform 0.2s ease',
      transform: 'scale(1.05)',
      border: `4px solid ${appTheme.palette.info.main}`,
      marginBottom: '4px',
    },
    '& .MuiTypography-root': {
      color: appTheme.palette.info.main,
      fontWeight: 'bold',
    },
  }),
}));

interface FiltersProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, onChange }) => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '0.2em',
          height: '0.2em',
        },
        '&::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `${appTheme.palette.secondary.main}`,
          outline: 'none',
        },
      }}
    >
      <FiltersGrid
        container
        spacing={0}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from(filters, ([filterName, filterValue]) => (
          <FilterGridItem
            item
            key={filterName}
            onClick={() => onChange(filterValue)}
            active={filter === filterValue}
          >
            <Card
              elevation={4}
              sx={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                maxWidth: {
                  xs: `${THUMBNAIL_SIZE_PX * 0.9}px`,
                  md: `${THUMBNAIL_SIZE_PX}px`,
                },
                maxHeight: {
                  xs: `${THUMBNAIL_SIZE_PX * 0.9}px`,
                  md: `${THUMBNAIL_SIZE_PX}px`,
                },
              }}
            >
              <img
                src="/thumbnail.jpg"
                alt="filter-thumbnail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: `blur(${filterValue.blur}) brightness(${filterValue.brightness}) contrast(${filterValue.contrast}) grayscale(${filterValue.grayscale}) hue-rotate(${filterValue['hue-rotate']}) invert(${filterValue.invert}) saturate(${filterValue.saturate}) sepia(${filterValue.sepia})`,
                }}
              />
            </Card>
            <Typography variant="body2">{filterName}</Typography>
          </FilterGridItem>
        ))}
      </FiltersGrid>
    </Stack>
  );
};

export default Filters;
