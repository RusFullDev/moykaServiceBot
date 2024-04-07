import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
