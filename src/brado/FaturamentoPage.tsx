import React, { useState } from 'react';
import { s, colors, formatDate, formatCurrency, statusBadge } from './styles';
import { Segurado, Apolice, Parcela } from './types';

interface Props {
  segurados: Segurado[];
  apolices: Apolice[];
  parcelas: Parcela[];
  setParcelas: React.Dispatch<React.SetStateAction<Parcela[]>>;
}

export const FaturamentoPage: React.FC<Props> = ({ segurados, apolices, parcelas, setParcelas }) => {
  const [filtroStatus, setFiltroStatus] = useState('');

  const totalReceber = parcelas.filter(p => p.status === 'Pendente').reduce((s, p) => s + p.valor, 0);
  const totalRecebido = parcelas.filter(p => p.status === 'Pago').reduce((s, p) => s + p.valor, 0);
  const totalAtraso = parcelas.filter(p => p.status === 'Atrasado').reduce((s, p) => s + p.valor, 0);

  const filtered = parcelas.filter(p => !filtroStatus || p.status === filtroStatus);
  const getApolice = (id: number) => apolices.find(a => a.id === id);
  const getNome = (apId: number) => { const ap = getApolice(apId); return ap ? segurados.find(seg => seg.id === ap.seguradoId)?.nome || '' : ''; };

  const toggleStatus = (p: Parcela) => {
    setParcelas(prev => prev.map(x => x.id === p.id ? { ...x, status: x.status === 'Pago' ? 'Pendente' : 'Pago' } : x));
  };

  const cards = [
    { label: 'Total a Receber', value: formatCurrency(totalReceber), color: colors.primary },
    { label: 'Total Recebido', value: formatCurrency(totalRecebido), color: '#2e7d32' },
    { label: 'Total em Atraso', value: formatCurrency(totalAtraso), color: colors.danger },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {cards.map((c, i) => (
          <div key={i} style={s.kpiCard(c.color)}>
            <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <select style={{ ...s.select, maxWidth: 200 }} value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option><option>Pendente</option><option>Pago</option><option>Atrasado</option>
        </select>
      </div>

      <table style={s.table}>
        <thead><tr>
          {['Apólice', 'Segurado', 'Parcela', 'Vencimento', 'Valor', 'Status', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.slice(0, 50).map(p => {
            const ap = getApolice(p.apoliceId);
            const sb = statusBadge(p.status);
            return (
              <tr key={p.id}>
                <td style={s.td}>{ap?.numero}</td>
                <td style={s.td}>{getNome(p.apoliceId)}</td>
                <td style={s.td}>{p.numero}/{p.total}</td>
                <td style={s.td}>{formatDate(p.vencimento)}</td>
                <td style={s.td}>{formatCurrency(p.valor)}</td>
                <td style={s.td}><span style={s.badge(sb.color, sb.background)}>{p.status}</span></td>
                <td style={s.td}>
                  <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12 }} onClick={() => toggleStatus(p)}>
                    {p.status === 'Pago' ? 'Estornar' : 'Marcar como Pago'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
