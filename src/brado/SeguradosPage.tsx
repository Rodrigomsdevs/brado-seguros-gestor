import React, { useState } from 'react';
import { s, colors, formatDate } from './styles';
import { Segurado } from './types';

interface Props {
  segurados: Segurado[];
  setSegurados: React.Dispatch<React.SetStateAction<Segurado[]>>;
  onNovaApolice: (seguradoId: number) => void;
  onNovoEndosso: (seguradoId: number) => void;
  apoliceCount: (id: number) => number;
}

const emptyEndereco = { logradouro: '', numero: '', bairro: '', cidade: '', uf: '', cep: '' };

export const SeguradosPage: React.FC<Props> = ({ segurados, setSegurados, onNovaApolice, onNovoEndosso, apoliceCount }) => {
  const [busca, setBusca] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ nome: '', cpfCnpj: '', email: '', telefone: '', endereco: { ...emptyEndereco } });

  const filtered = segurados.filter(seg =>
    seg.nome.toLowerCase().includes(busca.toLowerCase()) || seg.cpfCnpj.includes(busca)
  );

  const salvar = () => {
    if (!form.nome || !form.cpfCnpj) return;
    const novo: Segurado = { ...form, id: Date.now(), criadoEm: '2026-03-12' };
    setSegurados(prev => [...prev, novo]);
    setModal(false);
    setForm({ nome: '', cpfCnpj: '', email: '', telefone: '', endereco: { ...emptyEndereco } });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input style={{ ...s.input, maxWidth: 320 }} placeholder="Buscar por nome ou documento..." value={busca} onChange={e => setBusca(e.target.value)}
          onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} />
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

      {modal && (
        <div style={s.overlay} onClick={() => setModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Novo Segurado</h3>
            <div style={s.fieldGroup}><label style={s.label}>Nome completo *</label><input style={s.input} value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
            <div style={s.fieldGroup}><label style={s.label}>CPF/CNPJ *</label><input style={s.input} value={form.cpfCnpj} onChange={e => setForm({ ...form, cpfCnpj: e.target.value })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>E-mail</label><input style={s.input} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Telefone</label><input style={s.input} value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, margin: '8px 0 10px', color: colors.textSecondary }}>Endereço</div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Logradouro</label><input style={s.input} value={form.endereco.logradouro} onChange={e => setForm({ ...form, endereco: { ...form.endereco, logradouro: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Número</label><input style={s.input} value={form.endereco.numero} onChange={e => setForm({ ...form, endereco: { ...form.endereco, numero: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <div style={s.fieldGroup}><label style={s.label}>Bairro</label><input style={s.input} value={form.endereco.bairro} onChange={e => setForm({ ...form, endereco: { ...form.endereco, bairro: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
              <div style={s.fieldGroup}><label style={s.label}>Cidade</label><input style={s.input} value={form.endereco.cidade} onChange={e => setForm({ ...form, endereco: { ...form.endereco, cidade: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
              <div style={s.fieldGroup}><label style={s.label}>UF</label><input style={s.input} value={form.endereco.uf} onChange={e => setForm({ ...form, endereco: { ...form.endereco, uf: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
              <div style={s.fieldGroup}><label style={s.label}>CEP</label><input style={s.input} value={form.endereco.cep} onChange={e => setForm({ ...form, endereco: { ...form.endereco, cep: e.target.value } })} onFocus={e => (e.target.style.borderColor = colors.primary)} onBlur={e => (e.target.style.borderColor = colors.border)} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
              <button style={s.btn('secondary')} onClick={() => setModal(false)}>Cancelar</button>
              <button style={s.btn('primary')} onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Expose setModal
export const SeguradosPageWrapper = React.forwardRef<{ openModal: () => void }, Props>((props, ref) => {
  const [modal, setModal] = useState(false);
  React.useImperativeHandle(ref, () => ({ openModal: () => setModal(true) }));
  return <SeguradosPage {...props} />;
});
