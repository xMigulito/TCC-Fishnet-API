/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTanqueAlojamentoDto } from './dto/create-tanque-alojamento.dto';
import { UpdateTanqueAlojamentoDto } from './dto/update-tanque-alojamento.dto';

@Injectable()
export class TanqueAlojamentoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTanqueAlojamentoDto: CreateTanqueAlojamentoDto) {
    return this.prisma.tanqueAlojamento.create({
      data: createTanqueAlojamentoDto,
    });
  }

  findAll() {
    return this.prisma.tanqueAlojamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.tanqueAlojamento.findUnique({ where: { ID: id } });
  }

  update(id: number, updateTanqueAlojamentoDto: UpdateTanqueAlojamentoDto) {
    return this.prisma.tanqueAlojamento.update({
      where: { ID: id },
      data: updateTanqueAlojamentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.tanqueAlojamento.delete({ where: { ID: id } });
  }
}
