import { Dialog } from '@mui/material';
import React, { useState } from 'react';

import { postPicture } from '../../services/picture.service';
import appTheme from '../../styles/theme';
import CaptionEditor from './CaptionEditor';
import ImageCropper from './ImageCropper';
import ImageEditor from './ImageEditor';
import ImageUploader from './ImageUploader';

export interface AddPostDialogProps {
  open: boolean;
  onClose: () => any;
}

type AddPostDialogSteps = 'upload' | 'crop' | 'edit' | 'caption' | 'done';

const AddPostDialog: React.FC<AddPostDialogProps> = ({ open, onClose }) => {
  const [uploadedImage, setUploadedImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [currentStep, setCurrentStep] = useState<AddPostDialogSteps>('upload');

  const handleOnUploadSuccess = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep('crop');
  };

  const handleOnImageCropped = (imageUrl: string) => {
    setCroppedImage(imageUrl);
    setCurrentStep('edit');
  };

  const handleOnEditSuccess = (imageUrl: string) => {
    setEditedImage(imageUrl);
    setCurrentStep('caption');
  };

  const handleOnCropCancel = () => {
    setUploadedImage('');
    setCroppedImage('');
    setEditedImage('');
    setCurrentStep('upload');
  };

  const handleOnEditCancel = () => {
    setEditedImage('');
    setCurrentStep('crop');
  };

  const handleOnCaptionCancel = () => {
    setCurrentStep('edit');
  };

  const handleOnClose = () => {
    setUploadedImage('');
    setCroppedImage('');
    setEditedImage('');
    onClose();
    setCurrentStep('upload');
  };

  const handleCreatePost = (image: Blob, caption: string) => {
    if (image.size === 0) {
      window.alert('An error occured trying to upload the image. Please try again.');
      return;
    }
    const postData = new FormData();
    postData.append('image', image);
    postData.append('description', caption);
    postPicture(postData).then(() => {
      handleOnClose();
      window.location.reload();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          padding: 0,
          borderRadius: 0,
          backgroundColor: `${appTheme.palette.background.paper}`,
        },
      }}
    >
      {currentStep === 'upload' && (
        <ImageUploader
          open={true}
          onClose={handleOnClose}
          onUploadSuccess={handleOnUploadSuccess}
        />
      )}
      {currentStep === 'crop' && (
        <ImageCropper
          open={true}
          onClose={handleOnCropCancel}
          imageUrl={uploadedImage}
          onImageCropped={handleOnImageCropped}
        />
      )}
      {currentStep === 'edit' && (
        <ImageEditor
          open={true}
          onClose={handleOnEditCancel}
          imageUrl={croppedImage}
          onEdit={handleOnEditSuccess}
        />
      )}
      {currentStep === 'caption' && (
        <CaptionEditor
          open={true}
          onClose={handleOnCaptionCancel}
          imageUrl={editedImage}
          onSubmit={handleCreatePost}
        />
      )}
    </Dialog>
  );
};

export default AddPostDialog;
