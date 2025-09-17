/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TanqueService } from './tanque.service';
import { CreateTanqueDto } from './dto/create-tanque.dto';
import { UpdateTanqueDto } from './dto/update-tanque.dto';
import { ToggleTanqueStatusDto } from './dto/toggle-tanque-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tanque')
@UseGuards(JwtAuthGuard)
export class TanqueController {
  constructor(private readonly tanqueService: TanqueService) {}

  @Post()
  create(@Body() createTanqueDto: CreateTanqueDto, @Request() req) {
    return this.tanqueService.create(createTanqueDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.tanqueService.findAllByUser(req.user.id);
  }
  
  @Get('resumo')
  async getResumo(@Request() req) {
    return this.tanqueService.getResumoTanquesByUser(req.user.id);
  }

  @Get('todos')
  async findAllIncludingInactive(@Request() req) {
    return this.tanqueService.findAllIncludingInactive(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tanqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTanqueDto: UpdateTanqueDto) {
    return this.tanqueService.update(+id, updateTanqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tanqueService.remove(+id);
  }

  @Patch(':id/status')
  toggleStatus(@Param('id') id: string, @Body() toggleStatusDto: ToggleTanqueStatusDto) {
    return this.tanqueService.toggleStatus(+id, toggleStatusDto);
  }

  @Patch(':id/desativar')
  desativarTanque(@Param('id') id: string) {
    return this.tanqueService.desativarTanque(+id);
  }

  @Patch(':id/ativar')
  ativarTanque(@Param('id') id: string) {
    return this.tanqueService.ativarTanque(+id);
  }
}
