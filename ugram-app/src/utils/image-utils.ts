import { Filter } from '../types/Filter';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;

export const parseFilter = (filter: Filter) => {
  const filterString = Object.entries(filter)
    .map(([key, value]) => {
      if (key !== 'background' && key !== 'mix-blend-mode') {
        return `${key}(${value})`;
      }
      return '';
    })
    .join(' ');
  return filterString;
};

export const resizeBase64Img = async (
  base64: string,
  filter?: string,
): Promise<string> => {
  if (typeof document === 'undefined') {
    throw new Error('The document object is not available');
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = base64;
  });

  const imgRatio = img.width / img.height;
  let newWidth: number;
  let newHeight: number;

  if (img.width >= img.height) {
    newWidth = Math.min(img.width, MAX_WIDTH);
    newHeight = newWidth / imgRatio;
  } else {
    newHeight = Math.min(img.height, MAX_HEIGHT);
    newWidth = newHeight * imgRatio;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;

  if (!context) throw new Error('Failed to get canvas context');
  context.drawImage(img, 0, 0, newWidth, newHeight);
  if (filter) context.filter = filter;
  context.drawImage(canvas, 0, 0);

  return canvas.toDataURL();
};

export const convertBase64toBlob = async (base64: string): Promise<Blob> => {
  const response = await fetch(base64);
  const blob = await response.blob();
  return blob;
};
