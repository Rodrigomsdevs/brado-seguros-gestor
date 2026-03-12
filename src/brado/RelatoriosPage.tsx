import React, { useState } from 'react';
import { s, colors, formatCurrency, formatDate } from './styles';
import { Apolice, Sinistro, Parcela } from './types';

interface Props {
  apolices: Apolice[];
  sinistros: Sinistro[];
  parcelas: Parcela[];
}

export const RelatoriosPage: React.FC<Props> = ({ apolices, sinistros, parcelas }) => {
  const [dataIni, setDataIni] = useState('2025-01-01');
  const [dataFim, setDataFim] = useState('2026-03-31');

  const ativas = apolices.filter(a => a.status !== 'Cancelada');
  const ramos = ['Auto', 'Vida', 'Residencial', 'Empresarial'];
  const ramoCount = ramos.map(r => ativas.filter(a => a.ramo === r).length);
  const maxRamo = Math.max(...ramoCount, 1);
  const ramoColors = ['#1a73e8', '#e91e63', '#ff9800', '#4caf50'];

  const totalPremios = ativas.reduce((s, a) => s + a.premio, 0);
  const totalSinistros = sinistros.reduce((s, si) => s + si.valorEstimado, 0);
  const sinistralidade = totalPremios > 0 ? ((totalSinistros / totalPremios) * 100).toFixed(1) : '0';

  const pagas = parcelas.filter(p => p.status === 'Pago');
  const atrasadas = parcelas.filter(p => p.status === 'Atrasado');
  const totalFat = pagas.reduce((s, p) => s + p.valor, 0);
  const totalInad = atrasadas.reduce((s, p) => s + p.valor, 0);

  // top 10 segurados by count
  const segCount: Record<number, number> = {};
  ativas.forEach(a => { segCount[a.seguradoId] = (segCount[a.seguradoId] || 0) + 1; });
  const top10 = Object.entries(segCount).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxSeg = Math.max(...top10.map(t => t[1]), 1);

  const barStyle = (pct: number, color: string): React.CSSProperties => ({
    height: 20, width: `${pct}%`, background: color, borderRadius: 4, minWidth: 4, transition: 'width 0.3s'
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <label style={{ fontSize: 13, color: colors.textSecondary }}>Período:</label>
        <input type="date" style={{ ...s.input, width: 160 }} value={dataIni} onChange={e => setDataIni(e.target.value)} />
        <span style={{ color: colors.textMuted }}>a</span>
        <input type="date" style={{ ...s.input, width: 160 }} value={dataFim} onChange={e => setDataFim(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Produção */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Produção por Período</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.primary }}>{ativas.length}</div>
          <div style={{ fontSize: 12, color: colors.textMuted }}>apólices emitidas</div>
        </div>

        {/* Faturamento */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Faturamento por Período</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#2e7d32' }}>{formatCurrency(totalFat)}</div>
          <div style={{ fontSize: 12, color: colors.textMuted }}>total recebido</div>
        </div>

        {/* Sinistralidade */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Sinistralidade</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: parseFloat(sinistralidade) > 70 ? colors.danger : colors.primary }}>{sinistralidade}%</span>
          </div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
            Sinistros: {formatCurrency(totalSinistros)} / Prêmios: {formatCurrency(totalPremios)}
          </div>
          <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, marginTop: 10 }}>
            <div style={{ height: '100%', width: `${Math.min(parseFloat(sinistralidade), 100)}%`, background: parseFloat(sinistralidade) > 70 ? colors.danger : colors.primary, borderRadius: 4 }} />
          </div>
        </div>

        {/* Apólices por ramo */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Apólices por Ramo</div>
          {ramos.map((r, i) => (
            <div key={r} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}><span>{r}</span><span style={{ fontWeight: 600 }}>{ramoCount[i]}</span></div>
              <div style={{ height: 20, background: '#e0e0e0', borderRadius: 4 }}>
                <div style={barStyle((ramoCount[i] / maxRamo) * 100, ramoColors[i])} />
              </div>
            </div>
          ))}
        </div>

        {/* Top segurados */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Top Segurados (por nº de apólices)</div>
          {top10.map(([id, count], i) => (
            <div key={id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 2 }}><span>Segurado #{id}</span><span style={{ fontWeight: 600 }}>{count}</span></div>
              <div style={{ height: 16, background: '#e0e0e0', borderRadius: 4 }}>
                <div style={barStyle((count / maxSeg) * 100, colors.primary)} />
              </div>
            </div>
          ))}
        </div>

        {/* Inadimplência */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Inadimplência</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.danger }}>{formatCurrency(totalInad)}</div>
          <div style={{ fontSize: 12, color: colors.textMuted }}>{atrasadas.length} parcelas em atraso</div>
        </div>
      </div>
    </div>
  );
};
