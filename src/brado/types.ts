export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  iniciais: string;
}

export interface Segurado {
  id: number;
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  criadoEm: string;
}

export interface Apolice {
  id: number;
  numero: string;
  seguradoId: number;
  ramo: string;
  seguradora: string;
  vigIni: string;
  vigFim: string;
  premio: number;
  numParcelas: number;
  formaPagamento: string;
  status: 'Ativa' | 'Vencida' | 'Cancelada';
}

export interface Endosso {
  id: number;
  apoliceId: number;
  tipo: 'Inclusão' | 'Exclusão' | 'Alteração';
  descricao: string;
  data: string;
  valorAjuste: number;
}

export interface Sinistro {
  id: number;
  seguradoId: number;
  apoliceId: number;
  dataOcorrencia: string;
  descricao: string;
  valorEstimado: number;
  status: 'Aberto' | 'Em Análise' | 'Encerrado' | 'Negado';
}

export interface Parcela {
  id: number;
  apoliceId: number;
  numero: number;
  total: number;
  vencimento: string;
  valor: number;
  status: 'Pendente' | 'Pago' | 'Atrasado';
}

export interface Averbacao {
  id: number;
  seguradoId: number;
  tipo: string;
  descricao: string;
  data: string;
  lancadoPor: string;
  status: 'Ativa' | 'Inativa';
}

export type PageId = 'dashboard' | 'segurados' | 'apolices' | 'faturamento' | 'sinistros' | 'renovacoes' | 'relatorios' | 'averbacoes';
