import React, { useState } from 'react';
import { s, colors, formatDate, formatCurrency, urgencyBadge, diffDays } from './styles';
import { Segurado, Apolice } from './types';

interface Props {
  segurados: Segurado[];
  apolices: Apolice[];
  setApolices: React.Dispatch<React.SetStateAction<Apolice[]>>;
}

export const RenovacoesPage: React.FC<Props> = ({ segurados, apolices, setApolices }) => {
  const [renovarId, setRenovarId] = useState<number | null>(null);
  const [novaVigFim, setNovaVigFim] = useState('');

  const ativas = apolices.filter(a => a.status === 'Ativa');
  const vencendo = ativas.filter(a => { const d = diffDays(a.vigFim); return d >= 0 && d <= 30; }).sort((a, b) => diffDays(a.vigFim) - diffDays(b.vigFim));
  const getNome = (id: number) => segurados.find(seg => seg.id === id)?.nome || '';

  const renovar = (id: number) => {
    if (!novaVigFim) return;
    setApolices(prev => prev.map(a => a.id === id ? { ...a, vigFim: novaVigFim } : a));
    setRenovarId(null);
    setNovaVigFim('');
  };

  return (
    <div>
      <table style={s.table}>
        <thead><tr>
          {['Apólice', 'Segurado', 'Ramo', 'Vencimento', 'Dias Restantes', 'Prêmio Atual', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {vencendo.map(a => {
            const dias = diffDays(a.vigFim);
            const [uc, ub] = urgencyBadge(dias);
            return (
              <tr key={a.id}>
                <td style={s.td}>{a.numero}</td>
                <td style={s.td}>{getNome(a.seguradoId)}</td>
                <td style={s.td}>{a.ramo}</td>
                <td style={s.td}>{formatDate(a.vigFim)}</td>
                <td style={s.td}><span style={s.badge(uc, ub)}>{dias} dias</span></td>
                <td style={s.td}>{formatCurrency(a.premio)}</td>
                <td style={s.td}>
                  {renovarId === a.id ? (
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input type="date" style={{ ...s.input, width: 150, padding: '4px 8px' }} value={novaVigFim} onChange={e => setNovaVigFim(e.target.value)} />
                      <button style={{ ...s.btn('primary'), padding: '4px 12px', fontSize: 12 }} onClick={() => renovar(a.id)}>OK</button>
                      <button style={{ ...s.btn('secondary'), padding: '4px 12px', fontSize: 12 }} onClick={() => setRenovarId(null)}>✕</button>
                    </div>
                  ) : (
                    <button style={{ ...s.btn('primary'), padding: '4px 12px', fontSize: 12 }} onClick={() => setRenovarId(a.id)}>Renovar</button>
                  )}
                </td>
              </tr>
            );
          })}
          {vencendo.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: 'center', color: colors.textMuted }}>Nenhuma apólice vencendo nos próximos 30 dias</td></tr>}
        </tbody>
      </table>
    </div>
  );
};
