import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, UsersModule, HealthModule],
})
export class routesModules {}
