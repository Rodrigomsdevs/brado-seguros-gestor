import React, { useState } from 'react';
import { s, colors, fonts } from './styles';
import { Usuario } from './types';

interface LoginProps {
  onLogin: (u: Usuario) => void;
  usuarios: Usuario[];
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin, usuarios }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    const u = usuarios.find(u => u.email === email && u.senha === senha);
    if (u) { onLogin(u); }
    else { setErro('E-mail ou senha inválidos'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)', padding: '40px 36px', width: 400, textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary, marginBottom: 2 }}>BRADO</div>
        <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 28 }}>Corretora de Seguros</div>
        <div style={{ marginBottom: 14 }}>
          <input
            style={{ ...s.input, textAlign: 'left' }}
            placeholder="E-mail"
            value={email}
            onChange={e => { setEmail(e.target.value); setErro(''); }}
            onFocus={e => (e.target.style.borderColor = colors.primary)}
            onBlur={e => (e.target.style.borderColor = colors.border)}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <input
            style={{ ...s.input, textAlign: 'left' }}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => (e.target.style.borderColor = colors.primary)}
            onBlur={e => (e.target.style.borderColor = colors.border)}
          />
        </div>
        {erro && <div style={{ color: colors.danger, fontSize: 13, marginBottom: 10 }}>{erro}</div>}
        <button style={{ ...s.btn('primary'), width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: 15 }} onClick={handleLogin}>Entrar</button>
        <div style={{ marginTop: 24, fontSize: 12, color: colors.textMuted, textAlign: 'left' }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Usuários de demonstração:</div>
          {usuarios.map(u => (
            <div key={u.id} style={{ marginBottom: 4, cursor: 'pointer', color: colors.primary, textDecoration: 'underline' }}
              onClick={() => { setEmail(u.email); setSenha(u.senha); }}>
              {u.email} / {u.senha} — {u.perfil}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
