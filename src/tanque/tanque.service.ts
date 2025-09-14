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

  async create(createTanqueDto: CreateTanqueDto, userId: number) {
    const area = (createTanqueDto.Largura ?? 0) * (createTanqueDto.Comprimento ?? 0);
    const capacidade = area * 1; 
    
    // Criar o tanque
    const tanque = await this.prisma.tanque.create({
      data: {
        ...createTanqueDto,
        Area: area,
        Capacidade: capacidade,
      },
    });

    // Criar a relação TanqueUser para vincular o tanque ao usuário
    await this.prisma.tanqueUser.create({
      data: {
        Tanque_Id: tanque.id,
        Usuario_Sis_Id: userId,
        Alterado_Em: new Date(),
      },
    });

    return tanque;
  }

  async findAll() {
    const tanques = await this.prisma.tanque.findMany();
    return tanques;
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

    const tanques = await this.prisma.tanque.findMany({
      where: { id: { in: tanqueIds } },
    });
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
      let ultimaPh: number | null = null;
      let mortesSemanais: number | null = null;
      let fca: number | null = null;

      if (alojamento) {
        populacao = alojamento.Total_Peixes ?? null;
        const biometriaSemanal = await this.prisma.biometriaSemanal.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data_Abertura: 'desc' },
        });
        if (biometriaSemanal) {
          pesoMedio = biometriaSemanal.Peso ?? null;
          mortesSemanais = biometriaSemanal.Peixes_Mortos ?? null;
        }

        if (alojamento && pesoMedio) {
          const biometriasSemanais = await this.prisma.biometriaSemanal.findMany({
            where: { Tanque_Alojamento_Id: alojamento.id },
            orderBy: { Data_Abertura: 'desc' },
            take: 2
          });

          if (biometriasSemanais.length >= 2) {
            const biometriaAtual = biometriasSemanais[0];
            const biometriaAnterior = biometriasSemanais[1];

            const racaoPeriodo = await this.prisma.biometriaDiaria.aggregate({
              where: {
                Tanque_Alojamento_Id: alojamento.id,
                Data: {
                  gt: biometriaAnterior.Data_Fechamento,
                  lte: biometriaAtual.Data_Fechamento
                }
              },
              _sum: { Racao: true }
            });

            const racaoConsumida = racaoPeriodo._sum.Racao ?? 0;
            const pesoAnteriorGramas = biometriaAnterior.Peso < 10 ? biometriaAnterior.Peso * 1000 : biometriaAnterior.Peso;
            const pesoAtualGramas = biometriaAtual.Peso < 10 ? biometriaAtual.Peso * 1000 : biometriaAtual.Peso;
            const ganhoPesoPeriodo = (pesoAtualGramas - pesoAnteriorGramas) * (populacao ?? 0);

            if (ganhoPesoPeriodo > 0) {
              fca = Number((racaoConsumida / ganhoPesoPeriodo).toFixed(2));
            }

            console.log('[FCA DEBUG] (duas biometrias)', {
              pesoAnteriorGramas,
              pesoAtualGramas,
              populacao,
              ganhoPesoPeriodo,
              racaoConsumida
            });

            const peixesMortosPeriodo = biometriaAnterior.Peixes_Mortos ?? 0;
            const populacaoInicialPeriodo = alojamento.Total_Peixes ?? 0;
            const taxaMortalidade = (peixesMortosPeriodo / populacaoInicialPeriodo) * 100;
          } else if (biometriasSemanais.length === 1) {
            const biometriaAtual = biometriasSemanais[0];
            const pesoInicial = alojamento.Peso_Medio_Inicial ?? 0;
            const pesoAtualGramas = biometriaAtual.Peso < 10 ? biometriaAtual.Peso * 1000 : biometriaAtual.Peso;

            const racaoPeriodo = await this.prisma.biometriaDiaria.aggregate({
              where: {
                Tanque_Alojamento_Id: alojamento.id,
                Data: {
                  gte: alojamento.Data_Alojamento,
                  lte: biometriaAtual.Data_Fechamento
                }
              },
              _sum: { Racao: true }
            });

            const racaoConsumida = racaoPeriodo._sum.Racao ?? 0;
            const pesoInicialGramas = pesoInicial < 10 ? pesoInicial * 1000 : pesoInicial;
            const ganhoPesoPeriodo = (pesoAtualGramas - pesoInicialGramas) * (populacao ?? 0);

            if (ganhoPesoPeriodo > 0) {
              fca = Number((racaoConsumida / ganhoPesoPeriodo).toFixed(2));
            }

            console.log('[FCA DEBUG] (uma biometria)', {
              pesoInicialGramas,
              pesoAtualGramas,
              populacao,
              ganhoPesoPeriodo,
              racaoConsumida
            });

            // Buscar a biometria anterior mais recente
            const biometriaAnterior = await this.prisma.biometriaSemanal.findFirst({
              where: { 
                Tanque_Alojamento_Id: alojamento.id,
                Data_Abertura: { lt: biometriaAtual.Data_Abertura }
              },
              orderBy: { Data_Abertura: 'desc' }
            });

            const peixesMortosPeriodo = biometriaAnterior?.Peixes_Mortos ?? 0;
            const populacaoInicialPeriodo = alojamento.Total_Peixes ?? 0;
            const taxaMortalidade = (peixesMortosPeriodo / populacaoInicialPeriodo) * 100;
          }
        }
        const biometria = await this.prisma.biometriaDiaria.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data: 'desc' },
        });
        if (biometria) {
          ultimaOxigenacao = biometria.Oxigenacao ?? null;
          ultimaTemperatura = biometria.Temperatura_Agua ?? null;
          ultimaRacao = biometria.Racao ?? null;
          ultimaPh = biometria.Ph ?? null;
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
        ultimaPh,
        mortesSemanais,
        fca,
        alojado: !!alojamento,
        alojamentoId: alojamento?.id ?? null,
      });
    }
    return resumos;
  }

  async getResumoTanquesByUser(userId: number) {
    console.log('🔍 Buscando tanques para usuário:', userId);
    
    // Buscar tanques associados ao usuário
    const tanqueUsers = await this.prisma.tanqueUser.findMany({
      where: { Usuario_Sis_Id: userId },
    });

    console.log('📊 Relações TanqueUser encontradas:', tanqueUsers);

    const tanqueIds = tanqueUsers.map(tu => tu.Tanque_Id);
    console.log('📊 IDs dos tanques:', tanqueIds);

    if (tanqueIds.length === 0) {
      console.log('⚠️ Nenhum tanque encontrado para o usuário');
      return [];
    }

    const tanques = await this.prisma.tanque.findMany({
      where: { id: { in: tanqueIds } },
    });
    
    console.log('📊 Tanques encontrados no banco:', tanques);
    
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
      let ultimaPh: number | null = null;
      let mortesSemanais: number | null = null;
      let fca: number | null = null;

      if (alojamento) {
        populacao = alojamento.Total_Peixes ?? null;
        const biometriaSemanal = await this.prisma.biometriaSemanal.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data_Abertura: 'desc' },
        });
        if (biometriaSemanal) {
          pesoMedio = biometriaSemanal.Peso ?? null;
          mortesSemanais = biometriaSemanal.Peixes_Mortos ?? null;
        }

        if (alojamento && pesoMedio) {
          const biometriasSemanais = await this.prisma.biometriaSemanal.findMany({
            where: { Tanque_Alojamento_Id: alojamento.id },
            orderBy: { Data_Abertura: 'desc' },
            take: 2
          });

          if (biometriasSemanais.length >= 2) {
            const biometriaAtual = biometriasSemanais[0];
            const biometriaAnterior = biometriasSemanais[1];

            const racaoPeriodo = await this.prisma.biometriaDiaria.aggregate({
              where: {
                Tanque_Alojamento_Id: alojamento.id,
                Data: {
                  gt: biometriaAnterior.Data_Fechamento,
                  lte: biometriaAtual.Data_Fechamento
                }
              },
              _sum: { Racao: true }
            });

            const racaoConsumida = racaoPeriodo._sum.Racao ?? 0;
            const pesoAnteriorGramas = biometriaAnterior.Peso < 10 ? biometriaAnterior.Peso * 1000 : biometriaAnterior.Peso;
            const pesoAtualGramas = biometriaAtual.Peso < 10 ? biometriaAtual.Peso * 1000 : biometriaAtual.Peso;
            const ganhoPesoPeriodo = (pesoAtualGramas - pesoAnteriorGramas) * (populacao ?? 0);

            if (ganhoPesoPeriodo > 0) {
              fca = Number((racaoConsumida / ganhoPesoPeriodo).toFixed(2));
            }
          } else if (biometriasSemanais.length === 1) {
            const biometriaAtual = biometriasSemanais[0];
            const pesoInicial = alojamento.Peso_Medio_Inicial ?? 0;
            const pesoAtualGramas = biometriaAtual.Peso < 10 ? biometriaAtual.Peso * 1000 : biometriaAtual.Peso;

            const racaoPeriodo = await this.prisma.biometriaDiaria.aggregate({
              where: {
                Tanque_Alojamento_Id: alojamento.id,
                Data: {
                  gte: alojamento.Data_Alojamento,
                  lte: biometriaAtual.Data_Fechamento
                }
              },
              _sum: { Racao: true }
            });

            const racaoConsumida = racaoPeriodo._sum.Racao ?? 0;
            const pesoInicialGramas = pesoInicial < 10 ? pesoInicial * 1000 : pesoInicial;
            const ganhoPesoPeriodo = (pesoAtualGramas - pesoInicialGramas) * (populacao ?? 0);

            if (ganhoPesoPeriodo > 0) {
              fca = Number((racaoConsumida / ganhoPesoPeriodo).toFixed(2));
            }
          }
        }
        const biometria = await this.prisma.biometriaDiaria.findFirst({
          where: { Tanque_Alojamento_Id: alojamento.id },
          orderBy: { Data: 'desc' },
        });
        if (biometria) {
          ultimaOxigenacao = biometria.Oxigenacao ?? null;
          ultimaTemperatura = biometria.Temperatura_Agua ?? null;
          ultimaRacao = biometria.Racao ?? null;
          ultimaPh = biometria.Ph ?? null;
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
        ultimaPh,
        mortesSemanais,
        fca,
        alojado: !!alojamento,
        alojamentoId: alojamento?.id ?? null,
      });
    }
    
    console.log('📊 Resumos finais gerados:', resumos);
    console.log('📊 Quantidade de resumos:', resumos.length);
    
    return resumos;
  }


}
