import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { updateProfilePicture } from '../../services/picture.service';
import appTheme from '../../styles/theme';

type ProfilePictureDialogProps = {
  open: boolean;
  onClose: () => any;
  imageSource?: string;
  isOwner: boolean;
  userId: string;
};

const videoConstraints = {
  facingMode: 'user',
};

const ProfilePictureDialog: React.FC<ProfilePictureDialogProps> = ({
  open,
  onClose,
  imageSource,
  isOwner,
  userId,
}) => {
  const [image, setImage] = useState<Blob>();
  const [preview, setPreview] = useState(imageSource);
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [webcamLoading, setWebcamLoading] = useState<boolean>(true);

  const webcamRef = useRef<Webcam>(null);

  const handleUserMedia = useCallback(() => {
    setWebcamLoading(false);
  }, []);

  const handleCaptureClick = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setPreview(screenshot);
      const screenshotImg = new Image();
      screenshotImg.src = screenshot || '';
      screenshotImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = screenshotImg.width;
        canvas.height = screenshotImg.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(screenshotImg, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              setImage(blob);
            }
          });
        }
      };
    }
    isCaptureEnable && setCaptureEnable(false);
  }, [isCaptureEnable]);

  const resetForm = () => {
    setCaptureEnable(false);
    setImage(undefined);
    setPreview(imageSource);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImage(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (event) => {
      if (!event?.target?.result) {
        return;
      }
      setPreview(event.target.result.toString());
    };
  };

  const submitPicture = () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      updateProfilePicture(userId, formData).then(() => {
        resetForm();
        onClose();
      });
    }
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleOnClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogContent>
        <Stack spacing={1} minWidth={{ xs: '300px', sm: '400px', md: '500px' }}>
          {!isCaptureEnable && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="post"
                    style={{
                      height: '100%',
                      width: '100%',
                      overflow: 'hidden',
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
                      color: appTheme.palette.grey[600],
                    }}
                  >
                    {'No profile picture'}
                  </Box>
                )}
              </Box>
              {isOwner && (
                <>
                  <Stack direction="row" spacing={1}>
                    <Button
                      onClick={handleFileUploadClick}
                      variant="contained"
                      sx={{
                        width: '100%',
                        textTransform: 'none',
                        fontSize: '16px',
                        margin: '2px 0px',
                      }}
                    >
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        name="image"
                        ref={hiddenFileInput}
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                      {'Select picture from computer'}
                    </Button>
                    <IconButton
                      onClick={() => {
                        setWebcamLoading(true);
                        setCaptureEnable(!isCaptureEnable);
                      }}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      sx={{
                        marginLeft: '5px',
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Stack>

                  <Button
                    onClick={submitPicture}
                    disabled={!image}
                    variant="contained"
                    sx={{ textTransform: 'none', fontSize: '16px' }}
                  >
                    Send
                  </Button>
                </>
              )}
            </>
          )}
          {isCaptureEnable && (
            <>
              {webcamLoading && (
                <>
                  <CircularProgress
                    sx={{
                      color: appTheme.palette.primary.main,
                      position: 'absolute',
                      top: '45%',
                      left: '48%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
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
                  />
                </>
              )}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                style={{
                  display: webcamLoading ? 'none' : 'block',
                  minHeight: '300px',
                  objectFit: 'cover',
                }}
              />
              <Button
                disabled={webcamLoading}
                onClick={handleCaptureClick}
                variant="contained"
                sx={{
                  width: '100%',
                  textTransform: 'none',
                  fontSize: '16px',
                  margin: '2px 0px',
                }}
              >
                {'Take picture'}
              </Button>
              <Button
                onClick={() => setCaptureEnable(!isCaptureEnable)}
                variant="outlined"
                sx={{
                  width: '100%',
                  textTransform: 'none',
                  fontSize: '16px',
                  margin: '2px 0px',
                }}
              >
                {'Cancel'}
              </Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureDialog;
