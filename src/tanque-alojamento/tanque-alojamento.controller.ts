import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TanqueAlojamentoService } from './tanque-alojamento.service';
import { CreateTanqueAlojamentoDto } from './dto/create-tanque-alojamento.dto';
import { UpdateTanqueAlojamentoDto } from './dto/update-tanque-alojamento.dto';

@Controller('tanque-alojamento')
export class TanqueAlojamentoController {
  constructor(private readonly tanqueAlojamentoService: TanqueAlojamentoService) {}

  @Post()
  create(@Body() createTanqueAlojamentoDto: CreateTanqueAlojamentoDto) {
    return this.tanqueAlojamentoService.create(createTanqueAlojamentoDto);
  }

  @Get()
  findAll() {
    return this.tanqueAlojamentoService.findAll();
  }

  @Get('tanque/:tanqueId')
  findByTanque(@Param('tanqueId') tanqueId: string) {
    return this.tanqueAlojamentoService.findByTanque(+tanqueId);
  }

  @Get('periodo')
  findByDateRange(
    @Query('dataInicio') startDate: string,
    @Query('dataFim') endDate: string,
  ) {
    return this.tanqueAlojamentoService.findByDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tanqueAlojamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTanqueAlojamentoDto: UpdateTanqueAlojamentoDto) {
    return this.tanqueAlojamentoService.update(+id, updateTanqueAlojamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tanqueAlojamentoService.remove(+id);
  }
}
