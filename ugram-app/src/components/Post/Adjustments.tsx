import { Fade, Grid, Slider, Stack, styled, Typography } from '@mui/material';

import appTheme from '../../styles/theme';
import { Filter, FilterAttribute, filterAttributes } from '../../types/Filter';

const AdjustmentsGrid = styled(Grid)({
  padding: 2,
  justifyContent: 'space-between',
  width: '100%',
});

const AdjustmentGridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '4px',
  cursor: 'pointer',
});

const AdjustmentHeader = styled(Stack)({
  flexDirection: 'row',
  width: '100%',
  maxWidth: '250px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Reset = styled(Typography)({
  cursor: 'pointer',
  color: appTheme.palette.info.main,
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: appTheme.palette.background.paper,
    color: 'white',
  },
});

const AdjustmentContent = styled(Stack)({
  flexDirection: 'row',
  width: '100%',
  maxWidth: '250px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const AdjustmentLabel = styled(Typography)({
  textTransform: 'capitalize',
});

const AdjustmentSlider = styled(Slider)({
  my: 1,
  mr: 2,
  maxWidth: '200px',
  transition: 'all 0.3s ease',
  '& .MuiSlider-thumb': {
    width: '18px',
    height: '18px',
    backgroundColor: appTheme.palette.text.primary,
    // '&:hover': {
    //   boxShadow: `0px 0px 0px 8px ${appTheme.palette.text.primary}33`,
    // },
    '&.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 14px ${appTheme.palette.text.primary}33`,
    },
  },
  '& .MuiSlider-rail': {
    height: '3px',
    borderRadius: '2px',
    backgroundColor: appTheme.palette.secondary.main,
  },
  '& .MuiSlider-track': {
    height: '4px',
    borderRadius: '2px',
    backgroundColor: appTheme.palette.secondary.main,
  },
  '& .MuiSlider-mark': {
    backgroundColor: appTheme.palette.text.primary,
  },
  '& .MuiSlider-markLabel': {
    backgroundColor: appTheme.palette.text.primary,
  },
});

interface AdjustmentsProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const Adjustments: React.FC<AdjustmentsProps> = ({ filter, onChange }) => {
  const getValue = (attribute: FilterAttribute) => {
    return filter[attribute]
      ? parseInt(filter[attribute].replace('%' || 'deg' || 'px', ''))
      : 0;
  };

  const setValue = (attribute: FilterAttribute, value: number) => {
    const newFilter = { ...filter };
    newFilter[attribute] = `${value}${filterAttributes.get(attribute)?.unit || ''}`;
    onChange(newFilter);
  };

  const getDefaultValue = (attribute: FilterAttribute) => {
    return filterAttributes.get(attribute)?.default || 0;
  };

  return (
    <AdjustmentsGrid
      container
      rowGap={0}
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
      {Array.from(
        filterAttributes,
        ([attribute, attributeValue]) =>
          attribute !== 'background' &&
          attribute !== 'mix-blend-mode' && (
            <AdjustmentGridItem item xs={12} key={attribute}>
              <AdjustmentHeader
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <AdjustmentLabel>{attribute}</AdjustmentLabel>
                <Fade in={getValue(attribute) !== getDefaultValue(attribute)}>
                  <Reset
                    onClick={() => {
                      setValue(attribute, getDefaultValue(attribute));
                    }}
                    color="info"
                    variant="body2"
                  >
                    {'Reset'}
                  </Reset>
                </Fade>
              </AdjustmentHeader>
              <AdjustmentContent spacing={1}>
                <AdjustmentSlider
                  size="small"
                  color="secondary"
                  defaultValue={attributeValue.default}
                  value={getValue(attribute)}
                  onChange={(_, value) => setValue(attribute, value as number)}
                  aria-labelledby="discrete-slider"
                  step={attributeValue.step}
                  marks
                  min={attributeValue.min}
                  max={attributeValue.max}
                />
                <Typography variant="caption">{getValue(attribute)}</Typography>
              </AdjustmentContent>
            </AdjustmentGridItem>
          ),
      )}
    </AdjustmentsGrid>
  );
};

export default Adjustments;
