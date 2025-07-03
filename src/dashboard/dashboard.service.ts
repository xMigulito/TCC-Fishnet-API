/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface FaseCrescimento {
  pesoMin: number;
  pesoMax: number;
  percentualBiomassa: number;
}

interface BiometriaSemanal {
  id: number;
  Tanque_Alojamento_Id: number;
  Data_Alojamento: Date;
  Peixes_Mortos: number;
  Peixes_Capturados: number;
  Peso: number;
  Biomassa_Total: number;
  Data_Abertura: Date;
  Data_Fechamento: Date;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  // Definição das fases de crescimento conforme especificado
  private readonly fasesCrescimento: FaseCrescimento[] = [
    { pesoMin: 0, pesoMax: 2, percentualBiomassa: 20.0 },
    { pesoMin: 2.5, pesoMax: 5, percentualBiomassa: 15.0 },
    { pesoMin: 5.5, pesoMax: 15, percentualBiomassa: 10.0 },
    { pesoMin: 15.5, pesoMax: 30, percentualBiomassa: 7.0 },
    { pesoMin: 30, pesoMax: 100, percentualBiomassa: 3.0 },
    { pesoMin: 101, pesoMax: 200, percentualBiomassa: 3.0 },
    { pesoMin: 201, pesoMax: 350, percentualBiomassa: 2.5 },
    { pesoMin: 351, pesoMax: 500, percentualBiomassa: 2.0 },
    { pesoMin: 501, pesoMax: 700, percentualBiomassa: 1.5 },
    { pesoMin: 700, pesoMax: 1000, percentualBiomassa: 1.0 },
  ];

  // Função para determinar o CA baseado no mês
  private getCA(mes: number): number {
    if (mes <= 2) return 0.8;
    if (mes === 3) return 1.0;
    if (mes <= 9) return 1.2;
    return 1.2; // Para meses além do 9º
  }

  // Função para obter o percentual de biomassa baseado no peso
  private getPercentualBiomassa(peso: number): number {
    const fase = this.fasesCrescimento.find(f => peso >= f.pesoMin && peso <= f.pesoMax);
    return fase ? fase.percentualBiomassa : 1.0; // Default 1% se não encontrar fase
  }

  // Função utilitária para agrupar biometrias por mês/ano
  private agruparBiometriasPorMes(biometrias: BiometriaSemanal[]): { [mesAno: string]: BiometriaSemanal[] } {
    return biometrias.reduce((acc, b) => {
      const data = new Date(b.Data_Abertura);
      const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[mesAno]) acc[mesAno] = [];
      acc[mesAno].push(b);
      return acc;
    }, {} as { [mesAno: string]: BiometriaSemanal[] });
  }

  // Substituir calcularProjecaoMensal por uma versão que agrupa por mês
  private calcularProjecaoMensal(
    quantidadeInicial: number,
    pesoInicial: number,
    biometriasSemanais: BiometriaSemanal[]
  ): number[] {
    const projecoes: number[] = [];
    let quantidadeAtual = quantidadeInicial;
    let pesoAtual = pesoInicial;
    let mortalidadeAcumulada = 0;

    // Agrupar biometrias por mês/ano
    const biometriasPorMes = this.agruparBiometriasPorMes(biometriasSemanais);
    const mesesOrdenados = Object.keys(biometriasPorMes).sort();

    mesesOrdenados.forEach((mesAno, idx) => {
      const biometriasDoMes = biometriasPorMes[mesAno];
      // Somar mortalidades do mês
      const mortalidadeMes = biometriasDoMes.reduce((acc, b) => acc + (b.Peixes_Mortos || 0), 0);
      mortalidadeAcumulada += mortalidadeMes;
      quantidadeAtual = quantidadeInicial - mortalidadeAcumulada;
      // Usar o último peso do mês (ou o anterior se não houver)
      const ultimoPeso = biometriasDoMes[biometriasDoMes.length - 1]?.Peso || pesoAtual;
      pesoAtual = ultimoPeso;
      // Calcular projeção para o mês
      const projecao = this.calcularProjecaoMes(
        quantidadeAtual,
        pesoAtual,
        idx + 1 // mês sequencial
      );
      projecoes.push(projecao);
    });

    return projecoes;
  }

  // Função para calcular a projeção de um mês específico
  private calcularProjecaoMes(
    quantidadeAtual: number,
    pesoAtual: number,
    mes: number
  ): number {
    // Percentual de biomassa baseado no peso atual
    const percentualBiomassa = this.getPercentualBiomassa(pesoAtual);
    
    // Consumo diário por tanque = (Quantidade de animais * Peso Atual) * Consumo ração
    const consumoDiario = (quantidadeAtual * pesoAtual) * (percentualBiomassa / 100);
    
    // CA baseado no mês
    const ca = this.getCA(mes);
    
    // Biomassa Final = (Consumo diário/tanque * 30) / CA + (Peso Atual * Quantidade de peixes)
    const biomassaFinal = (consumoDiario * 30) / ca + (pesoAtual * quantidadeAtual);
    
    return Math.round(biomassaFinal);
  }

  // Função para calcular meses decorridos entre duas datas
  private calcularMesesDecorridos(dataInicial: Date, dataFinal: Date): number {
    const anoInicial = dataInicial.getFullYear();
    const mesInicial = dataInicial.getMonth();
    const anoFinal = dataFinal.getFullYear();
    const mesFinal = dataFinal.getMonth();
    
    return (anoFinal - anoInicial) * 12 + (mesFinal - mesInicial);
  }

  // Função para estimar o peso atual baseado no crescimento esperado
  private estimarPesoAtual(pesoInicial: number, mes: number): number {
    // Curva de crescimento mais realista baseada em dados de piscicultura
    const crescimentoMensal = [
      0,    // Mês 0 (inicial)
      0.5,  // Mês 1
      1.2,  // Mês 2
      2.5,  // Mês 3
      4.0,  // Mês 4
      6.0,  // Mês 5
      8.5,  // Mês 6
      12.0, // Mês 7
      16.0, // Mês 8
      20.0, // Mês 9
      25.0, // Mês 10
      30.0, // Mês 11
      35.0  // Mês 12
    ];
    
    const crescimento = mes < crescimentoMensal.length ? crescimentoMensal[mes] : crescimentoMensal[crescimentoMensal.length - 1];
    return pesoInicial + crescimento;
  }

  // Função para consolidar dados mensais para todos os gráficos
  private consolidarDadosMensais(
    biometriasSemanais: BiometriaSemanal[],
    biometriasDiarias: any[],
    projecoes: number[]
  ) {
    // Agrupar biometrias semanais por mês/ano
    const biometriasPorMes = this.agruparBiometriasPorMes(biometriasSemanais);
    const mesesOrdenados = Object.keys(biometriasPorMes).sort();
    const dadosMensais = mesesOrdenados.map((mesAno, idx) => {
      const biometriasDoMes = biometriasPorMes[mesAno];
      // Biomassa: último valor do mês
      const biomassa = biometriasDoMes[biometriasDoMes.length - 1]?.Biomassa_Total || 0;
      // Mortalidade: soma do mês
      const mortalidade = biometriasDoMes.reduce((acc, b) => acc + (b.Peixes_Mortos || 0), 0);
      // Peso: último do mês
      const peso = biometriasDoMes[biometriasDoMes.length - 1]?.Peso || 0;
      // Data de referência: do último registro do mês
      const data = biometriasDoMes[biometriasDoMes.length - 1]?.Data_Abertura;
      // Projeção: já agrupada
      const projecao = projecoes[idx] || 0;
      // Diárias do mês
      const dataIni = new Date(biometriasDoMes[0]?.Data_Abertura);
      const dataFim = new Date(biometriasDoMes[biometriasDoMes.length - 1]?.Data_Abertura);
      const diariasDoMes = biometriasDiarias.filter(d => {
        const dataD = new Date(d.Data);
        return dataD >= dataIni && dataD <= dataFim;
      });
      // Qualidade da água: último valor do mês
      const qualidadeAgua = diariasDoMes.length > 0 ? diariasDoMes[diariasDoMes.length - 1].Ph : null;
      // FCA: último valor do mês
      const fca = diariasDoMes.length > 0 ? diariasDoMes[diariasDoMes.length - 1].Racao : null;
      return {
        mes: data,
        biomassa,
        mortalidade,
        peso,
        qualidadeAgua,
        fca,
        projecao
      };
    });
    return dadosMensais;
  }

  async getDashboardInfo() {
    const tanques = await this.prisma.tanque.findMany();
    const alojamentos = await this.prisma.tanqueAlojamento.findMany({
      where: { Data_Saida: null },
    });
    const biometriasDiarias = await this.prisma.biometriaDiaria.findMany();
    const biometriasSemanais = await this.prisma.biometriaSemanal.findMany();

    const dadosPorTanque = tanques.map(tanque => {
      const alojamentosTanque = alojamentos.filter(a => a.Tanque_Id === tanque.id);
      const dados: any[] = [];

      alojamentosTanque.forEach(alojamento => {
        const semanais = biometriasSemanais.filter(b => b.Tanque_Alojamento_Id === alojamento.id);
        const diarias = biometriasDiarias.filter(b => b.Tanque_Alojamento_Id === alojamento.id);
        const projecoes = this.calcularProjecaoMensal(
          alojamento.Total_Peixes || 0,
          alojamento.Peso_Medio_Inicial || 0,
          semanais
        );
        const dadosMensais = this.consolidarDadosMensais(semanais, diarias, projecoes);
        dados.push(...dadosMensais);
      });

      return {
        id: tanque.id,
        nome: tanque.Local || `Tanque ${tanque.id}`,
        dados,
      };
    });

    return dadosPorTanque;
  }
}