import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { BooksService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiResponse({ status: 201, description: 'Book added.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of books per page (default  10)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default  1)',
  })
  @ApiQuery({
    name: 'topicIds',
    required: false,
    type: String,
    description: 'Comma separated list of topic IDs to filter books by topic',
  })
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of books' })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('topicIds') topicIds?: string,
  ) {
    {
      const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit;
      const parsedPage = typeof page === 'string' ? parseInt(page) : page;

      const topicsArray = topicIds ? topicIds.split(',') : undefined;

      return this.booksService.findAll(parsedLimit, parsedPage, topicsArray);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific book by ID' })
  @ApiResponse({ status: 200, description: 'Book details.' })
  @ApiResponse({ status: 404, description: '' })
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({ status: 200, description: 'Book updated.' })
  @ApiResponse({ status: 404, description: '' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({ status: 200, description: 'Book deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Get('topic/:topicId')
  @ApiOperation({ summary: 'Get all books associated with a topic' })
  @ApiResponse({ status: 200, description: 'List of books for the topic.' })
  @ApiResponse({ status: 404, description: 'Topic with ID not found.' })
  async findByTopic(@Param('topicId') topicId: string) {
    return this.booksService.findByTopic(topicId);
  }
}
