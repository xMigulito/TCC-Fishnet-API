import { Injectable } from '@nestjs/common';
import { CreateBiometriaSemanalDto } from './dto/create-biometria-semanal.dto';
import { UpdateBiometriaSemanalDto } from './dto/update-biometria-semanal.dto';

@Injectable()
export class BiometriaSemanalService {
  create(createBiometriaSemanalDto: CreateBiometriaSemanalDto) {
    return 'This action adds a new biometriaSemanal';
  }

  findAll() {
    return `This action returns all biometriaSemanal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biometriaSemanal`;
  }

  update(id: number, updateBiometriaSemanalDto: UpdateBiometriaSemanalDto) {
    return `This action updates a #${id} biometriaSemanal`;
  }

  remove(id: number) {
    return `This action removes a #${id} biometriaSemanal`;
  }
}
