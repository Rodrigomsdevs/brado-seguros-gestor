import React, { useState } from 'react';
import { s, colors, formatDate, formatCurrency, statusBadge } from './styles';
import { Segurado, Apolice, Endosso, Parcela } from './types';

interface Props {
  segurados: Segurado[];
  apolices: Apolice[];
  setApolices: React.Dispatch<React.SetStateAction<Apolice[]>>;
  endossos: Endosso[];
  setEndossos: React.Dispatch<React.SetStateAction<Endosso[]>>;
  parcelas: Parcela[];
  setParcelas: React.Dispatch<React.SetStateAction<Parcela[]>>;
  preSelectedSeguradoId?: number | null;
  showApoliceModal: boolean;
  setShowApoliceModal: (v: boolean) => void;
  showEndossoModal: boolean;
  setShowEndossoModal: (v: boolean) => void;
  endossoApoliceId?: number | null;
}

export const ApolicesPage: React.FC<Props> = ({
  segurados, apolices, setApolices, endossos, setEndossos, parcelas, setParcelas,
  preSelectedSeguradoId, showApoliceModal, setShowApoliceModal, showEndossoModal, setShowEndossoModal, endossoApoliceId
}) => {
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroRamo, setFiltroRamo] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [apForm, setApForm] = useState({ seguradoId: preSelectedSeguradoId || 0, ramo: '', seguradora: '', numero: '', vigIni: '', vigFim: '', premio: '', numParcelas: '12', formaPagamento: 'Boleto' });
  const [endForm, setEndForm] = useState({ apoliceId: endossoApoliceId || 0, tipo: 'Inclusão' as Endosso['tipo'], descricao: '', data: '', valorAjuste: '' });

  React.useEffect(() => { if (preSelectedSeguradoId) setApForm(f => ({ ...f, seguradoId: preSelectedSeguradoId })); }, [preSelectedSeguradoId]);
  React.useEffect(() => { if (endossoApoliceId) setEndForm(f => ({ ...f, apoliceId: endossoApoliceId })); }, [endossoApoliceId]);

  const filtered = apolices.filter(a => (!filtroStatus || a.status === filtroStatus) && (!filtroRamo || a.ramo === filtroRamo));
  const getNome = (id: number) => segurados.find(s => s.id === id)?.nome || '';

  const salvarApolice = () => {
    if (!apForm.seguradoId || !apForm.numero || !apForm.vigIni || !apForm.vigFim || !apForm.premio) return;
    const novaAp: Apolice = {
      id: Date.now(), numero: apForm.numero, seguradoId: apForm.seguradoId, ramo: apForm.ramo, seguradora: apForm.seguradora,
      vigIni: apForm.vigIni, vigFim: apForm.vigFim, premio: parseFloat(apForm.premio), numParcelas: parseInt(apForm.numParcelas),
      formaPagamento: apForm.formaPagamento, status: 'Ativa'
    };
    setApolices(prev => [...prev, novaAp]);
    // gerar parcelas
    const hoje = new Date('2026-03-12');
    const valorP = Math.round((novaAp.premio / novaAp.numParcelas) * 100) / 100;
    const ini = new Date(novaAp.vigIni);
    const novasParcelas: Parcela[] = [];
    for (let i = 0; i < novaAp.numParcelas; i++) {
      const venc = new Date(ini); venc.setMonth(venc.getMonth() + i);
      novasParcelas.push({ id: Date.now() + i + 1, apoliceId: novaAp.id, numero: i + 1, total: novaAp.numParcelas, vencimento: venc.toISOString().slice(0, 10), valor: valorP, status: venc < hoje ? 'Pago' : 'Pendente' });
    }
    setParcelas(prev => [...prev, ...novasParcelas]);
    setShowApoliceModal(false);
    setApForm({ seguradoId: 0, ramo: '', seguradora: '', numero: '', vigIni: '', vigFim: '', premio: '', numParcelas: '12', formaPagamento: 'Boleto' });
  };

  const salvarEndosso = () => {
    if (!endForm.apoliceId || !endForm.descricao || !endForm.data) return;
    setEndossos(prev => [...prev, { id: Date.now(), apoliceId: endForm.apoliceId, tipo: endForm.tipo, descricao: endForm.descricao, data: endForm.data, valorAjuste: parseFloat(endForm.valorAjuste) || 0 }]);
    setShowEndossoModal(false);
    setEndForm({ apoliceId: 0, tipo: 'Inclusão', descricao: '', data: '', valorAjuste: '' });
  };

  const inputProps = { onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.primary), onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.border) };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select style={{ ...s.select, maxWidth: 180 }} value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option><option>Ativa</option><option>Vencida</option><option>Cancelada</option>
        </select>
        <select style={{ ...s.select, maxWidth: 180 }} value={filtroRamo} onChange={e => setFiltroRamo(e.target.value)}>
          <option value="">Todos os ramos</option><option>Auto</option><option>Vida</option><option>Residencial</option><option>Empresarial</option>
        </select>
      </div>

      <table style={s.table}>
        <thead><tr>
          {['Nº Apólice', 'Segurado', 'Ramo', 'Seguradora', 'Vigência', 'Prêmio', 'Status', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(a => {
            const sb = statusBadge(a.status);
            const apEndossos = endossos.filter(e => e.apoliceId === a.id);
            return (
              <React.Fragment key={a.id}>
                <tr style={{ cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}>
                  <td style={{ ...s.td, fontWeight: 500 }}>{a.numero}</td>
                  <td style={s.td}>{getNome(a.seguradoId)}</td>
                  <td style={s.td}>{a.ramo}</td>
                  <td style={s.td}>{a.seguradora}</td>
                  <td style={s.td}>{formatDate(a.vigIni)} → {formatDate(a.vigFim)}</td>
                  <td style={s.td}>{formatCurrency(a.premio)}</td>
                  <td style={s.td}><span style={s.badge(sb.color, sb.background)}>{a.status}</span></td>
                  <td style={s.td}>
                    <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12 }} onClick={e => { e.stopPropagation(); setEndForm(f => ({ ...f, apoliceId: a.id })); setShowEndossoModal(true); }}>Novo Endosso</button>
                  </td>
                </tr>
                {expandedId === a.id && apEndossos.length > 0 && (
                  <tr><td colSpan={8} style={{ padding: '8px 24px 16px', background: colors.cardBg }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: colors.textSecondary }}>Endossos vinculados</div>
                    <table style={{ ...s.table, fontSize: 13 }}>
                      <thead><tr>{['Tipo', 'Descrição', 'Data', 'Valor Ajuste'].map(h => <th key={h} style={{ ...s.th, fontSize: 11 }}>{h}</th>)}</tr></thead>
                      <tbody>{apEndossos.map(en => (
                        <tr key={en.id}>
                          <td style={s.td}>{en.tipo}</td><td style={s.td}>{en.descricao}</td>
                          <td style={s.td}>{formatDate(en.data)}</td><td style={s.td}>{formatCurrency(en.valorAjuste)}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </td></tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Modal Nova Apólice */}
      {showApoliceModal && (
        <div style={s.overlay} onClick={() => setShowApoliceModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Nova Apólice</h3>
            <div style={s.fieldGroup}><label style={s.label}>Segurado *</label>
              <select style={s.select} value={apForm.seguradoId} onChange={e => setApForm({ ...apForm, seguradoId: parseInt(e.target.value) })} {...inputProps}>
                <option value={0}>Selecionar...</option>{segurados.map(seg => <option key={seg.id} value={seg.id}>{seg.nome}</option>)}
              </select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Ramo *</label>
                <select style={s.select} value={apForm.ramo} onChange={e => setApForm({ ...apForm, ramo: e.target.value })} {...inputProps}>
                  <option value="">Selecionar...</option><option>Auto</option><option>Vida</option><option>Residencial</option><option>Empresarial</option>
                </select></div>
              <div style={s.fieldGroup}><label style={s.label}>Seguradora *</label><input style={s.input} value={apForm.seguradora} onChange={e => setApForm({ ...apForm, seguradora: e.target.value })} {...inputProps} /></div>
            </div>
            <div style={s.fieldGroup}><label style={s.label}>Número da apólice *</label><input style={s.input} value={apForm.numero} onChange={e => setApForm({ ...apForm, numero: e.target.value })} {...inputProps} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Vigência início *</label><input type="date" style={s.input} value={apForm.vigIni} onChange={e => setApForm({ ...apForm, vigIni: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Vigência fim *</label><input type="date" style={s.input} value={apForm.vigFim} onChange={e => setApForm({ ...apForm, vigFim: e.target.value })} {...inputProps} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Prêmio total R$ *</label><input type="number" style={s.input} value={apForm.premio} onChange={e => setApForm({ ...apForm, premio: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Nº de parcelas *</label><input type="number" style={s.input} value={apForm.numParcelas} onChange={e => setApForm({ ...apForm, numParcelas: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Forma de pagamento *</label>
                <select style={s.select} value={apForm.formaPagamento} onChange={e => setApForm({ ...apForm, formaPagamento: e.target.value })} {...inputProps}>
                  <option>Boleto</option><option>Cartão</option><option>Débito</option><option>PIX</option>
                </select></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button style={s.btn('secondary')} onClick={() => setShowApoliceModal(false)}>Cancelar</button>
              <button style={s.btn('primary')} onClick={salvarApolice}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Endosso */}
      {showEndossoModal && (
        <div style={s.overlay} onClick={() => setShowEndossoModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Novo Endosso</h3>
            {endForm.apoliceId > 0 && (() => {
              const ap = apolices.find(a => a.id === endForm.apoliceId);
              return ap ? <div style={{ background: colors.cardBg, borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
                <strong>{ap.numero}</strong> — {getNome(ap.seguradoId)}
              </div> : null;
            })()}
            <div style={s.fieldGroup}><label style={s.label}>Tipo *</label>
              <select style={s.select} value={endForm.tipo} onChange={e => setEndForm({ ...endForm, tipo: e.target.value as Endosso['tipo'] })} {...inputProps}>
                <option>Inclusão</option><option>Exclusão</option><option>Alteração</option>
              </select></div>
            <div style={s.fieldGroup}><label style={s.label}>Descrição *</label><input style={s.input} value={endForm.descricao} onChange={e => setEndForm({ ...endForm, descricao: e.target.value })} {...inputProps} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Data *</label><input type="date" style={s.input} value={endForm.data} onChange={e => setEndForm({ ...endForm, data: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Valor de ajuste R$</label><input type="number" style={s.input} value={endForm.valorAjuste} onChange={e => setEndForm({ ...endForm, valorAjuste: e.target.value })} {...inputProps} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button style={s.btn('secondary')} onClick={() => setShowEndossoModal(false)}>Cancelar</button>
              <button style={s.btn('primary')} onClick={salvarEndosso}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
