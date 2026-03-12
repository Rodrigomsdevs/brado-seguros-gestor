import React, { useState } from 'react';
import { getStyles, getColors, fonts } from './styles';
import { useTheme } from './ThemeContext';
import { Usuario } from './types';
import { Moon, Sun } from 'lucide-react';

interface LoginProps {
  onLogin: (u: Usuario) => void;
  usuarios: Usuario[];
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin, usuarios }) => {
  const { theme, toggle } = useTheme();
  const c = getColors(theme);
  const s = getStyles(c);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    const u = usuarios.find(u => u.email === email && u.senha === senha);
    if (u) { onLogin(u); }
    else { setErro('E-mail ou senha inválidos'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts, position: 'relative' }}>
      {/* Theme toggle */}
      <button onClick={toggle} style={{ position: 'absolute', top: 20, right: 20, background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: c.text, display: 'flex', alignItems: 'center', gap: 6 }}>
        {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Escuro' : 'Claro'}
      </button>
      <div style={{ background: c.modalBg, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)', padding: '40px 36px', width: 400, textAlign: 'center', color: c.text }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: c.primary, marginBottom: 2 }}>BRADO</div>
        <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 28 }}>Corretora de Seguros</div>
        <div style={{ marginBottom: 14 }}>
          <input style={{ ...s.input, textAlign: 'left' }} placeholder="E-mail" value={email}
            onChange={e => { setEmail(e.target.value); setErro(''); }}
            onFocus={e => (e.target.style.borderColor = c.primary)} onBlur={e => (e.target.style.borderColor = c.border)} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <input style={{ ...s.input, textAlign: 'left' }} type="password" placeholder="Senha" value={senha}
            onChange={e => { setSenha(e.target.value); setErro(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => (e.target.style.borderColor = c.primary)} onBlur={e => (e.target.style.borderColor = c.border)} />
        </div>
        {erro && <div style={{ color: c.danger, fontSize: 13, marginBottom: 10 }}>{erro}</div>}
        <button style={{ ...s.btn('primary'), width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: 15 }} onClick={handleLogin}>Entrar</button>
        <div style={{ marginTop: 24, fontSize: 12, color: c.textMuted, textAlign: 'left' }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Usuários de demonstração:</div>
          {usuarios.map(u => (
            <div key={u.id} style={{ marginBottom: 4, cursor: 'pointer', color: c.primary, textDecoration: 'underline' }}
              onClick={() => { setEmail(u.email); setSenha(u.senha); }}>
              {u.email} / {u.senha} — {u.perfil}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
