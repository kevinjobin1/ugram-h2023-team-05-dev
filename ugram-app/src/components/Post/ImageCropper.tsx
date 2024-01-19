import {
  AspectRatio as AspectRatioIcon,
  CropLandscape as CropLandscapeIcon,
  CropOriginal as CropOriginalIcon,
  CropPortrait as CropPortraitIcon,
  CropSquare as CropSquareIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  IconButton,
  Slider,
  Stack,
} from '@mui/material';
import { useCallback, useState } from 'react';
import React from 'react';
import Cropper, { Area, MediaSize, Point } from 'react-easy-crop';

import appTheme from '../../styles/theme';

type ImageCropperProps = {
  open: boolean;
  onClose: () => any;
  imageUrl: string;
  onImageCropped: (imageUrl: string) => void;
};

const CROP_ZOOM = {
  min: 1,
  max: 3,
  step: 0.01,
  scrollSpeed: 0.02,
  default: 1,
};

type AspectRatio = {
  label: string;
  icon: JSX.Element;
  value: number;
};

const ImageCropper: React.FC<ImageCropperProps> = ({
  open,
  onClose,
  imageUrl,
  onImageCropped,
}) => {
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showAspectRatios, setShowAspectRatios] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(CROP_ZOOM.default);
  const [croppedArea, setCroppedArea] = useState<Area>();
  const [mediaSize, setMediaSize] = useState<MediaSize>();

  const aspectRatios: AspectRatio[] = [
    {
      label: 'Original',
      value: mediaSize ? mediaSize.naturalWidth / mediaSize.naturalHeight : 1,
      icon: <CropOriginalIcon />,
    },
    { label: '1:1', value: 1, icon: <CropSquareIcon /> },
    { label: '4:5', value: 4 / 5, icon: <CropPortraitIcon /> },
    { label: '16:9', value: 16 / 9, icon: <CropLandscapeIcon /> },
  ];

  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0].value);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area): void => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCropChange = useCallback((newCrop: Point) => {
    setCrop(newCrop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onInteractionEnd = useCallback(() => {
    setShowGrid(false);
  }, []);

  const onInteractionStart = useCallback(() => {
    setShowGrid(true);
    setShowZoomSlider(false);
    setShowAspectRatios(false);
  }, []);

  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    return setMediaSize(mediaSize);
  }, []);

  const handleImageCropped = () => {
    if (croppedArea) {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = croppedArea.width;
          canvas.height = croppedArea.height;
          ctx.drawImage(
            image,
            croppedArea.x,
            croppedArea.y,
            croppedArea.width,
            croppedArea.height,
            0,
            0,
            croppedArea.width,
            croppedArea.height,
          );
          const croppedImage = canvas.toDataURL();
          onImageCropped(croppedImage);
        }
      };
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: { xs: '100%', sm: '60vw', md: '50vw', lg: '40vw', xl: '30vw' },
          margin: 0,
          borderRadius: { xs: 0, sm: 3 },
          backgroundColor: 'transparent',
          border: `1px solid ${appTheme.palette.divider}`,
        },
      }}
    >
      <DialogTitle
        sx={{
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
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            color: appTheme.palette.text.primary,
            fontSize: '1.5rem',
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>

        {'Crop Image'}

        <Button
          onClick={handleImageCropped}
          color="info"
          sx={{
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: appTheme.palette.background.paper,
              color: 'white',
            },
          }}
        >
          Next
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          p: 0,
          m: 0,
          backgroundColor: appTheme.palette.grey[700],
        }}
      >
        <Cropper
          image={imageUrl}
          aspect={aspectRatio}
          zoom={zoom}
          crop={crop}
          minZoom={CROP_ZOOM.min}
          maxZoom={CROP_ZOOM.max}
          zoomSpeed={CROP_ZOOM.scrollSpeed}
          showGrid={showGrid}
          objectFit="horizontal-cover"
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onInteractionStart={onInteractionStart}
          onInteractionEnd={onInteractionEnd}
          onCropComplete={onCropComplete}
          onMediaLoaded={onMediaLoaded}
          style={{
            containerStyle: {
              minHeight: '70vh',
              position: 'relative',
            },
            cropAreaStyle: {
              border: showGrid ? `1px solid ${appTheme.palette.divider}` : 'none',
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          m: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        {showAspectRatios && (
          <Fade in={showAspectRatios} timeout={500}>
            <Box
              sx={{
                mb: 2,
                mt: 0,
                mx: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '5px',
                backgroundColor: 'rgba(20, 20, 20, 0.5)',
                opacity: 0.5,
              }}
            >
              {aspectRatios.map((ratio) => (
                <Button
                  endIcon={ratio.icon}
                  key={ratio.label}
                  onClick={() => setAspectRatio(ratio.value)}
                  sx={{
                    width: '100%',
                    color: appTheme.palette.text.primary,
                    fontWeight: 'bold',
                    borderRadius: 0,
                    textTransform: 'none',
                    opacity: ratio.value === aspectRatio ? 1 : 0.5,
                    backgroundColor: 'transparent',
                    borderBottom: `1px solid ${appTheme.palette.divider}`,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {ratio.label}
                </Button>
              ))}
            </Box>
          </Fade>
        )}

        {showZoomSlider && (
          <Fade in={showZoomSlider} timeout={500}>
            <Box
              sx={{
                width: '180px',
                height: '40px',
                px: 2,
                py: 0,
                mb: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appTheme.palette.background.paper,
                borderRadius: '5px',
              }}
            >
              <Slider
                defaultValue={CROP_ZOOM.default}
                aria-label="zoom"
                step={CROP_ZOOM.step}
                value={zoom}
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                getAriaValueText={(value) => `${Math.round(value * 100)}%`}
                valueLabelDisplay="auto"
                color="secondary"
                onChange={(_, value) => {
                  setZoom(value as number);
                }}
                min={CROP_ZOOM.min}
                max={CROP_ZOOM.max}
                sx={{
                  color: appTheme.palette.text.primary,
                  '& .MuiSlider-thumb': {
                    color: appTheme.palette.text.primary,
                  },
                  '& .MuiSlider-rail': {
                    color: appTheme.palette.background.default,
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: appTheme.palette.text.primary,
                    color: appTheme.palette.background.default,
                  },
                }}
              />
            </Box>
          </Fade>
        )}
        <Stack direction="row" spacing={0} sx={{ width: '100%' }}>
          <IconButton
            onClick={() => {
              setShowZoomSlider(false);
              setShowAspectRatios(!showAspectRatios);
            }}
            sx={{
              backgroundColor: showAspectRatios
                ? appTheme.palette.text.primary
                : 'transparent',
              color: appTheme.palette.text.primary,
              fontSize: '1.5rem',
              marginRight: '10px',
              opacity: !showZoomSlider ? 0.8 : 0.5,
              '&:hover': {
                backgroundColor: showAspectRatios
                  ? appTheme.palette.text.primary
                  : 'transparent',
                color: appTheme.palette.text.primary,
                opacity: showAspectRatios ? 1 : 0.6,
              },
            }}
          >
            <AspectRatioIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowAspectRatios(false);
              setShowZoomSlider(!showZoomSlider);
            }}
            sx={{
              backgroundColor: showZoomSlider
                ? appTheme.palette.text.primary
                : 'transparent',
              color: appTheme.palette.text.primary,
              fontSize: '1.5rem',
              marginRight: '10px',
              opacity: !showAspectRatios ? 0.8 : 0.5,
              '&:hover': {
                backgroundColor: showZoomSlider
                  ? appTheme.palette.text.primary
                  : 'transparent',
                color: appTheme.palette.text.primary,
                opacity: showZoomSlider ? 1 : 0.6,
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
