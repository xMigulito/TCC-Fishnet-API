import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiometriaDiariaService } from './biometria-diaria.service';
import { CreateBiometriaDiariaDto } from './dto/create-biometria-diaria.dto';
import { UpdateBiometriaDiariaDto } from './dto/update-biometria-diaria.dto';

@Controller('biometria-diaria')
export class BiometriaDiariaController {
  constructor(private readonly biometriaDiariaService: BiometriaDiariaService) {}

  @Post()
  create(@Body() createBiometriaDiariaDto: CreateBiometriaDiariaDto) {
    return this.biometriaDiariaService.create(createBiometriaDiariaDto);
  }

  @Get()
  findAll() {
    return this.biometriaDiariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biometriaDiariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiometriaDiariaDto: UpdateBiometriaDiariaDto) {
    return this.biometriaDiariaService.update(+id, updateBiometriaDiariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biometriaDiariaService.remove(+id);
  }
}
