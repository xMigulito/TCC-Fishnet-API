import { Injectable } from '@nestjs/common';
import { CreateBiometriaDiariaDto } from './dto/create-biometria-diaria.dto';
import { UpdateBiometriaDiariaDto } from './dto/update-biometria-diaria.dto';

@Injectable()
export class BiometriaDiariaService {
  create(createBiometriaDiariaDto: CreateBiometriaDiariaDto) {
    return 'This action adds a new biometriaDiaria';
  }

  findAll() {
    return `This action returns all biometriaDiaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biometriaDiaria`;
  }

  update(id: number, updateBiometriaDiariaDto: UpdateBiometriaDiariaDto) {
    return `This action updates a #${id} biometriaDiaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} biometriaDiaria`;
  }
}
