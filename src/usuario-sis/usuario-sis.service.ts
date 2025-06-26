import { Injectable } from '@nestjs/common';
import { CreateUsuarioSiDto } from './dto/create-usuario-si.dto';
import { UpdateUsuarioSiDto } from './dto/update-usuario-si.dto';

@Injectable()
export class UsuarioSisService {
  create(createUsuarioSiDto: CreateUsuarioSiDto) {
    return 'This action adds a new usuarioSi';
  }

  findAll() {
    return `This action returns all usuarioSis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioSi`;
  }

  update(id: number, updateUsuarioSiDto: UpdateUsuarioSiDto) {
    return `This action updates a #${id} usuarioSi`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioSi`;
  }
}
