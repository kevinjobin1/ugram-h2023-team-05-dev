export interface ImagesHostingService {
  upload(key: string, buffer: Buffer, contentType: string): Promise<string>;
}
