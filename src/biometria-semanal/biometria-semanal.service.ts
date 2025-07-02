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
    return `This action updates a #${id} biometriaSemanal`;
  }

  remove(id: number) {
    return `This action removes a #${id} biometriaSemanal`;
  }
}
