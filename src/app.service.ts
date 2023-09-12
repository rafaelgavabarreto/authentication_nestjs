import { Injectable } from '@nestjs/common';
import { GetHealth } from './app.definition';

@Injectable()
export class AppService {
  getHealth(): GetHealth {
    return {
      health: true,
      message: 'OK',
      version: `${env.APP_VER}` ?? '',
      environment: env.NODE_ENV ?? '',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
