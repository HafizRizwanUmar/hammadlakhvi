import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Video, Settings, LogOut, User, Menu, X, Mail } from 'lucide-react';
import { COLORS } from '../constants';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: COLORS.cream }}>Loading...</div>;
  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Articles', path: '/admin/articles', icon: BookOpen },
    { label: 'Videos & Clips', path: '/admin/videos', icon: Video },
    { label: 'Inquiries', path: '/admin/inquiries', icon: Mail },
    { label: 'Settings & Bio', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: COLORS.darkGreen,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        transition: 'transform 0.3s ease',
        transform: isMobileMenuOpen ? 'translateX(0)' : (window.innerWidth < 1024 ? 'translateX(-100%)' : 'translateX(0)')
      }}>
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ color: COLORS.gold, fontSize: '20px', fontWeight: '700', letterSpacing: '1px' }}>ADMIN PANEL</h2>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: isActive ? COLORS.darkGreen : 'rgba(255,255,255,0.7)',
                  background: isActive ? COLORS.gold : 'transparent',
                  textDecoration: 'none',
                  marginBottom: '8px',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: COLORS.gold, color: COLORS.darkGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>{user.username}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Administrator</div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              color: '#ff6b6b',
              border: '1px solid rgba(255,107,107,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: window.innerWidth < 1024 ? 0 : '280px',
        padding: '40px',
        transition: 'all 0.3s'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          minHeight: 'calc(100vh - 80px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          padding: '32px'
        }}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '28px',
          background: COLORS.darkGreen,
          color: '#fff',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: window.innerWidth < 1024 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
};

export default AdminLayout;
