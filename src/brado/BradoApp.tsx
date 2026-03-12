import React, { useState } from 'react';
import { getStyles, getColors, diffDays } from './styles';
import { useTheme, ThemeProvider } from './ThemeContext';
import { Usuario, Segurado, Apolice, Endosso, Sinistro, Parcela, Averbacao, PageId } from './types';
import { USUARIOS, SEGURADOS_INIT, APOLICES_INIT, ENDOSSOS_INIT, SINISTROS_INIT, AVERBACOES_INIT, gerarParcelas } from './seedData';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { SeguradosPage } from './SeguradosPage';
import { ApolicesPage } from './ApolicesPage';
import { FaturamentoPage } from './FaturamentoPage';
import { SinistrosPage } from './SinistrosPage';
import { RenovacoesPage } from './RenovacoesPage';
import { RelatoriosPage } from './RelatoriosPage';
import { AvebacoesPage } from './AverbacoesPage';
import {
  LayoutDashboard, Users, FileText, DollarSign, AlertTriangle,
  RefreshCw, BarChart3, BookOpen, Zap, Moon, Sun, Plus, LogOut
} from 'lucide-react';

const menuIcons: Record<PageId, React.ReactNode> = {
  dashboard: <LayoutDashboard size={18} />,
  segurados: <Users size={18} />,
  apolices: <FileText size={18} />,
  faturamento: <DollarSign size={18} />,
  sinistros: <AlertTriangle size={18} />,
  renovacoes: <RefreshCw size={18} />,
  relatorios: <BarChart3 size={18} />,
  averbacoes: <BookOpen size={18} />,
};

const menuItems: { id: PageId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'segurados', label: 'Segurados' },
  { id: 'apolices', label: 'Apólices' },
  { id: 'faturamento', label: 'Faturamento' },
  { id: 'sinistros', label: 'Sinistros' },
  { id: 'renovacoes', label: 'Renovações' },
  { id: 'relatorios', label: 'Relatórios' },
  { id: 'averbacoes', label: 'Averbações' },
];

const pageLabels: Record<PageId, string> = {
  dashboard: 'Dashboard', segurados: 'Segurados', apolices: 'Apólices', faturamento: 'Faturamento',
  sinistros: 'Sinistros', renovacoes: 'Renovações', relatorios: 'Relatórios', averbacoes: 'Averbações',
};

const BradoInner: React.FC = () => {
  const { theme, toggle } = useTheme();
  const c = getColors(theme);
  const s = getStyles(c);

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [page, setPage] = useState<PageId>('dashboard');
  const [segurados, setSegurados] = useState<Segurado[]>(SEGURADOS_INIT);
  const [apolices, setApolices] = useState<Apolice[]>(APOLICES_INIT);
  const [endossos, setEndossos] = useState<Endosso[]>(ENDOSSOS_INIT);
  const [sinistros, setSinistros] = useState<Sinistro[]>(SINISTROS_INIT);
  const [averbacoes, setAverbacoes] = useState<Averbacao[]>(AVERBACOES_INIT);
  const [parcelas, setParcelas] = useState<Parcela[]>(() => gerarParcelas(APOLICES_INIT));

  const [showSeguradoModal, setShowSeguradoModal] = useState(false);
  const [showApoliceModal, setShowApoliceModal] = useState(false);
  const [showEndossoModal, setShowEndossoModal] = useState(false);
  const [showSinistroModal, setShowSinistroModal] = useState(false);
  const [showAverbacaoModal, setShowAverbacaoModal] = useState(false);
  const [preSelectedSeguradoId, setPreSelectedSeguradoId] = useState<number | null>(null);
  const [endossoApoliceId, setEndossoApoliceId] = useState<number | null>(null);

  const sinistrosAbertos = sinistros.filter(si => si.status === 'Aberto' || si.status === 'Em Análise').length;
  const renovacoesCount = apolices.filter(a => a.status === 'Ativa' && diffDays(a.vigFim) >= 0 && diffDays(a.vigFim) <= 30).length;

  if (!usuarioLogado) return <LoginPage onLogin={setUsuarioLogado} usuarios={USUARIOS} />;

  const handleNovaApolice = (seguradoId?: number) => {
    if (seguradoId) setPreSelectedSeguradoId(seguradoId);
    setShowApoliceModal(true);
    setPage('apolices');
  };

  const handleNovoEndosso = (seguradoId?: number) => {
    const ap = apolices.find(a => a.seguradoId === seguradoId && a.status === 'Ativa');
    if (ap) setEndossoApoliceId(ap.id);
    setShowEndossoModal(true);
    setPage('apolices');
  };

  const contextBtn = () => {
    switch (page) {
      case 'segurados': return <button style={s.btn('primary')} onClick={() => setShowSeguradoModal(true)}><Plus size={15} /> Novo Segurado</button>;
      case 'apolices': return <button style={s.btn('primary')} onClick={() => { setPreSelectedSeguradoId(null); setShowApoliceModal(true); }}><Plus size={15} /> Nova Apólice</button>;
      case 'sinistros': return <button style={s.btn('primary')} onClick={() => setShowSinistroModal(true)}><Zap size={15} /> Abrir Sinistro</button>;
      case 'averbacoes': return <button style={s.btn('primary')} onClick={() => setShowAverbacaoModal(true)}><Plus size={15} /> Nova Averbação</button>;
      default: return null;
    }
  };

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: c.textMuted, fontWeight: 600 }}>Corretora de Seguros</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: c.primary, lineHeight: 1.2 }}>BRADO</div>
          <div style={{ fontSize: 12, color: c.textSecondary }}>Sistema de Gestão</div>
        </div>

        <nav style={{ flex: 1 }}>
          {menuItems.map(item => (
            <div key={item.id} style={s.menuItem(page === item.id)} onClick={() => setPage(item.id)}
              onMouseEnter={e => { if (page !== item.id) (e.currentTarget.style.background = c.hoverBg); }}
              onMouseLeave={e => { if (page !== item.id) (e.currentTarget.style.background = 'transparent'); }}>
              {menuIcons[item.id]}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === 'sinistros' && sinistrosAbertos > 0 && <span style={{ ...s.badge(c.danger, c.dangerBg), fontSize: 11 }}>{sinistrosAbertos}</span>}
              {item.id === 'renovacoes' && renovacoesCount > 0 && <span style={{ ...s.badge(c.warning, c.warningBg), fontSize: 11 }}>{renovacoesCount}</span>}
            </div>
          ))}
        </nav>

        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14, marginTop: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, marginBottom: 8 }}>Fluxo Operacional</div>
          {['1. Cadastrar Segurado', '2. Lançar Apólice', '3. Lançar Endosso', '4. Controlar Pagamentos', '5. Gerir Sinistros', '6. Averbações Manuais'].map(t => (
            <div key={t} style={{ fontSize: 11, color: c.textSecondary, marginBottom: 3 }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div style={s.mainArea}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={{ fontSize: 12, color: c.textMuted }}>Brado Corretora · Março 2026</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{pageLabels[page]}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {contextBtn()}
            {/* Theme toggle */}
            <button onClick={toggle} style={{
              background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 20, padding: '6px 14px',
              cursor: 'pointer', fontSize: 18, color: c.text, display: 'flex', alignItems: 'center', gap: 4, lineHeight: 1
            }} title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {/* User badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 24, background: c.cardBg }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
                {usuarioLogado.iniciais}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{usuarioLogado.nome}</div>
                <div style={{ fontSize: 11, color: c.textMuted }}>{usuarioLogado.perfil}</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', fontSize: 12, marginLeft: 4 }} onClick={() => setUsuarioLogado(null)}>Sair</button>
            </div>
          </div>
        </div>

        {/* Content box */}
        <div style={s.contentBox}>
          {page === 'dashboard' && <DashboardPage segurados={segurados} apolices={apolices} sinistros={sinistros} parcelas={parcelas} />}
          {page === 'segurados' && <SeguradosPage segurados={segurados} setSegurados={setSegurados} onNovaApolice={handleNovaApolice} onNovoEndosso={handleNovoEndosso} apoliceCount={id => apolices.filter(a => a.seguradoId === id).length} />}
          {page === 'apolices' && <ApolicesPage segurados={segurados} apolices={apolices} setApolices={setApolices} endossos={endossos} setEndossos={setEndossos} parcelas={parcelas} setParcelas={setParcelas} preSelectedSeguradoId={preSelectedSeguradoId} showApoliceModal={showApoliceModal} setShowApoliceModal={setShowApoliceModal} showEndossoModal={showEndossoModal} setShowEndossoModal={setShowEndossoModal} endossoApoliceId={endossoApoliceId} />}
          {page === 'faturamento' && <FaturamentoPage segurados={segurados} apolices={apolices} parcelas={parcelas} setParcelas={setParcelas} />}
          {page === 'sinistros' && <SinistrosPage segurados={segurados} apolices={apolices} sinistros={sinistros} setSinistros={setSinistros} showModal={showSinistroModal} setShowModal={setShowSinistroModal} />}
          {page === 'renovacoes' && <RenovacoesPage segurados={segurados} apolices={apolices} setApolices={setApolices} />}
          {page === 'relatorios' && <RelatoriosPage apolices={apolices} sinistros={sinistros} parcelas={parcelas} />}
          {page === 'averbacoes' && <AvebacoesPage segurados={segurados} averbacoes={averbacoes} setAverbacoes={setAverbacoes} usuarioNome={usuarioLogado.nome} showModal={showAverbacaoModal} setShowModal={setShowAverbacaoModal} />}
        </div>
      </div>

      {/* Segurado modal from header */}
      {showSeguradoModal && page === 'segurados' && (
        <SeguradoModal c={c} s={s} setSegurados={setSegurados} onClose={() => setShowSeguradoModal(false)} />
      )}
    </div>
  );
};

const SeguradoModal: React.FC<{ c: any; s: any; setSegurados: React.Dispatch<React.SetStateAction<Segurado[]>>; onClose: () => void }> = ({ c, s, setSegurados, onClose }) => {
  const emptyEndereco = { logradouro: '', numero: '', bairro: '', cidade: '', uf: '', cep: '' };
  const [form, setForm] = useState({ nome: '', cpfCnpj: '', email: '', telefone: '', endereco: { ...emptyEndereco } });

  const salvar = () => {
    if (!form.nome || !form.cpfCnpj) return;
    setSegurados(prev => [...prev, { ...form, id: Date.now(), criadoEm: '2026-03-12' }]);
    onClose();
  };

  const inputProps = { onFocus: (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = c.primary), onBlur: (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = c.border) };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Novo Segurado</h3>
        <div style={s.fieldGroup}><label style={s.label}>Nome completo *</label><input style={s.input} value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} {...inputProps} /></div>
        <div style={s.fieldGroup}><label style={s.label}>CPF/CNPJ *</label><input style={s.input} value={form.cpfCnpj} onChange={e => setForm({ ...form, cpfCnpj: e.target.value })} {...inputProps} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={s.fieldGroup}><label style={s.label}>E-mail</label><input style={s.input} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} {...inputProps} /></div>
          <div style={s.fieldGroup}><label style={s.label}>Telefone</label><input style={s.input} value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} {...inputProps} /></div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: '8px 0 10px', color: c.textSecondary }}>Endereço</div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <div style={s.fieldGroup}><label style={s.label}>Logradouro</label><input style={s.input} value={form.endereco.logradouro} onChange={e => setForm({ ...form, endereco: { ...form.endereco, logradouro: e.target.value } })} {...inputProps} /></div>
          <div style={s.fieldGroup}><label style={s.label}>Número</label><input style={s.input} value={form.endereco.numero} onChange={e => setForm({ ...form, endereco: { ...form.endereco, numero: e.target.value } })} {...inputProps} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
          <div style={s.fieldGroup}><label style={s.label}>Bairro</label><input style={s.input} value={form.endereco.bairro} onChange={e => setForm({ ...form, endereco: { ...form.endereco, bairro: e.target.value } })} {...inputProps} /></div>
          <div style={s.fieldGroup}><label style={s.label}>Cidade</label><input style={s.input} value={form.endereco.cidade} onChange={e => setForm({ ...form, endereco: { ...form.endereco, cidade: e.target.value } })} {...inputProps} /></div>
          <div style={s.fieldGroup}><label style={s.label}>UF</label><input style={s.input} value={form.endereco.uf} onChange={e => setForm({ ...form, endereco: { ...form.endereco, uf: e.target.value } })} {...inputProps} /></div>
          <div style={s.fieldGroup}><label style={s.label}>CEP</label><input style={s.input} value={form.endereco.cep} onChange={e => setForm({ ...form, endereco: { ...form.endereco, cep: e.target.value } })} {...inputProps} /></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
          <button style={s.btn('secondary')} onClick={onClose}>Cancelar</button>
          <button style={s.btn('primary')} onClick={salvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export const BradoApp: React.FC = () => (
  <ThemeProvider>
    <BradoInner />
  </ThemeProvider>
);
