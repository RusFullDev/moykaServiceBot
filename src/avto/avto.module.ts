import { Module } from '@nestjs/common';
import { AvtoService } from './avto.service';
import { AvtoController } from './avto.controller';

@Module({
  controllers: [AvtoController],
  providers: [AvtoService],
})
export class AvtoModule {}
