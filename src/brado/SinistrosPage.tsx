import React, { useState } from 'react';
import { s, colors, formatDate, formatCurrency, statusBadge } from './styles';
import { Segurado, Apolice, Sinistro } from './types';

interface Props {
  segurados: Segurado[];
  apolices: Apolice[];
  sinistros: Sinistro[];
  setSinistros: React.Dispatch<React.SetStateAction<Sinistro[]>>;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}

export const SinistrosPage: React.FC<Props> = ({ segurados, apolices, sinistros, setSinistros, showModal, setShowModal }) => {
  const [filtroStatus, setFiltroStatus] = useState('');
  const [form, setForm] = useState({ seguradoId: 0, apoliceId: 0, dataOcorrencia: '', descricao: '', valorEstimado: '' });

  const filtered = sinistros.filter(si => !filtroStatus || si.status === filtroStatus);
  const getNome = (id: number) => segurados.find(seg => seg.id === id)?.nome || '';
  const getApolice = (id: number) => apolices.find(a => a.id === id);
  const apolicesFiltradas = form.seguradoId ? apolices.filter(a => a.seguradoId === form.seguradoId) : apolices;

  const alterarStatus = (si: Sinistro) => {
    const order: Sinistro['status'][] = ['Aberto', 'Em Análise', 'Encerrado', 'Negado'];
    const idx = order.indexOf(si.status);
    const next = order[(idx + 1) % order.length];
    setSinistros(prev => prev.map(x => x.id === si.id ? { ...x, status: next } : x));
  };

  const salvar = () => {
    if (!form.seguradoId || !form.apoliceId || !form.dataOcorrencia || !form.descricao) return;
    setSinistros(prev => [...prev, { id: Date.now(), seguradoId: form.seguradoId, apoliceId: form.apoliceId, dataOcorrencia: form.dataOcorrencia, descricao: form.descricao, valorEstimado: parseFloat(form.valorEstimado) || 0, status: 'Aberto' }]);
    setShowModal(false);
    setForm({ seguradoId: 0, apoliceId: 0, dataOcorrencia: '', descricao: '', valorEstimado: '' });
  };

  const inputProps = { onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.primary), onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.border) };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <select style={{ ...s.select, maxWidth: 200 }} value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option><option>Aberto</option><option>Em Análise</option><option>Encerrado</option><option>Negado</option>
        </select>
      </div>
      <table style={s.table}>
        <thead><tr>
          {['ID', 'Segurado', 'Apólice', 'Data', 'Descrição', 'Valor Est.', 'Status', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(si => {
            const sb = statusBadge(si.status);
            return (
              <tr key={si.id}>
                <td style={s.td}>#{si.id}</td>
                <td style={s.td}>{getNome(si.seguradoId)}</td>
                <td style={s.td}>{getApolice(si.apoliceId)?.numero}</td>
                <td style={s.td}>{formatDate(si.dataOcorrencia)}</td>
                <td style={{ ...s.td, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{si.descricao}</td>
                <td style={s.td}>{formatCurrency(si.valorEstimado)}</td>
                <td style={s.td}><span style={s.badge(sb.color, sb.background)}>{si.status}</span></td>
                <td style={s.td}><button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12 }} onClick={() => alterarStatus(si)}>Alterar Status</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Abrir Sinistro</h3>
            <div style={s.fieldGroup}><label style={s.label}>Segurado *</label>
              <select style={s.select} value={form.seguradoId} onChange={e => setForm({ ...form, seguradoId: parseInt(e.target.value), apoliceId: 0 })} {...inputProps}>
                <option value={0}>Selecionar...</option>{segurados.map(seg => <option key={seg.id} value={seg.id}>{seg.nome}</option>)}
              </select></div>
            <div style={s.fieldGroup}><label style={s.label}>Apólice *</label>
              <select style={s.select} value={form.apoliceId} onChange={e => setForm({ ...form, apoliceId: parseInt(e.target.value) })} {...inputProps}>
                <option value={0}>Selecionar...</option>{apolicesFiltradas.map(a => <option key={a.id} value={a.id}>{a.numero}</option>)}
              </select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Data da ocorrência *</label><input type="date" style={s.input} value={form.dataOcorrencia} onChange={e => setForm({ ...form, dataOcorrencia: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Valor estimado R$</label><input type="number" style={s.input} value={form.valorEstimado} onChange={e => setForm({ ...form, valorEstimado: e.target.value })} {...inputProps} /></div>
            </div>
            <div style={s.fieldGroup}><label style={s.label}>Descrição *</label><input style={s.input} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} {...inputProps} /></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button style={s.btn('secondary')} onClick={() => setShowModal(false)}>Cancelar</button>
              <button style={s.btn('primary')} onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
