/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTanqueDto } from './dto/create-tanque.dto';
import { UpdateTanqueDto } from './dto/update-tanque.dto';

@Injectable()
export class TanqueService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTanqueDto: CreateTanqueDto) {
    // Calcula a área e capacidade automaticamente
    const area = createTanqueDto.Largura * createTanqueDto.Comprimento;
    const capacidade = area * 1; // Ajuste a fórmula conforme necessário
    return this.prisma.tanque.create({
      data: {
        ...createTanqueDto,
        Area: area,
        Capacidade: capacidade,
      },
    });
  }

  findAll() {
    return this.prisma.tanque.findMany();
  }

  findOne(id: number) {
    return this.prisma.tanque.findUnique({ where: { ID: id } });
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
