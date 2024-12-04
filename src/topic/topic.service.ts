import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './topic.schema';
import { CreateTopicDto } from './dto/createTopic.dto';
import { UpdateTopicDto } from './dto/updateTopic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<Topic>,
  ) {}

  async create(topicDto: CreateTopicDto): Promise<Topic> {
    try {
      const newTopic = new this.topicModel(topicDto);
      return await newTopic.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate topics not allowed');
      }
      throw error;
    }
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
  ): Promise<{ data: Topic[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.topicModel.find().skip(skip).limit(limit).exec(),
      this.topicModel.countDocuments().exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.topicModel.findById(id).exec();
    if (!topic) {
      throw new NotFoundException(`Topic  ${id} not found.`);
    }
    return topic;
  }

  async update(id: string, topicDto: UpdateTopicDto): Promise<Topic> {
    const updatedTopic = await this.topicModel
      .findByIdAndUpdate(id, topicDto, { new: true })
      .exec();

    if (!updatedTopic) {
      throw new NotFoundException(`Topic with id ${id} not found`);
    }
    return updatedTopic;
  }

  async remove(id: string): Promise<Topic> {
    const deletedTopic = await this.topicModel.findByIdAndDelete(id).exec();
    if (!deletedTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found.`);
    }
    return deletedTopic;
  }
}
