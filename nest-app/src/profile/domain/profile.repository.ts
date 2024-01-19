import { Profile } from './profile';

export interface ProfileRepository {
  update(profile: Profile): Promise<void>;
  create(profile: Profile): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Profile>;
  findAll(): Promise<Profile[]>;
  findByUsername(username: string, limit : number): Promise<Profile[]>;
}
