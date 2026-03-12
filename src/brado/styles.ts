import { CSSProperties } from 'react';

export const colors = {
  bg: '#f0f2f5',
  white: '#ffffff',
  primary: '#1a73e8',
  primaryLight: '#d3e3fd',
  text: '#202124',
  textSecondary: '#5f6368',
  textMuted: '#9aa0a6',
  border: '#dadce0',
  cardBg: '#f8f9fa',
  danger: '#c62828',
  dangerBg: '#fde8e8',
  warning: '#e65100',
  warningBg: '#fff3e0',
  success: '#2e7d32',
  successBg: '#e8f5e9',
  gray: '#80868b',
  grayBg: '#e8eaed',
};

export const fonts = "'Google Sans', 'Segoe UI', Roboto, sans-serif";

export const s = {
  page: { minHeight: '100vh', background: colors.bg, fontFamily: fonts, color: colors.text, display: 'flex' } as CSSProperties,
  sidebar: { width: 230, padding: '20px 14px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', height: '100vh', position: 'sticky', top: 0 } as CSSProperties,
  mainArea: { flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px 24px 8px', minHeight: '100vh', overflow: 'auto' } as CSSProperties,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' } as CSSProperties,
  contentBox: { background: colors.white, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)', padding: 24, flex: 1 } as CSSProperties,
  menuItem: (active: boolean): CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 24, cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400,
    background: active ? colors.primaryLight : 'transparent', color: active ? colors.primary : colors.text, transition: 'background 0.15s',
  }),
  btn: (variant: 'primary' | 'secondary' | 'danger' = 'primary'): CSSProperties => ({
    background: variant === 'primary' ? colors.primary : variant === 'danger' ? colors.danger : colors.white,
    color: variant === 'secondary' ? colors.primary : '#fff',
    border: variant === 'secondary' ? `1px solid ${colors.border}` : 'none',
    borderRadius: 20, padding: '8px 18px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
  }),
  input: { border: `1px solid ${colors.border}`, borderRadius: 8, padding: '9px 12px', fontSize: 14, fontFamily: fonts, width: '100%', boxSizing: 'border-box', outline: 'none' } as CSSProperties,
  select: { border: `1px solid ${colors.border}`, borderRadius: 8, padding: '9px 12px', fontSize: 14, fontFamily: fonts, width: '100%', boxSizing: 'border-box', outline: 'none', background: '#fff' } as CSSProperties,
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 } as CSSProperties,
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${colors.border}`, color: colors.textSecondary, fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 } as CSSProperties,
  td: { padding: '10px 12px', borderBottom: `1px solid #f0f0f0` } as CSSProperties,
  badge: (color: string, bg: string): CSSProperties => ({
    display: 'inline-block', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color, background: bg,
  }),
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 } as CSSProperties,
  modal: { background: '#fff', borderRadius: 16, padding: 28, width: '90%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' } as CSSProperties,
  kpiCard: (borderColor: string): CSSProperties => ({
    background: colors.cardBg, borderRadius: 12, padding: '18px 20px', borderTop: `3px solid ${borderColor}`,
  }),
  label: { fontSize: 13, fontWeight: 500, color: colors.textSecondary, marginBottom: 4, display: 'block' } as CSSProperties,
  fieldGroup: { marginBottom: 14 } as CSSProperties,
};

export function formatCurrency(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDate(d: string): string {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export function diffDays(dateStr: string): number {
  const hoje = new Date('2026-03-12');
  const d = new Date(dateStr);
  return Math.ceil((d.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

export function statusBadge(status: string) {
  const map: Record<string, [string, string]> = {
    'Ativa': [colors.success, colors.successBg],
    'Vencida': [colors.warning, colors.warningBg],
    'Cancelada': [colors.gray, colors.grayBg],
    'Pago': [colors.success, colors.successBg],
    'Pendente': ['#1565c0', '#e3f2fd'],
    'Atrasado': [colors.danger, colors.dangerBg],
    'Aberto': [colors.danger, colors.dangerBg],
    'Em Análise': [colors.warning, colors.warningBg],
    'Encerrado': [colors.success, colors.successBg],
    'Negado': [colors.gray, colors.grayBg],
  };
  const [c, b] = map[status] || [colors.text, colors.grayBg];
  return { color: c, background: b };
}

export function urgencyBadge(dias: number): [string, string] {
  if (dias <= 7) return [colors.danger, colors.dangerBg];
  if (dias <= 15) return [colors.warning, colors.warningBg];
  return ['#f57f17', '#fff9c4'];
}
