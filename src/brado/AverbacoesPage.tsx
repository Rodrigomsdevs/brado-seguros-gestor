import React, { useState } from 'react';
import { s, colors, formatDate, statusBadge } from './styles';
import { Segurado, Averbacao } from './types';

interface Props {
  segurados: Segurado[];
  averbacoes: Averbacao[];
  setAverbacoes: React.Dispatch<React.SetStateAction<Averbacao[]>>;
  usuarioNome: string;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}

export const AvebacoesPage: React.FC<Props> = ({ segurados, averbacoes, setAverbacoes, usuarioNome, showModal, setShowModal }) => {
  const [filtroSegurado, setFiltroSegurado] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [form, setForm] = useState({ seguradoId: 0, tipo: '', descricao: '', data: '' });

  const getNome = (id: number) => segurados.find(seg => seg.id === id)?.nome || '';
  const filtered = averbacoes.filter(a => (!filtroSegurado || a.seguradoId === parseInt(filtroSegurado)) && (!filtroTipo || a.tipo === filtroTipo));

  const salvar = () => {
    if (!form.seguradoId || !form.tipo || !form.descricao || !form.data) return;
    setAverbacoes(prev => [...prev, { id: Date.now(), seguradoId: form.seguradoId, tipo: form.tipo, descricao: form.descricao, data: form.data, lancadoPor: usuarioNome, status: 'Ativa' }]);
    setShowModal(false);
    setForm({ seguradoId: 0, tipo: '', descricao: '', data: '' });
  };

  const inputProps = { onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.primary), onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = colors.border) };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <select style={{ ...s.select, maxWidth: 200 }} value={filtroSegurado} onChange={e => setFiltroSegurado(e.target.value)}>
          <option value="">Todos os segurados</option>{segurados.map(seg => <option key={seg.id} value={seg.id}>{seg.nome}</option>)}
        </select>
        <select style={{ ...s.select, maxWidth: 180 }} value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
          <option value="">Todos os tipos</option><option>Observação</option><option>Pendência</option><option>Alerta</option>
        </select>
      </div>

      <table style={s.table}>
        <thead><tr>
          {['Data', 'Segurado', 'Tipo', 'Descrição', 'Lançado por', 'Status', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(a => {
            const sb = statusBadge(a.status);
            return (
              <tr key={a.id}>
                <td style={s.td}>{formatDate(a.data)}</td>
                <td style={s.td}>{getNome(a.seguradoId)}</td>
                <td style={s.td}>{a.tipo}</td>
                <td style={{ ...s.td, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.descricao}</td>
                <td style={s.td}>{a.lancadoPor}</td>
                <td style={s.td}><span style={s.badge(sb.color, sb.background)}>{a.status}</span></td>
                <td style={s.td}>
                  <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12, marginRight: 4 }}>Ver</button>
                  <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12 }}>Editar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Nova Averbação</h3>
            <div style={s.fieldGroup}><label style={s.label}>Segurado *</label>
              <select style={s.select} value={form.seguradoId} onChange={e => setForm({ ...form, seguradoId: parseInt(e.target.value) })} {...inputProps}>
                <option value={0}>Selecionar...</option>{segurados.map(seg => <option key={seg.id} value={seg.id}>{seg.nome}</option>)}
              </select></div>
            <div style={s.fieldGroup}><label style={s.label}>Tipo *</label>
              <select style={s.select} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} {...inputProps}>
                <option value="">Selecionar...</option><option>Observação</option><option>Pendência</option><option>Alerta</option>
              </select></div>
            <div style={s.fieldGroup}><label style={s.label}>Descrição *</label><input style={s.input} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} {...inputProps} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Data *</label><input type="date" style={s.input} value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} {...inputProps} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Lançado por</label><input style={{ ...s.input, background: '#f5f5f5' }} value={usuarioNome} readOnly /></div>
            </div>
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
