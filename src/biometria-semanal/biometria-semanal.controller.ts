import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BiometriaSemanalService } from './biometria-semanal.service';
import { CreateBiometriaSemanalDto } from './dto/create-biometria-semanal.dto';
import { UpdateBiometriaSemanalDto } from './dto/update-biometria-semanal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('biometria-semanal')
@UseGuards(JwtAuthGuard)
export class BiometriaSemanalController {
  constructor(private readonly biometriaSemanalService: BiometriaSemanalService) {}

  @Post()
  create(@Body() createBiometriaSemanalDto: CreateBiometriaSemanalDto) {
    return this.biometriaSemanalService.create(createBiometriaSemanalDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.biometriaSemanalService.findAllByUser(req.user.id);
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
