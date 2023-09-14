import { HealthService } from './health.service';
import { GetHealth } from './health.definition';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('ping')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }

  @Get()
  getHealth(): GetHealth {
    return this.healthService.getHealth();
  }
}
