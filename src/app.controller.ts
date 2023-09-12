import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHealth } from './app.definition';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): GetHealth {
    return this.appService.getHealth();
  }
}
