import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @ApiProperty({ description: 'Title of the book' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  @IsNotEmpty({ message: 'Author is required' })
  @ApiProperty({ description: 'Author of the book' })
  author: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'Published date of the book', required: false })
  publishedDate?: Date;

  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString()
  @ApiProperty({ description: 'ISBN of the book', uniqueItems: true })
  isbn: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'Array of topic IDs', required: false })
  @IsMongoId({ each: true, message: 'ID must be a MongoDB ID' })
  topics?: string[];
}
