/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

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

        semanais.forEach(semana => {
          const diariaMaisProxima = diarias.reduce((prev, curr) => {
            return Math.abs(new Date(curr.Data).getTime() - new Date(semana.Data_Abertura).getTime()) <
                   Math.abs(new Date(prev.Data).getTime() - new Date(semana.Data_Abertura).getTime())
              ? curr : prev;
          }, diarias[0]);

          dados.push({
            mes: semana.Data_Abertura,
            biomassa: semana.Biomassa_Total,
            mortalidade: semana.Peixes_Mortos,
            fca: diariaMaisProxima?.Racao ?? null,
            qualidadeAgua: diariaMaisProxima?.Ph ?? null,
            projecao: Number((semana.Biomassa_Total * 1.1).toFixed(2)),
          });
        });
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