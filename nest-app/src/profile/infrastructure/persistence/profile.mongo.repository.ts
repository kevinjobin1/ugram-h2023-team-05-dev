import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from 'src/profile/domain/profile';
import { ProfileRepository } from 'src/profile/domain/profile.repository';

export class MongoProfileRepository implements ProfileRepository {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async update(profile: Profile): Promise<void> {
    await this.profileModel.updateOne({ userId: profile.userId }, profile).exec();
  }

  async findById(id: string): Promise<Profile> {
    return await this.profileModel.findOne({ userId: id }).exec();
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find().exec();
  }

  async create(profile: Profile): Promise<void> {
    await this.profileModel.create(profile);
  }

  async findByUsername(username: string, limit: number): Promise<Profile[]> {
    const regex = new RegExp('^.*' + username + '.*$', 'i'); // case-insensitive regex

    try {
      const profiles = await this.profileModel
        .find({ username: { $regex: regex } })
        .limit(limit)
        .exec();

      return profiles;
    } catch (err) {
      throw new Error(`Error retrieving profiles by username: ${err.message}`);
    }
  }

  async delete(userId: string): Promise<void> {
    await this.profileModel.deleteOne({ userId: userId }).exec();
  }
}
