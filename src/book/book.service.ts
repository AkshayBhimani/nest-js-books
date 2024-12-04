import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './book.schema';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(bookDto: CreateBookDto): Promise<Book> {
    try {
      const newBook = new this.bookModel(bookDto);
      return await newBook.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate ISbn');
      }
      throw error;
    }
  }

  async findAll(
    limit: number = 10,
    page: number = 1,
    topicIds?: string[],
  ): Promise<{ data: Book[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter = topicIds?.length ? { topics: { $in: topicIds } } : {};

    const [data, total] = await Promise.all([
      this.bookModel
        .find(filter)
        .populate({ path: 'topics', model: 'Topic' })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel
      .findById(id)
      .populate({ path: 'topics', model: 'Topic' })
      .exec();
    if (!book) {
      throw new NotFoundException(`Book id: ${id} not found.`);
    }
    return book;
  }

  async update(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, bookDto, { new: true })
      .populate({ path: 'topics', model: 'Topic' })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    return deletedBook;
  }

  async findByTopic(topicId: string): Promise<Book[]> {
    return this.bookModel
      .find({ topics: topicId })
      .populate({ path: 'topics', model: 'Topic' })
      .exec();
  }
}
