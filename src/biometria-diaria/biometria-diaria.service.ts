import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBiometriaDiariaDto } from './dto/create-biometria-diaria.dto';
import { UpdateBiometriaDiariaDto } from './dto/update-biometria-diaria.dto';

@Injectable()
export class BiometriaDiariaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBiometriaDiariaDto: CreateBiometriaDiariaDto) {
    return this.prisma.biometriaDiaria.create({
      data: {
        Data: createBiometriaDiariaDto.Data,
        Racao: createBiometriaDiariaDto.Racao,
        Tanque_Alojamento_Id: createBiometriaDiariaDto.Tanque_Alojamento_Id,
        Temperatura_Agua: createBiometriaDiariaDto.Temperatura_Agua,
        Ph: createBiometriaDiariaDto.Ph,
        Temperatura_Ambiente: createBiometriaDiariaDto.Temperatura_Ambiente,
        Oxigenacao: createBiometriaDiariaDto.Oxigenacao,
      },
    });
  }

  findAll() {
    return this.prisma.biometriaDiaria.findMany();
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
    return this.prisma.biometriaDiaria.findMany({
      where: { 
        Tanque_Alojamento_Id: { in: alojamentoIds }
      },
    });
  }

  async findOne(id: number) {
    const biometria = await this.prisma.biometriaDiaria.findUnique({
      where: { id: id },
    });
    if (!biometria) {
      throw new NotFoundException(`BiometriaDiaria com ID ${id} não encontrada`);
    }
    return biometria;
  }

  update(id: number, updateBiometriaDiariaDto: UpdateBiometriaDiariaDto) {
    return this.prisma.biometriaDiaria.update({
      where: { id: id },
      data: updateBiometriaDiariaDto,
    });
  }

  remove(id: number) {
    return this.prisma.biometriaDiaria.delete({
      where: { id: id },
    });
  }
}
