import { PartialType } from '@nestjs/mapped-types';
import { CreateMacidDto } from './create-macid.dto';

export class UpdateMacidDto extends PartialType(CreateMacidDto) {}
