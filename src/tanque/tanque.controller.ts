/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TanqueService } from './tanque.service';
import { CreateTanqueDto } from './dto/create-tanque.dto';
import { UpdateTanqueDto } from './dto/update-tanque.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tanque')
@UseGuards(JwtAuthGuard)
export class TanqueController {
  constructor(private readonly tanqueService: TanqueService) {}

  @Post()
  create(@Body() createTanqueDto: CreateTanqueDto) {
    return this.tanqueService.create(createTanqueDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tanqueService.findAllByUser(req.user.id);
  }
  
  @Get('resumo')
  async getResumo(@Request() req) {
    return this.tanqueService.getResumoTanquesByUser(req.user.id);
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

}
