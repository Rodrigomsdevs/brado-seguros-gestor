import React from 'react';
import { s, colors, formatCurrency, formatDate, diffDays, statusBadge, urgencyBadge } from './styles';
import { Segurado, Apolice, Sinistro, Parcela } from './types';

interface DashboardProps {
  segurados: Segurado[];
  apolices: Apolice[];
  sinistros: Sinistro[];
  parcelas: Parcela[];
}

export const DashboardPage: React.FC<DashboardProps> = ({ segurados, apolices, sinistros, parcelas }) => {
  const ativas = apolices.filter(a => a.status === 'Ativa');
  const abertos = sinistros.filter(si => si.status === 'Aberto' || si.status === 'Em Análise');
  const vencendo = ativas.filter(a => { const d = diffDays(a.vigFim); return d >= 0 && d <= 30; });
  const pagas = parcelas.filter(p => p.status === 'Pago');
  const atrasadas = parcelas.filter(p => p.status === 'Atrasado');
  const faturadoMes = pagas.reduce((s, p) => s + p.valor, 0);
  const inadimplencia = atrasadas.reduce((s, p) => s + p.valor, 0);

  // simple bar chart data: last 6 months
  const meses = ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'];
  const faturamentoMeses = meses.map((_, i) => {
    const base = [4200, 5800, 3900, 6100, 7200, faturadoMes];
    return base[i] || 0;
  });
  const maxFat = Math.max(...faturamentoMeses, 1);

  // apólices por ramo
  const ramos = ['Auto', 'Vida', 'Residencial', 'Empresarial'];
  const ramoCount = ramos.map(r => ativas.filter(a => a.ramo === r).length);
  const maxRamo = Math.max(...ramoCount, 1);
  const ramoColors = [colors.primary, '#e91e63', '#ff9800', '#4caf50'];

  const recentSinistros = [...sinistros].sort((a, b) => b.dataOcorrencia.localeCompare(a.dataOcorrencia)).slice(0, 5);
  const renovacoesUrg = vencendo.sort((a, b) => diffDays(a.vigFim) - diffDays(b.vigFim)).slice(0, 5);

  const getSeguradoNome = (id: number) => segurados.find(s => s.id === id)?.nome || '';

  const kpis = [
    { label: 'Total de Segurados', value: segurados.length, color: colors.primary },
    { label: 'Apólices Ativas', value: ativas.length, color: '#4caf50' },
    { label: 'Sinistros Abertos', value: abertos.length, color: colors.danger },
    { label: 'Vencendo em 30 dias', value: vencendo.length, color: '#ff9800' },
    { label: 'Faturado no Mês', value: formatCurrency(faturadoMes), color: '#2e7d32' },
    { label: 'Inadimplência', value: formatCurrency(inadimplencia), color: '#c62828' },
  ];

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <div key={i} style={s.kpiCard(k.color)}>
            <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Bar chart */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Faturamento — Últimos 6 Meses</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
            {meses.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 10, color: colors.textMuted, marginBottom: 4 }}>{formatCurrency(faturamentoMeses[i])}</div>
                <div style={{ width: '70%', height: `${(faturamentoMeses[i] / maxFat) * 100}px`, background: colors.primary, borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                <div style={{ fontSize: 11, color: colors.textSecondary, marginTop: 6 }}>{m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ramos */}
        <div style={{ background: colors.cardBg, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Apólices por Ramo</div>
          {ramos.map((r, i) => (
            <div key={r} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span>{r}</span><span style={{ fontWeight: 600 }}>{ramoCount[i]}</span>
              </div>
              <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${(ramoCount[i] / maxRamo) * 100}%`, background: ramoColors[i], borderRadius: 4, transition: 'width 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Sinistros recentes */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Sinistros Recentes</div>
          <table style={s.table}>
            <thead><tr>
              {['ID', 'Segurado', 'Ramo', 'Data', 'Valor', 'Status'].map(h => <th key={h} style={s.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {recentSinistros.map(si => {
                const ap = apolices.find(a => a.id === si.apoliceId);
                const sb = statusBadge(si.status);
                return (
                  <tr key={si.id}>
                    <td style={s.td}>#{si.id}</td>
                    <td style={s.td}>{getSeguradoNome(si.seguradoId)}</td>
                    <td style={s.td}>{ap?.ramo}</td>
                    <td style={s.td}>{formatDate(si.dataOcorrencia)}</td>
                    <td style={s.td}>{formatCurrency(si.valorEstimado)}</td>
                    <td style={s.td}><span style={s.badge(sb.color, sb.background)}>{si.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Renovações urgentes */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Renovações Urgentes</div>
          <table style={s.table}>
            <thead><tr>
              {['Apólice', 'Segurado', 'Ramo', 'Prêmio', 'Dias'].map(h => <th key={h} style={s.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {renovacoesUrg.map(a => {
                const dias = diffDays(a.vigFim);
                const [uc, ub] = urgencyBadge(dias);
                return (
                  <tr key={a.id}>
                    <td style={s.td}>{a.numero}</td>
                    <td style={s.td}>{getSeguradoNome(a.seguradoId)}</td>
                    <td style={s.td}>{a.ramo}</td>
                    <td style={s.td}>{formatCurrency(a.premio)}</td>
                    <td style={s.td}><span style={s.badge(uc, ub)}>{dias}d</span></td>
                  </tr>
                );
              })}
              {renovacoesUrg.length === 0 && <tr><td colSpan={5} style={{ ...s.td, textAlign: 'center', color: colors.textMuted }}>Nenhuma renovação urgente</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
