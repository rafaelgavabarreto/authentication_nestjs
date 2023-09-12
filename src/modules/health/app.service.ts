import { Injectable } from '@nestjs/common';
import { GetHealth } from './app.definition';

@Injectable()
export class AppService {
  getHealth(): GetHealth {
    return {
      health: true,
      message: 'OK',
      version: process.env.APP_VER ?? '',
      environment: process.env.NODE_ENV ?? '',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
