import { Image } from '../domain/image';

export interface ImagesRepository {
  save(image: Image): Promise<Image>;
}
