import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBiometriaSemanalDto } from './dto/create-biometria-semanal.dto';
import { UpdateBiometriaSemanalDto } from './dto/update-biometria-semanal.dto';

@Injectable()
export class BiometriaSemanalService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBiometriaSemanalDto) {
    return this.prisma.biometriaSemanal.create({
      data: {
        Tanque_Alojamento_Id: dto.Tanque_Alojamento_Id,
        Data_Alojamento: dto.Data_Alojamento,
        Peixes_Mortos: dto.Peixes_Mortos,
        Peixes_Capturados: dto.Peixes_Capturados,
        Peso: dto.Peso,
        Biomassa_Total: dto.Biomassa_Total,
        Data_Abertura: dto.Data_Abertura,
        Data_Fechamento: dto.Data_Fechamento,
      },
    });
  }

  findAll() {
    return this.prisma.biometriaSemanal.findMany();
  }

  async findAllByUser(userId: number) {
    // Buscar tanques associados ao usuário
    const tanqueUsers = await this.prisma.tanqueUser.findMany({
      where: { Usuario_Sis_Id: userId },
    });

    const tanqueIds = tanqueUsers.map(tu => tu.Tanque_Id);

    if (tanqueIds.length === 0) {
      return [];
    }

    // Buscar alojamentos dos tanques do usuário
    const alojamentos = await this.prisma.tanqueAlojamento.findMany({
      where: { 
        Tanque_Id: { in: tanqueIds }
      },
    });

    const alojamentoIds = alojamentos.map(a => a.id);

    if (alojamentoIds.length === 0) {
      return [];
    }

    // Buscar biometrias apenas dos alojamentos do usuário
    return this.prisma.biometriaSemanal.findMany({
      where: { 
        Tanque_Alojamento_Id: { in: alojamentoIds }
      },
    });
  }

  async findOne(id: number) {
    const biometria = await this.prisma.biometriaSemanal.findUnique({
      where: { id: id },
    });
    if (!biometria) {
      throw new NotFoundException(`BiometriaSemanal com ID ${id} não encontrada`);
    }
    return biometria;
  }

  update(id: number, updateBiometriaSemanalDto: UpdateBiometriaSemanalDto) {
    return this.prisma.biometriaSemanal.update({
      where: { id: id },
      data: updateBiometriaSemanalDto,
    });
  }

  remove(id: number) {
    return this.prisma.biometriaSemanal.delete({
      where: { id: id },
    });
  }
}
