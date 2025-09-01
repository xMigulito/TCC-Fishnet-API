export class BiometriaDiaria {
  id: number;
  Data: Date;
  Racao: number;
  Tanque_Alojamento_Id: number;
  Temperatura_Agua: number;
  Ph: number;
  Temperatura_Ambiente: string;
  Oxigenacao: number;
  
  // Novos campos de qualidade da água
  Percentual_Renovacao_Agua?: number;
  Nitrito?: number;
  Amonia?: number;
  Transparencia?: number;
  
  // Campo de alimentação
  Quantidade_Alimentacoes?: number;
}
