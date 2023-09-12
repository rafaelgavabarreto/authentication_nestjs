import { Module } from '@nestjs/common';
import { SystemConfigModule } from './config/systemConfig.module';
import { routesModules } from './modules/routes.module';

@Module({
  imports: [SystemConfigModule, routesModules],
})
export class AppModule {}
