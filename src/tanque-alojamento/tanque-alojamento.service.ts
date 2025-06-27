/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return this.prisma.tanqueAlojamento.findMany();
  }

  async findOne(id: number) {
    const alojamento = await this.prisma.tanqueAlojamento.findUnique({
      where: { ID: id },
    });
    if (!alojamento) {
      throw new NotFoundException(`Alojamento com ID ${id} não encontrado`);
    }
    return alojamento;
  }

  async findByTanque(tanqueId: number) {
    return this.prisma.tanqueAlojamento.findMany({
      where: {
        Tanque_Id: tanqueId
      }
    });
  }

  async findByCooperativa(cooperativaId: number) {
    return this.prisma.tanqueAlojamento.findMany({
      where: {
        Cooperativa_Id: cooperativaId
      }
    });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.tanqueAlojamento.findMany({
      where: {
        Data_Alojamento: {
          gte: startDate,
          lte: endDate
        }
      }
    });
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
