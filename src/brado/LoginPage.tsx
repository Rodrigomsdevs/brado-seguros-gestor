import React, { useState } from 'react';
import { getStyles, getColors, fonts } from './styles';
import { useTheme } from './ThemeContext';
import { Usuario } from './types';
import { Moon, Sun, Mail, Lock, LogIn, Shield, User, ChevronRight } from 'lucide-react';
import loginBg from '../assets/login-insurance.jpg';

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
      minHeight: '100vh', display: 'flex', fontFamily: fonts, position: 'relative',
      background: c.bg,
    }}>
      {/* Theme toggle */}
      <button onClick={toggle} style={{
        position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24,
        padding: '6px 14px', cursor: 'pointer', fontSize: 12, color: '#fff',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        {theme === 'light' ? 'Escuro' : 'Claro'}
      </button>

      {/* Left — image area with strong right border */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: theme === 'light'
          ? 'linear-gradient(135deg, #dce8f5 0%, #c5d9f0 50%, #b8cfe8 100%)'
          : 'linear-gradient(135deg, #141c28 0%, #1a2636 50%, #0f1820 100%)',
        borderRight: `5px solid ${c.primary}`,
      }}>
        <img
          src={loginBg}
          alt="Proteção e segurança"
          style={{
            maxWidth: '65%', maxHeight: '65%', objectFit: 'contain',
            opacity: theme === 'light' ? 0.85 : 0.6,
          }}
        />
        {/* Bottom text on image */}
        <div style={{
          position: 'absolute', bottom: 44, left: 40, right: 40, textAlign: 'center',
        }}>
          <div style={{
            fontSize: 24, fontWeight: 700,
            color: theme === 'light' ? '#1a3a5c' : '#c0d8f0',
            marginBottom: 6,
          }}>
            Proteção completa para o que importa
          </div>
          <div style={{
            fontSize: 14, color: theme === 'light' ? '#5a7a9a' : '#7a9aba',
          }}>
            Auto · Vida · Empresarial · Residencial
          </div>
        </div>
      </div>

      {/* Right — floating form */}
      <div style={{
        width: 440, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px',
        background: theme === 'light'
          ? 'linear-gradient(180deg, #f4f6f9 0%, #eaecf0 100%)'
          : 'linear-gradient(180deg, #1e1e1e 0%, #181818 100%)',
      }}>
        <div style={{
          width: '100%', maxWidth: 360, background: c.modalBg, borderRadius: 20,
          padding: '40px 32px 32px',
          boxShadow: theme === 'light'
            ? '0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)'
            : '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* Logo */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${c.primary}, ${theme === 'light' ? '#1565c0' : '#82b1ff'})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 20px ${c.primary}33`,
          }}>
            <Shield size={26} color="#fff" strokeWidth={2} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: c.text, textAlign: 'center', letterSpacing: 2, marginBottom: 1 }}>BRADO</div>
          <div style={{ fontSize: 11, color: c.textMuted, textAlign: 'center', marginBottom: 30, letterSpacing: 0.5 }}>Corretora de Seguros</div>

          {/* Email */}
          <div style={{ marginBottom: 12, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: focusField === 'email' ? c.primary : c.textMuted, transition: 'color 0.2s',
            }}>
              <Mail size={17} />
            </div>
            <input
              style={{
                ...s.input, textAlign: 'left', paddingLeft: 40, borderRadius: 10,
                padding: '11px 12px 11px 40px', fontSize: 14, transition: 'all 0.2s',
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

          {/* Password */}
          <div style={{ marginBottom: 16, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: focusField === 'senha' ? c.primary : c.textMuted, transition: 'color 0.2s',
            }}>
              <Lock size={17} />
            </div>
            <input
              style={{
                ...s.input, textAlign: 'left', paddingLeft: 40, borderRadius: 10,
                padding: '11px 12px 11px 40px', fontSize: 14, transition: 'all 0.2s',
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
              color: c.danger, fontSize: 13, marginBottom: 12,
              background: c.dangerBg, padding: '8px 12px', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 15 }}>⚠</span> {erro}
            </div>
          )}

          <button
            style={{
              ...s.btn('primary'), width: '100%', justifyContent: 'center',
              padding: '11px 18px', fontSize: 15, borderRadius: 10,
              background: `linear-gradient(135deg, ${c.primary}, ${theme === 'light' ? '#1565c0' : '#82b1ff'})`,
              boxShadow: `0 4px 16px ${c.primary}40`, fontWeight: 600,
            }}
            onClick={handleLogin}
          >
            <LogIn size={18} /> Entrar
          </button>

          {/* Demo users */}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: c.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Acesso rápido
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {usuarios.map(u => (
                <button
                  key={u.id}
                  style={{
                    background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 10,
                    padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
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
                    width: 30, height: 30, borderRadius: 8,
                    background: `linear-gradient(135deg, ${c.primary}22, ${c.primary}11)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.primary, flexShrink: 0,
                  }}>
                    <User size={15} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{u.nome}</div>
                    <div style={{ fontSize: 10, color: c.textMuted }}>{u.perfil}</div>
                  </div>
                  <ChevronRight size={14} color={c.textMuted} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
