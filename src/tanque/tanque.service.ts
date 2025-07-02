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
    const capacidade = area * 1; 
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
      where: { id: id },
    });
    if (!tanque) {
      throw new NotFoundException(`Tanque com ID ${id} não encontrado`);
    }
    return tanque;
  }

  update(id: number, updateTanqueDto: UpdateTanqueDto) {
    return this.prisma.tanque.update({
      where: { id: id },
      data: updateTanqueDto,
    });
  }

  remove(id: number) {
    return this.prisma.tanque.delete({ where: { id: id } });
  }

  async getResumoTanques() {
    const tanques = await this.prisma.tanque.findMany();
    const resumos: any[] = [];
    for (const tanque of tanques) {
      const alojamento = await this.prisma.tanqueAlojamento.findFirst({
        where: { Tanque_Id: tanque.id, Data_Saida: null },
        orderBy: { Data_Alojamento: 'desc' },
      });

      let populacao: number | null = null;
      let pesoMedio: number | null = null;
      let ultimaOxigenacao: number | null = null;
      let ultimaTemperatura: number | null = null;
      let ultimaRacao: number | null = null;

      if (alojamento) {
        populacao = alojamento.Total_Peixes ?? null;
        const biometriaSemanal = await this.prisma.biometriaSemanal.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data_Abertura: 'desc' },
        });
        if (biometriaSemanal) {
          pesoMedio = biometriaSemanal.Peso ?? null;
        }
        const biometria = await this.prisma.biometriaDiaria.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data: 'desc' },
        });
        if (biometria) {
          ultimaOxigenacao = biometria.Oxigenacao ?? null;
          ultimaTemperatura = biometria.Temperatura_Agua ?? null;
          ultimaRacao = biometria.Racao ?? null;
        }
      }

      resumos.push({
        id: tanque.id,
        local: tanque.Local ?? null,
        capacidade: tanque.Capacidade ?? null,
        capacidade_peixes: tanque.Capacidade ? Number((Number(tanque.Capacidade) * 7).toFixed(3)) : null,
        populacao,
        pesoMedio,
        ultimaOxigenacao,
        ultimaTemperatura,
        ultimaRacao,
      });
    }
    return resumos;
  }
}
