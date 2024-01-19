import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface ImgWrapperProps {
  imgRef: React.RefObject<HTMLImageElement>;
  imgSrc: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined;
  imgAlt?: string;
}

const ImgContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const Img = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
});

const ImgWrapper: React.FC<ImgWrapperProps> = ({ imgRef, imgSrc, onLoad, imgAlt }) => {
  return (
    <ImgContainer>
      <Img src={imgSrc} ref={imgRef} onLoad={onLoad} alt={imgAlt} />
    </ImgContainer>
  );
};

export default ImgWrapper;
