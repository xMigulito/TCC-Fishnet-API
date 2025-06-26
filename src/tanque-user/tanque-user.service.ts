import { Injectable } from '@nestjs/common';
import { CreateTanqueUserDto } from './dto/create-tanque-user.dto';
import { UpdateTanqueUserDto } from './dto/update-tanque-user.dto';

@Injectable()
export class TanqueUserService {
  create(createTanqueUserDto: CreateTanqueUserDto) {
    return 'This action adds a new tanqueUser';
  }

  findAll() {
    return `This action returns all tanqueUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tanqueUser`;
  }

  update(id: number, updateTanqueUserDto: UpdateTanqueUserDto) {
    return `This action updates a #${id} tanqueUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} tanqueUser`;
  }
}
