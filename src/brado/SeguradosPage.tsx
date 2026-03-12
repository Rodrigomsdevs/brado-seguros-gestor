import React, { useState } from 'react';
import { getStyles, getColors, formatDate } from './styles';
import { useTheme } from './ThemeContext';
import { Segurado } from './types';

interface Props {
  segurados: Segurado[];
  setSegurados: React.Dispatch<React.SetStateAction<Segurado[]>>;
  onNovaApolice: (seguradoId: number) => void;
  onNovoEndosso: (seguradoId: number) => void;
  apoliceCount: (id: number) => number;
}

export const SeguradosPage: React.FC<Props> = ({ segurados, setSegurados, onNovaApolice, onNovoEndosso, apoliceCount }) => {
  const { theme } = useTheme();
  const c = getColors(theme);
  const s = getStyles(c);
  const [busca, setBusca] = useState('');

  const filtered = segurados.filter(seg =>
    seg.nome.toLowerCase().includes(busca.toLowerCase()) || seg.cpfCnpj.includes(busca)
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input style={{ ...s.input, maxWidth: 320 }} placeholder="Buscar por nome ou documento..." value={busca} onChange={e => setBusca(e.target.value)}
          onFocus={e => (e.target.style.borderColor = c.primary)} onBlur={e => (e.target.style.borderColor = c.border)} />
      </div>
      <table style={s.table}>
        <thead><tr>
          {['Nome', 'CPF/CNPJ', 'Telefone', 'E-mail', 'Nº Apólices', 'Cadastrado em', 'Ações'].map(h => <th key={h} style={s.th}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(seg => (
            <tr key={seg.id}>
              <td style={{ ...s.td, fontWeight: 500 }}>{seg.nome}</td>
              <td style={s.td}>{seg.cpfCnpj}</td>
              <td style={s.td}>{seg.telefone}</td>
              <td style={s.td}>{seg.email}</td>
              <td style={s.td}>{apoliceCount(seg.id)}</td>
              <td style={s.td}>{formatDate(seg.criadoEm)}</td>
              <td style={s.td}>
                <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12, marginRight: 6 }} onClick={() => onNovaApolice(seg.id)}>Nova Apólice</button>
                <button style={{ ...s.btn('secondary'), padding: '4px 10px', fontSize: 12 }} onClick={() => onNovoEndosso(seg.id)}>Novo Endosso</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
