/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTanqueAlojamentoDto } from './dto/create-tanque-alojamento.dto';
import { UpdateTanqueAlojamentoDto } from './dto/update-tanque-alojamento.dto';

@Injectable()
export class TanqueAlojamentoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTanqueAlojamentoDto: CreateTanqueAlojamentoDto) {
    console.log('🏠 Criando alojamento:', createTanqueAlojamentoDto);
    return this.prisma.tanqueAlojamento.create({
      data: createTanqueAlojamentoDto,
    });
  }

  async findAll() {
    return this.prisma.tanqueAlojamento.findMany();
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

    // Buscar alojamentos apenas dos tanques do usuário
    return this.prisma.tanqueAlojamento.findMany({
      where: { 
        Tanque_Id: { in: tanqueIds }
      },
    });
  }

  async findOne(id: number) {
    const alojamento = await this.prisma.tanqueAlojamento.findUnique({
      where: { id: id },
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
      where: { id: id },
      data: updateTanqueAlojamentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.tanqueAlojamento.delete({ where: { id: id } });
  }

  async desalojar(id: number, userId?: number) {
    console.log('🔄 Iniciando desalojamento para ID:', id, 'User ID:', userId);
    
    const alojamento = await this.findOne(id);
    if (!alojamento) {
      throw new NotFoundException(`Alojamento com ID ${id} não encontrado`);
    }
    
    console.log('📊 Alojamento encontrado:', alojamento);
    
    // Verificar se o usuário tem permissão para desalojar este tanque
    if (userId) {
      const tanqueUser = await this.prisma.tanqueUser.findFirst({
        where: {
          Tanque_Id: alojamento.Tanque_Id,
          Usuario_Sis_Id: userId
        }
      });
      
      if (!tanqueUser) {
        throw new Error('Você não tem permissão para desalojar este tanque');
      }
    }
    
    // Verificar se já foi desalojado
    if (alojamento.Data_Saida) {
      console.log('⚠️ Alojamento já foi desalojado em:', alojamento.Data_Saida);
      throw new Error('Este alojamento já foi desalojado');
    }
    
    console.log('✅ Desalojando alojamento...');
    const result = await this.prisma.tanqueAlojamento.update({
      where: { id: id },
      data: { Data_Saida: new Date() },
    });
    
    console.log('✅ Desalojamento concluído:', result);
    return result;
  }
}
