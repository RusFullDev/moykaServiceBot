import { Injectable } from '@nestjs/common';
import { CreateAvtoDto } from './dto/create-avto.dto';
import { UpdateAvtoDto } from './dto/update-avto.dto';

@Injectable()
export class AvtoService {
  create(createAvtoDto: CreateAvtoDto) {
    return 'This action adds a new avto';
  }

  findAll() {
    return `This action returns all avto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avto`;
  }

  update(id: number, updateAvtoDto: UpdateAvtoDto) {
    return `This action updates a #${id} avto`;
  }

  remove(id: number) {
    return `This action removes a #${id} avto`;
  }
}
