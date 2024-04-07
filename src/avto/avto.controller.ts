import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvtoService } from './avto.service';
import { CreateAvtoDto } from './dto/create-avto.dto';
import { UpdateAvtoDto } from './dto/update-avto.dto';

@Controller('avto')
export class AvtoController {
  constructor(private readonly avtoService: AvtoService) {}

  @Post()
  create(@Body() createAvtoDto: CreateAvtoDto) {
    return this.avtoService.create(createAvtoDto);
  }

  @Get()
  findAll() {
    return this.avtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvtoDto: UpdateAvtoDto) {
    return this.avtoService.update(+id, updateAvtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avtoService.remove(+id);
  }
}
