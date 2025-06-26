import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiometriaSemanalService } from './biometria-semanal.service';
import { CreateBiometriaSemanalDto } from './dto/create-biometria-semanal.dto';
import { UpdateBiometriaSemanalDto } from './dto/update-biometria-semanal.dto';

@Controller('biometria-semanal')
export class BiometriaSemanalController {
  constructor(private readonly biometriaSemanalService: BiometriaSemanalService) {}

  @Post()
  create(@Body() createBiometriaSemanalDto: CreateBiometriaSemanalDto) {
    return this.biometriaSemanalService.create(createBiometriaSemanalDto);
  }

  @Get()
  findAll() {
    return this.biometriaSemanalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biometriaSemanalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiometriaSemanalDto: UpdateBiometriaSemanalDto) {
    return this.biometriaSemanalService.update(+id, updateBiometriaSemanalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biometriaSemanalService.remove(+id);
  }
}
