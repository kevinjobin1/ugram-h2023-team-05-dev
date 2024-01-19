import { Profile } from '../domain/profile';

export type ProfileDto = Omit<Profile, 'password'>;
