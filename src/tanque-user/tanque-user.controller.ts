import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TanqueUserService } from './tanque-user.service';
import { CreateTanqueUserDto } from './dto/create-tanque-user.dto';
import { UpdateTanqueUserDto } from './dto/update-tanque-user.dto';

@Controller('tanque-user')
export class TanqueUserController {
  constructor(private readonly tanqueUserService: TanqueUserService) {}

  @Post()
  create(@Body() createTanqueUserDto: CreateTanqueUserDto) {
    return this.tanqueUserService.create(createTanqueUserDto);
  }

  @Get()
  findAll() {
    return this.tanqueUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tanqueUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTanqueUserDto: UpdateTanqueUserDto) {
    return this.tanqueUserService.update(+id, updateTanqueUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tanqueUserService.remove(+id);
  }
}
