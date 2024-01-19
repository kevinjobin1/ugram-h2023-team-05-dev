import {
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  FlipCameraIos as FlipCameraIosIcon,
  Folder as FolderIcon,
  NoPhotography,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/system';
import { useCallback, useRef, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';

import { ReactComponent as DragAndDrogSvgIcon } from '../../../public/drag-and-drop.svg';
import appTheme from '../../styles/theme';

interface ImageUploaderContainerProps {
  accepted: boolean;
  rejected: boolean;
}

interface ImageUploaderProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: (image: string) => void;
}

const ImageUploaderContainer = styled('div')<ImageUploaderContainerProps>(
  ({ accepted, rejected }) => ({
    // color: accepted ? appTheme.palette.info.main : appTheme.palette.text.primary,
    color: accepted
      ? 'rgba(0, 255, 0, 0.4)'
      : rejected
      ? 'rgba(255, 0, 0, 0.4)'
      : appTheme.palette.text.primary,
    width: '100%',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: !accepted ? appTheme.palette.background.paper : grey[900],
    backgroundColor: accepted
      ? 'rgba(0, 255, 0, 0.1)'
      : rejected
      ? 'rgba(255, 0, 0, 0.1)'
      : appTheme.palette.background.paper,
  }),
);

interface AcceptedImages {
  [key: string]: string[];
}

const acceptedImages: AcceptedImages = {
  'image/jpeg': ['.jpeg', '.png'],
};

const alertIcons = {
  success: <CheckCircleIcon sx={{ color: grey[900] }} />,
  error: <ErrorIcon sx={{ color: red[500] }} />,
  cameraPermission: <NoPhotography sx={{ color: red[500] }} />,
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  open,
  onClose,
  onUploadSuccess,
}) => {
  // const [image, setImage] = useState<Blob>(new Blob());
  const [cameraPermission, setCameraPermission] = useState(false);
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const [webcamLoading, setWebcamLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>();
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>(
    'user',
  );
  const [capturedImage, setCapturedImage] = useState<string | undefined>(undefined);

  const webcamRef = useRef<Webcam>(null);

  const handleUserMedia = useCallback(() => {
    setWebcamLoading(false);
  }, []);

  const handleConfirmClick = useCallback(() => {
    if (capturedImage) {
      const screenshotImg = new Image();
      screenshotImg.src = capturedImage || '';
      screenshotImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = screenshotImg.width;
        canvas.height = screenshotImg.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(screenshotImg, 0, 0);
          onUploadSuccess(canvas.toDataURL());
        }
      };
    }
  }, [capturedImage, onUploadSuccess]);

  const handleCancelClick = useCallback(() => {
    setCapturedImage(undefined);
    setWebcamLoading(true);
  }, []);

  const handleCaptureClick = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setCapturedImage(screenshot);
    }
  }, []);

  const handleFlipCameraClick = useCallback(() => {
    setCameraFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  const getCameraPermission = useCallback(async () => {
    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true })
      .catch(() => {
        setShowAlert(true);
        setAlertMessage('Camera permission denied');
        setAlertDescription('Please allow camera permission to use this feature');
        setAlertIcon(alertIcons.cameraPermission);
        return null;
      });
    setCameraPermission(stream !== null);
  }, []);

  const onCameraClick = useCallback(async () => {
    if (cameraPermission === false) {
      await getCameraPermission();
    }

    setCaptureEnable(true);
    setWebcamLoading(true);
  }, [cameraPermission, getCameraPermission]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        setShowAlert(true);
        setAlertMessage('Could not upload the image');
        setAlertDescription('Please upload a file less than 5MB in JPEG or PNG format');
        setAlertIcon(alertIcons.error);
        return;
      } else {
        setShowAlert(false);
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onUploadSuccess(reader.result as string);
      };
    },
    [onUploadSuccess],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      minSize: 0,
      maxSize: 5242880,
      maxFiles: 1,
      accept: acceptedImages,
      disabled: false,
      multiple: false,
      noClick: true,
      noKeyboard: true,
    });

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: { xs: '100%', sm: '60vw', md: '50vw', lg: '40vw', xl: '30vw' },

            margin: 0,
            borderRadius: { xs: 0, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            minHeight: '3rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            m: 0,
            py: 1,
            fontSize: '1rem',
            backgroundColor: appTheme.palette.background.paper,
            margin: 0,
            padding: 0,
            borderBottom: `1px solid ${appTheme.palette.grey[700]}`,
          }}
        >
          Create a new post
        </DialogTitle>
        <Divider />

        <DialogContent
          sx={{
            m: 0,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tabs
            value={isCaptureEnable ? 1 : 0}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            aria-label="post photo upload options tabs"
          >
            <Tab
              label="Upload"
              icon={<FolderIcon />}
              onClick={() => {
                setCaptureEnable(false);
                setShowAlert(false);
                setWebcamLoading(true);
                setCapturedImage(undefined);
              }}
            />
            <Tab label="Camera" icon={<PhotoCameraIcon />} onClick={onCameraClick} />
          </Tabs>

          {!isCaptureEnable && (
            <ImageUploaderContainer
              {...getRootProps({ className: 'dropzone' })}
              accepted={isDragAccept}
              rejected={isDragReject}
              sx={{
                minHeight: { xs: '100%', sm: '60vh' },
              }}
            >
              <SvgIcon
                sx={{
                  height: 77,
                  width: 96,
                  animation: isDragAccept || isDragReject ? 'tilt-shaking 0.4s' : 'none',
                  animationIterationCount: '3',
                }}
                component={
                  isDragAccept
                    ? CheckCircleIcon
                    : isDragReject
                    ? ErrorIcon
                    : DragAndDrogSvgIcon
                }
                inheritViewBox
              />

              <Typography
                variant="h6"
                sx={{
                  my: 2,
                  fontWeight: 'normal',
                  color: appTheme.palette.text.primary,
                }}
              >
                {isDragAccept
                  ? 'Drop it like it is hot!'
                  : isDragReject
                  ? `Only ${acceptedImages['image/jpeg'].join(', ')} files are accepted`
                  : 'Drag and drop your photo here'}
              </Typography>

              <Button
                variant="contained"
                component="label"
                disabled={isDragActive}
                color="info"
                sx={{ my: 2, textTransform: 'none' }}
              >
                <input {...getInputProps()} hidden />
                {'Select from files'}
              </Button>
            </ImageUploaderContainer>
          )}
          {isCaptureEnable && (
            <>
              {webcamLoading && (
                <>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height="100%"
                    sx={{
                      minHeight: '400px',
                      backgroundColor: appTheme.palette.grey[900],
                    }}
                  />
                  <CircularProgress
                    size={36}
                    sx={{
                      position: 'absolute',
                      top: '55%',
                      left: '48%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </>
              )}
              {!capturedImage ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: `${cameraFacingMode}` }}
                  onUserMedia={handleUserMedia}
                  style={{
                    display: webcamLoading ? 'none' : 'block',
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                    backgroundColor: appTheme.palette.grey[900],
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={capturedImage}
                    alt="capturedImage"
                    style={{
                      display: webcamLoading ? 'none' : 'block',
                      width: '100%',
                      height: '100%',
                      minHeight: '400px',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  position: 'absolute',
                  top: '90%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: appTheme.palette.background.paper,
                  opacity: webcamLoading ? 0 : 0.9,
                  borderRadius: 12,
                  p: 1,
                  m: 1,
                  transition: 'all 0.3s ease-in-out',
                  '& .MuiIconButton-root': {
                    textTransform: 'none',
                    transition: 'all 0.3s ease-in-out',
                    color: appTheme.palette.grey[300],
                    border: `1px solid ${appTheme.palette.background.paper}`,
                  },
                }}
              >
                {!capturedImage ? (
                  <>
                    <IconButton disabled={webcamLoading} onClick={handleCaptureClick}>
                      <PhotoCameraIcon
                        sx={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={handleFlipCameraClick}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          '&:hover': {
                            color: appTheme.palette.text.primary,
                          },
                        },
                      }}
                    >
                      <FlipCameraIosIcon
                        sx={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={handleConfirmClick}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          color: appTheme.palette.success.main,
                        },
                      }}
                    >
                      <CheckIcon
                        sx={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={handleCancelClick}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          color: appTheme.palette.primary.main,
                        },
                      }}
                    >
                      <CloseIcon
                        sx={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    </IconButton>
                  </>
                )}
              </Stack>
            </>
          )}
          {showAlert ? (
            <Alert
              icon={alertIcon}
              severity="error"
              onClose={() => {
                if (isCaptureEnable) {
                  setWebcamLoading(false);
                  setCaptureEnable(false);
                }
                setShowAlert(false);
              }}
              sx={{ position: 'absolute', top: '50%', left: '20%', width: '60%' }}
            >
              <AlertTitle>{alertMessage}</AlertTitle>
              {alertDescription}
            </Alert>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploader;
