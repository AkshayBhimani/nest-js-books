import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDocs(): string {
    return `Docs is available at http://localhost:${process.env.PORT ?? 3000}/api-docs`;
  }
}
