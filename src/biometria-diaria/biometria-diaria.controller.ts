import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BiometriaDiariaService } from './biometria-diaria.service';
import { CreateBiometriaDiariaDto } from './dto/create-biometria-diaria.dto';
import { UpdateBiometriaDiariaDto } from './dto/update-biometria-diaria.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('biometria-diaria')
@UseGuards(JwtAuthGuard)
export class BiometriaDiariaController {
  constructor(private readonly biometriaDiariaService: BiometriaDiariaService) {}

  @Post()
  create(@Body() createBiometriaDiariaDto: CreateBiometriaDiariaDto) {
    return this.biometriaDiariaService.create(createBiometriaDiariaDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.biometriaDiariaService.findAllByUser(req.user.id);
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
