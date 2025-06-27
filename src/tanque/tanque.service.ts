/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTanqueDto } from './dto/create-tanque.dto';
import { UpdateTanqueDto } from './dto/update-tanque.dto';

@Injectable()
export class TanqueService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTanqueDto: CreateTanqueDto) {
    const area = (createTanqueDto.Largura ?? 0) * (createTanqueDto.Comprimento ?? 0);
    const capacidade = area * 1; // Ajuste a fórmula conforme necessário
    return this.prisma.tanque.create({
      data: {
        ...createTanqueDto,
        Area: area,
        Capacidade: capacidade,
      },
    });
  }

  async findAll() {
    const tanques = await this.prisma.tanque.findMany();
    return tanques;
  }

  async findOne(id: number) {
    const tanque = await this.prisma.tanque.findUnique({
      where: { ID: id },
    });
    if (!tanque) {
      throw new NotFoundException(`Tanque com ID ${id} não encontrado`);
    }
    return tanque;
  }

  update(id: number, updateTanqueDto: UpdateTanqueDto) {
    return this.prisma.tanque.update({
      where: { ID: id },
      data: updateTanqueDto,
    });
  }

  remove(id: number) {
    return this.prisma.tanque.delete({ where: { ID: id } });
  }
}
