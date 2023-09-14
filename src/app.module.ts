import { Module } from '@nestjs/common';
import { SystemConfigModule } from './config/systemConfig.module';
import { routesModules } from './modules/routes.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    SystemConfigModule,
    routesModules,
  ],
})
export class AppModule {}
