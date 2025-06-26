import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioSisService } from './usuario-sis.service';
import { CreateUsuarioSiDto } from './dto/create-usuario-si.dto';
import { UpdateUsuarioSiDto } from './dto/update-usuario-si.dto';

@Controller('usuario-sis')
export class UsuarioSisController {
  constructor(private readonly usuarioSisService: UsuarioSisService) {}

  @Post()
  create(@Body() createUsuarioSiDto: CreateUsuarioSiDto) {
    return this.usuarioSisService.create(createUsuarioSiDto);
  }

  @Get()
  findAll() {
    return this.usuarioSisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioSisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioSiDto: UpdateUsuarioSiDto) {
    return this.usuarioSisService.update(+id, updateUsuarioSiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioSisService.remove(+id);
  }
}
