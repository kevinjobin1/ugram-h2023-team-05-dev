import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
require('dotenv').config();

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = 'ugram-pictures';

export const uploadToS3 = async (userId: string, file: string, imageId: string) => {
  const key = `${userId}/${imageId}`;
  const imageData = file.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(imageData, 'base64');
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  const putObjectCommand = new PutObjectCommand(params);
  try {
    const data = await s3Client.send(putObjectCommand);
    console.log('Object uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading object to S3:', error);
  }
};

const getImageKeysByUser = async (userId) => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: userId,
  });

  const { Contents = [] } = await s3Client.send(command);

  return Contents.map((image) => image.Key);
};

export const getUserPresignedUrls = async (userId) => {
  try {
    const imageKeys = await getImageKeysByUser(userId);

    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
        return getSignedUrl(s3Client, command, { expiresIn: 5000 });
      }),
    );
    return presignedUrls;
  } catch (error) {
    console.log(error);
    return error;
  }
};
