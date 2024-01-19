import { KeyboardBackspace as KeyboardBackspaceIcon } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

import appTheme from '../../styles/theme';
import { Filter, filters } from '../../types/Filter';
import { parseFilter, resizeBase64Img } from '../../utils/image-utils';
import Adjustments from './Adjustments';
import Filters from './Filters';
import ImgWrapper from './ImgWrapper';

const ImageEditorDialogTitle = styled(DialogTitle)({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: appTheme.palette.background.paper,
  margin: 0,
  padding: 0,
  borderBottom: `1px solid ${appTheme.palette.grey[700]}`,
});

const ImageEditorDialogContent = styled(DialogContent)({
  backgroundColor: appTheme.palette.background.paper,
  padding: 0,
  borderTop: `1px solid ${appTheme.palette.divider}`,
});

const EditingStack = styled(Stack)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'top',
  alignItems: 'top',
  overflowY: 'scroll',
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
});

const ImageEditorTabs = styled(Tabs)({
  width: '100%',
  backgroundColor: appTheme.palette.background.paper,
  color: appTheme.palette.text.primary,
  '& .Mui-selected': {
    color: appTheme.palette.text.primary,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
  },
  '& .MuiTabs-indicator': {
    color: 'white',
  },
});

const SaveButton = styled(Button)({
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: appTheme.palette.background.paper,
    color: 'white',
  },
});

const BackButton = styled(IconButton)({
  color: appTheme.palette.text.primary,
  fontSize: '1.5rem',
});

interface ImageEditorProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onEdit: (editedImage: string) => void;
}

type ImageEditorTabs = 'filters' | 'adjustments';

const ImageEditor = ({ open, onClose, imageUrl, onEdit }: ImageEditorProps) => {
  const [currentTab, setCurrentTab] = useState<ImageEditorTabs>('filters');
  const imgRef = useRef<HTMLImageElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(
    filters.get('Normal') as Filter,
  );

  const onTabChange = (tabIndex: number) => {
    if (tabIndex === 0) {
      setCurrentTab('filters');
    } else {
      setCurrentTab('adjustments');
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.style.filter = parseFilter(selectedFilter);
    }
  }, [selectedFilter]);

  const handleSave = () => {
    if (imgRef.current) {
      resizeBase64Img(imgRef.current.src, parseFilter(selectedFilter)).then(
        (resizedImg) => {
          onEdit(resizedImg);
        },
      );
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          height: '100%',
          maxWidth: { xs: '100%', sm: '60vw' },
          margin: 0,
          borderRadius: { xs: 0, sm: 3 },
          backgroundColor: 'transparent',
          border: `1px solid ${appTheme.palette.divider}`,
        },
      }}
    >
      <ImageEditorDialogTitle>
        <BackButton onClick={onClose}>
          <KeyboardBackspaceIcon />
        </BackButton>
        {'Edit Image'}
        <SaveButton onClick={handleSave} color="info">
          Next
        </SaveButton>
      </ImageEditorDialogTitle>
      <ImageEditorDialogContent>
        <Stack
          spacing={0}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '60vw' },
            height: '100%',
            backgroundColor: appTheme.palette.background.paper,
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
          }}
        >
          <ImgWrapper imgSrc={imageUrl} imgRef={imgRef} />
          <EditingStack
            spacing={0}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: '300px' },
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <ImageEditorTabs
              value={currentTab === 'filters' ? 0 : 1}
              onChange={(_, newValue) => onTabChange(newValue)}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              centered
            >
              <Tab label="Filters" />
              <Tab label="Adjustements" />
            </ImageEditorTabs>
            {currentTab === 'filters' ? (
              <Filters filter={selectedFilter} onChange={setSelectedFilter} />
            ) : (
              <Adjustments filter={selectedFilter} onChange={setSelectedFilter} />
            )}
          </EditingStack>
        </Stack>
      </ImageEditorDialogContent>
    </Dialog>
  );
};

export default ImageEditor;
