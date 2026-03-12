import { CSSProperties } from 'react';
import { Theme } from './ThemeContext';

const light = {
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
  hoverBg: '#eee',
  inputBg: '#fff',
  overlayBg: 'rgba(0,0,0,0.4)',
  modalBg: '#fff',
  rowBorder: '#f0f0f0',
  readonlyBg: '#f5f5f5',
};

const dark = {
  bg: '#1e1e1e',
  white: '#252526',
  primary: '#58a6ff',
  primaryLight: '#1f3a5f',
  text: '#d4d4d4',
  textSecondary: '#8b949e',
  textMuted: '#6e7681',
  border: '#30363d',
  cardBg: '#2d2d2d',
  danger: '#f85149',
  dangerBg: '#3d1a1a',
  warning: '#d29922',
  warningBg: '#3b2e12',
  success: '#3fb950',
  successBg: '#1a3d1a',
  gray: '#8b949e',
  grayBg: '#343434',
  hoverBg: '#2a2d2e',
  inputBg: '#1e1e1e',
  overlayBg: 'rgba(0,0,0,0.55)',
  modalBg: '#252526',
  rowBorder: '#30363d',
  readonlyBg: '#2d2d2d',
};

export type Colors = typeof light;

export function getColors(theme: Theme): Colors {
  return theme === 'dark' ? dark : light;
}

export const fonts = "'Google Sans', 'Segoe UI', Roboto, sans-serif";

export function getStyles(c: Colors) {
  return {
    page: { minHeight: '100vh', background: c.bg, fontFamily: fonts, color: c.text, display: 'flex' } as CSSProperties,
    sidebar: { width: 230, padding: '20px 14px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', height: '100vh', position: 'sticky', top: 0 } as CSSProperties,
    mainArea: { flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px 24px 8px', minHeight: '100vh', overflow: 'auto' } as CSSProperties,
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' } as CSSProperties,
    contentBox: { background: c.white, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)', padding: 24, flex: 1 } as CSSProperties,
    menuItem: (active: boolean): CSSProperties => ({
      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 24, cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400,
      background: active ? c.primaryLight : 'transparent', color: active ? c.primary : c.text, transition: 'background 0.15s',
    }),
    btn: (variant: 'primary' | 'secondary' | 'danger' = 'primary'): CSSProperties => ({
      background: variant === 'primary' ? c.primary : variant === 'danger' ? c.danger : c.white,
      color: variant === 'secondary' ? c.primary : '#fff',
      border: variant === 'secondary' ? `1px solid ${c.border}` : 'none',
      borderRadius: 20, padding: '8px 18px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
    }),
    input: { border: `1px solid ${c.border}`, borderRadius: 8, padding: '9px 12px', fontSize: 14, fontFamily: fonts, width: '100%', boxSizing: 'border-box', outline: 'none', background: c.inputBg, color: c.text } as CSSProperties,
    select: { border: `1px solid ${c.border}`, borderRadius: 8, padding: '9px 12px', fontSize: 14, fontFamily: fonts, width: '100%', boxSizing: 'border-box', outline: 'none', background: c.inputBg, color: c.text } as CSSProperties,
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 } as CSSProperties,
    th: { textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${c.border}`, color: c.textSecondary, fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 } as CSSProperties,
    td: { padding: '10px 12px', borderBottom: `1px solid ${c.rowBorder}` } as CSSProperties,
    badge: (color: string, bg: string): CSSProperties => ({
      display: 'inline-block', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color, background: bg,
    }),
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: c.overlayBg, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 } as CSSProperties,
    modal: { background: c.modalBg, borderRadius: 16, padding: 28, width: '90%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', color: c.text } as CSSProperties,
    kpiCard: (borderColor: string): CSSProperties => ({
      background: c.cardBg, borderRadius: 12, padding: '18px 20px', borderTop: `3px solid ${borderColor}`,
    }),
    label: { fontSize: 13, fontWeight: 500, color: c.textSecondary, marginBottom: 4, display: 'block' } as CSSProperties,
    fieldGroup: { marginBottom: 14 } as CSSProperties,
  };
}

// Keep backward-compat exports for helper functions that don't need theme
export const colors = light; // default fallback

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

export function statusBadge(status: string, c: Colors = light) {
  const map: Record<string, [string, string]> = {
    'Ativa': [c.success, c.successBg],
    'Vencida': [c.warning, c.warningBg],
    'Cancelada': [c.gray, c.grayBg],
    'Pago': [c.success, c.successBg],
    'Pendente': [c.primary, c.primaryLight],
    'Atrasado': [c.danger, c.dangerBg],
    'Aberto': [c.danger, c.dangerBg],
    'Em Análise': [c.warning, c.warningBg],
    'Encerrado': [c.success, c.successBg],
    'Negado': [c.gray, c.grayBg],
  };
  const [color, background] = map[status] || [c.text, c.grayBg];
  return { color, background };
}

export function urgencyBadge(dias: number, c: Colors = light): [string, string] {
  if (dias <= 7) return [c.danger, c.dangerBg];
  if (dias <= 15) return [c.warning, c.warningBg];
  return ['#f57f17', '#fff9c4'];
}

// Legacy compat - s object for components that haven't migrated
export const s = getStyles(light);
