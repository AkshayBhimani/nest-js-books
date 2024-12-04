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

import { TopicsService } from './topic.service';
import { CreateTopicDto } from './dto/createTopic.dto';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of topics per page (default  10)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default  1)',
  })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit;
    const parsedPage = typeof page === 'string' ? parseInt(page) : page;
    return this.topicsService.findAll(parsedLimit, parsedPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.topicsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}
