import { Injectable } from '@nestjs/common';
import { GetHealth } from './health.definition';

@Injectable()
export class HealthService {
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
