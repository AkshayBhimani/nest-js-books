import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the topic', uniqueItems: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Description of the topic', required: false })
  description?: string;
}
