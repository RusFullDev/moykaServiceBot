import { PartialType } from '@nestjs/mapped-types';
import { CreateAvtoDto } from './create-avto.dto';

export class UpdateAvtoDto extends PartialType(CreateAvtoDto) {}
