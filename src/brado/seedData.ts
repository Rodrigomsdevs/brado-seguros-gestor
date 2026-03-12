import { Usuario, Segurado, Apolice, Endosso, Sinistro, Averbacao, Parcela } from './types';

export const USUARIOS: Usuario[] = [
  { id: 1, nome: 'Carlos Mendes', email: 'carlos@brado.com', senha: '123456', perfil: 'Administrador', iniciais: 'CM' },
  { id: 2, nome: 'Ana Souza', email: 'ana@brado.com', senha: '123456', perfil: 'Corretor', iniciais: 'AS' },
];

export const SEGURADOS_INIT: Segurado[] = [
  { id: 1, nome: 'José da Silva', cpfCnpj: '123.456.789-00', email: 'jose@email.com', telefone: '(11) 98765-4321', endereco: { logradouro: 'Rua das Flores', numero: '100', bairro: 'Centro', cidade: 'São Paulo', uf: 'SP', cep: '01001-000' }, criadoEm: '2025-06-15' },
  { id: 2, nome: 'Maria Oliveira', cpfCnpj: '987.654.321-00', email: 'maria@email.com', telefone: '(11) 91234-5678', endereco: { logradouro: 'Av. Paulista', numero: '1500', bairro: 'Bela Vista', cidade: 'São Paulo', uf: 'SP', cep: '01310-100' }, criadoEm: '2025-07-20' },
  { id: 3, nome: 'Tech Solutions Ltda', cpfCnpj: '12.345.678/0001-90', email: 'contato@tech.com', telefone: '(21) 3456-7890', endereco: { logradouro: 'Rua da Inovação', numero: '50', bairro: 'Botafogo', cidade: 'Rio de Janeiro', uf: 'RJ', cep: '22250-040' }, criadoEm: '2025-08-10' },
  { id: 4, nome: 'Ana Paula Santos', cpfCnpj: '456.789.123-00', email: 'ana.paula@email.com', telefone: '(31) 99876-5432', endereco: { logradouro: 'Rua Minas Gerais', numero: '200', bairro: 'Savassi', cidade: 'Belo Horizonte', uf: 'MG', cep: '30130-150' }, criadoEm: '2025-09-05' },
  { id: 5, nome: 'Roberto Almeida', cpfCnpj: '321.654.987-00', email: 'roberto@email.com', telefone: '(41) 98765-1234', endereco: { logradouro: 'Av. Cândido de Abreu', numero: '817', bairro: 'Centro Cívico', cidade: 'Curitiba', uf: 'PR', cep: '80530-000' }, criadoEm: '2025-10-12' },
  { id: 6, nome: 'Construtora Horizonte S.A.', cpfCnpj: '98.765.432/0001-10', email: 'financeiro@horizonte.com', telefone: '(51) 3333-4444', endereco: { logradouro: 'Rua dos Andradas', numero: '1001', bairro: 'Centro Histórico', cidade: 'Porto Alegre', uf: 'RS', cep: '90020-015' }, criadoEm: '2025-11-01' },
  { id: 7, nome: 'Fernanda Costa', cpfCnpj: '654.321.987-00', email: 'fernanda@email.com', telefone: '(71) 99988-7766', endereco: { logradouro: 'Rua Chile', numero: '35', bairro: 'Comércio', cidade: 'Salvador', uf: 'BA', cep: '40015-170' }, criadoEm: '2025-12-08' },
  { id: 8, nome: 'Pedro Henrique Lima', cpfCnpj: '789.123.456-00', email: 'pedro@email.com', telefone: '(62) 98877-6655', endereco: { logradouro: 'Av. Goiás', numero: '600', bairro: 'Setor Central', cidade: 'Goiânia', uf: 'GO', cep: '74005-010' }, criadoEm: '2026-01-20' },
];

export const APOLICES_INIT: Apolice[] = [
  { id: 1, numero: 'APL-2025-001', seguradoId: 1, ramo: 'Auto', seguradora: 'Porto Seguro', vigIni: '2025-07-01', vigFim: '2026-07-01', premio: 3600, numParcelas: 12, formaPagamento: 'Boleto', status: 'Ativa' },
  { id: 2, numero: 'APL-2025-002', seguradoId: 2, ramo: 'Vida', seguradora: 'SulAmérica', vigIni: '2025-08-01', vigFim: '2026-08-01', premio: 1800, numParcelas: 12, formaPagamento: 'Cartão', status: 'Ativa' },
  { id: 3, numero: 'APL-2025-003', seguradoId: 3, ramo: 'Empresarial', seguradora: 'Tokio Marine', vigIni: '2025-09-01', vigFim: '2026-03-20', premio: 12000, numParcelas: 6, formaPagamento: 'Boleto', status: 'Ativa' },
  { id: 4, numero: 'APL-2025-004', seguradoId: 4, ramo: 'Residencial', seguradora: 'Bradesco Seguros', vigIni: '2025-10-01', vigFim: '2026-04-01', premio: 2400, numParcelas: 12, formaPagamento: 'Débito', status: 'Ativa' },
  { id: 5, numero: 'APL-2025-005', seguradoId: 5, ramo: 'Auto', seguradora: 'Liberty Seguros', vigIni: '2025-06-01', vigFim: '2026-03-15', premio: 4200, numParcelas: 12, formaPagamento: 'Boleto', status: 'Ativa' },
  { id: 6, numero: 'APL-2025-006', seguradoId: 6, ramo: 'Empresarial', seguradora: 'Allianz', vigIni: '2025-04-01', vigFim: '2026-04-01', premio: 18000, numParcelas: 12, formaPagamento: 'Boleto', status: 'Ativa' },
  { id: 7, numero: 'APL-2025-007', seguradoId: 7, ramo: 'Vida', seguradora: 'MetLife', vigIni: '2025-11-01', vigFim: '2026-11-01', premio: 960, numParcelas: 12, formaPagamento: 'Cartão', status: 'Ativa' },
  { id: 8, numero: 'APL-2024-008', seguradoId: 1, ramo: 'Residencial', seguradora: 'Porto Seguro', vigIni: '2024-03-01', vigFim: '2025-03-01', premio: 1200, numParcelas: 12, formaPagamento: 'Boleto', status: 'Vencida' },
  { id: 9, numero: 'APL-2025-009', seguradoId: 8, ramo: 'Auto', seguradora: 'HDI Seguros', vigIni: '2025-12-01', vigFim: '2026-12-01', premio: 5400, numParcelas: 12, formaPagamento: 'Boleto', status: 'Ativa' },
  { id: 10, numero: 'APL-2024-010', seguradoId: 3, ramo: 'Empresarial', seguradora: 'Zurich', vigIni: '2024-06-01', vigFim: '2025-06-01', premio: 24000, numParcelas: 12, formaPagamento: 'Boleto', status: 'Cancelada' },
];

export const ENDOSSOS_INIT: Endosso[] = [
  { id: 1, apoliceId: 1, tipo: 'Alteração', descricao: 'Troca de veículo segurado - Novo: Civic 2025', data: '2025-09-15', valorAjuste: 450 },
  { id: 2, apoliceId: 3, tipo: 'Inclusão', descricao: 'Inclusão de cobertura contra incêndio no galpão B', data: '2025-11-20', valorAjuste: 2000 },
  { id: 3, apoliceId: 6, tipo: 'Exclusão', descricao: 'Exclusão de filial desativada (unidade Centro)', data: '2026-01-10', valorAjuste: -1500 },
  { id: 4, apoliceId: 2, tipo: 'Alteração', descricao: 'Atualização de beneficiário principal', data: '2026-02-05', valorAjuste: 0 },
  { id: 5, apoliceId: 5, tipo: 'Inclusão', descricao: 'Inclusão de cobertura para vidros', data: '2025-08-22', valorAjuste: 300 },
];

export const SINISTROS_INIT: Sinistro[] = [
  { id: 1, seguradoId: 1, apoliceId: 1, dataOcorrencia: '2026-02-10', descricao: 'Colisão traseira no estacionamento do shopping', valorEstimado: 8500, status: 'Aberto' },
  { id: 2, seguradoId: 5, apoliceId: 5, dataOcorrencia: '2026-01-25', descricao: 'Furto de veículo na Av. Brasil', valorEstimado: 45000, status: 'Aberto' },
  { id: 3, seguradoId: 3, apoliceId: 3, dataOcorrencia: '2025-12-18', descricao: 'Danos por alagamento no escritório', valorEstimado: 15000, status: 'Em Análise' },
  { id: 4, seguradoId: 7, apoliceId: 7, dataOcorrencia: '2025-10-05', descricao: 'Internação hospitalar - procedimento cirúrgico', valorEstimado: 22000, status: 'Encerrado' },
  { id: 5, seguradoId: 4, apoliceId: 4, dataOcorrencia: '2025-11-30', descricao: 'Queda de árvore sobre o telhado', valorEstimado: 12000, status: 'Encerrado' },
  { id: 6, seguradoId: 6, apoliceId: 6, dataOcorrencia: '2026-03-01', descricao: 'Incêndio parcial no almoxarifado', valorEstimado: 35000, status: 'Aberto' },
];

export const AVERBACOES_INIT: Averbacao[] = [
  { id: 1, seguradoId: 1, tipo: 'Observação', descricao: 'Cliente solicitou revisão de valores para renovação', data: '2026-02-20', lancadoPor: 'Carlos Mendes', status: 'Ativa' },
  { id: 2, seguradoId: 3, tipo: 'Pendência', descricao: 'Aguardando documentação complementar da empresa', data: '2026-01-15', lancadoPor: 'Ana Souza', status: 'Ativa' },
  { id: 3, seguradoId: 5, tipo: 'Alerta', descricao: 'Segurado com histórico de 2 sinistros no último ano', data: '2025-12-10', lancadoPor: 'Carlos Mendes', status: 'Ativa' },
  { id: 4, seguradoId: 2, tipo: 'Observação', descricao: 'Preferência por contato via WhatsApp', data: '2025-09-01', lancadoPor: 'Ana Souza', status: 'Inativa' },
];

export function gerarParcelas(apolices: Apolice[]): Parcela[] {
  const hoje = new Date('2026-03-12');
  const parcelas: Parcela[] = [];
  let pid = 1;
  for (const ap of apolices) {
    if (ap.status === 'Cancelada') continue;
    const valorParcela = Math.round((ap.premio / ap.numParcelas) * 100) / 100;
    const ini = new Date(ap.vigIni);
    for (let i = 0; i < ap.numParcelas; i++) {
      const venc = new Date(ini);
      venc.setMonth(venc.getMonth() + i);
      const vencStr = venc.toISOString().slice(0, 10);
      let status: Parcela['status'] = 'Pendente';
      if (venc < hoje) {
        // ~80% paid, ~20% overdue for past dates
        status = (pid % 5 === 0) ? 'Atrasado' : 'Pago';
      }
      parcelas.push({ id: pid++, apoliceId: ap.id, numero: i + 1, total: ap.numParcelas, vencimento: vencStr, valor: valorParcela, status });
    }
  }
  return parcelas;
}
