import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { COLORS } from '../constants';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials or server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${COLORS.darkGreen} 0%, ${COLORS.charcoal} 100%)`,
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        animation: 'fadeUp 0.6s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: COLORS.gold, fontSize: '28px', marginBottom: '8px' }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Welcome back, please login to continue.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <UserIcon style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold, width: '18px' }} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold, width: '18px' }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {error && <div style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              background: COLORS.gold,
              color: COLORS.darkGreen,
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
