import React, { useState } from 'react';
import { getStyles, getColors, fonts } from './styles';
import { useTheme } from './ThemeContext';
import { Usuario } from './types';
import { Moon, Sun, Mail, Lock, LogIn, Shield, User, ChevronRight } from 'lucide-react';

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
  const [focusField, setFocusField] = useState<string | null>(null);

  const handleLogin = () => {
    const u = usuarios.find(u => u.email === email && u.senha === senha);
    if (u) { onLogin(u); }
    else { setErro('E-mail ou senha inválidos'); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: theme === 'light'
        ? 'linear-gradient(135deg, #e8eef6 0%, #dfe6f0 40%, #eef1f8 100%)'
        : 'linear-gradient(135deg, #161618 0%, #1a1c2e 40%, #1e1e1e 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts, position: 'relative',
    }}>
      {/* Theme toggle */}
      <button onClick={toggle} style={{
        position: 'absolute', top: 24, right: 24, background: c.cardBg,
        border: `1px solid ${c.border}`, borderRadius: 24, padding: '8px 16px',
        cursor: 'pointer', fontSize: 13, color: c.textSecondary, display: 'flex',
        alignItems: 'center', gap: 8, transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        {theme === 'light' ? 'Escuro' : 'Claro'}
      </button>

      {/* Decorative background icon */}
      <div style={{ position: 'absolute', opacity: 0.03, pointerEvents: 'none' }}>
        <Shield size={500} strokeWidth={0.5} color={c.primary} />
      </div>

      <div style={{
        background: c.modalBg, borderRadius: 24,
        boxShadow: theme === 'light'
          ? '0 4px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)'
          : '0 4px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        padding: '48px 40px 40px', width: 420, textAlign: 'center', color: c.text,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${c.primary}, ${theme === 'light' ? '#4fc3f7' : '#82b1ff'})`,
        }} />

        {/* Logo area */}
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px',
          background: `linear-gradient(135deg, ${c.primary}, ${theme === 'light' ? '#1565c0' : '#82b1ff'})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${c.primary}33`,
        }}>
          <Shield size={32} color="#fff" strokeWidth={2} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, color: c.text, marginBottom: 2, letterSpacing: 2 }}>BRADO</div>
        <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 32, letterSpacing: 0.5 }}>Corretora de Seguros</div>

        {/* Email field */}
        <div style={{ marginBottom: 16, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: focusField === 'email' ? c.primary : c.textMuted, transition: 'color 0.2s',
          }}>
            <Mail size={18} />
          </div>
          <input
            style={{
              ...s.input, textAlign: 'left', paddingLeft: 42, borderRadius: 12, padding: '12px 14px 12px 42px',
              fontSize: 14, transition: 'all 0.2s',
              borderColor: focusField === 'email' ? c.primary : c.border,
              boxShadow: focusField === 'email' ? `0 0 0 3px ${c.primary}18` : 'none',
            }}
            placeholder="E-mail"
            value={email}
            onChange={e => { setEmail(e.target.value); setErro(''); }}
            onFocus={() => setFocusField('email')}
            onBlur={() => setFocusField(null)}
          />
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 20, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: focusField === 'senha' ? c.primary : c.textMuted, transition: 'color 0.2s',
          }}>
            <Lock size={18} />
          </div>
          <input
            style={{
              ...s.input, textAlign: 'left', paddingLeft: 42, borderRadius: 12, padding: '12px 14px 12px 42px',
              fontSize: 14, transition: 'all 0.2s',
              borderColor: focusField === 'senha' ? c.primary : c.border,
              boxShadow: focusField === 'senha' ? `0 0 0 3px ${c.primary}18` : 'none',
            }}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={() => setFocusField('senha')}
            onBlur={() => setFocusField(null)}
          />
        </div>

        {erro && (
          <div style={{
            color: c.danger, fontSize: 13, marginBottom: 14,
            background: c.dangerBg, padding: '8px 14px', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 16 }}>⚠</span> {erro}
          </div>
        )}

        <button
          style={{
            ...s.btn('primary'), width: '100%', justifyContent: 'center',
            padding: '12px 18px', fontSize: 15, borderRadius: 12,
            background: `linear-gradient(135deg, ${c.primary}, ${theme === 'light' ? '#1565c0' : '#82b1ff'})`,
            boxShadow: `0 4px 16px ${c.primary}40`,
            transition: 'all 0.2s', fontWeight: 600,
          }}
          onClick={handleLogin}
        >
          <LogIn size={18} /> Entrar
        </button>

        {/* Demo users */}
        <div style={{
          marginTop: 28, paddingTop: 20,
          borderTop: `1px solid ${c.border}`,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            Acesso rápido — Demonstração
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {usuarios.map(u => (
              <button
                key={u.id}
                style={{
                  background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12,
                  padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'all 0.15s', textAlign: 'left', width: '100%', color: c.text,
                }}
                onClick={() => { setEmail(u.email); setSenha(u.senha); }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.primary;
                  (e.currentTarget as HTMLButtonElement).style.background = c.primaryLight;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
                  (e.currentTarget as HTMLButtonElement).style.background = c.cardBg;
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `linear-gradient(135deg, ${c.primary}22, ${c.primary}11)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.primary, flexShrink: 0,
                }}>
                  <User size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{u.nome}</div>
                  <div style={{ fontSize: 11, color: c.textMuted }}>{u.perfil} — {u.email}</div>
                </div>
                <ChevronRight size={16} color={c.textMuted} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
