import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Video, Settings, LogOut, 
  Menu, X, Mail, UserCircle, ShieldCheck, ChevronRight
} from 'lucide-react';
import { COLORS } from '../constants';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--admin-bg)' }}>
      <div style={{ padding: '32px', borderRadius: 'var(--radius-lg)', background: '#fff', boxShadow: 'var(--shadow-lg)', fontWeight: '700', color: 'var(--admin-accent)' }}>
        Loading Studio...
      </div>
    </div>
  );
  
  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Biography', path: '/admin/biography', icon: UserCircle },
    { label: 'Articles', path: '/admin/articles', icon: BookOpen },
    { label: 'Videos & Clips', path: '/admin/videos', icon: Video },
    { label: 'Inquiries', path: '/admin/inquiries', icon: Mail },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg)' }}>
      {/* Sidebar Overlay for Mobile */}
      <div 
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(15, 23, 42, 0.4)', 
          backdropFilter: 'blur(4px)',
          zIndex: 90, 
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }} 
      />

      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: 'var(--admin-sidebar)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        // Responsive sidebar visibility
        '--sidebar-transform': isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
      }} className="sidebar-container">
        <style>{`
          @media (min-width: 1025px) {
            .sidebar-container { transform: translateX(0) !important; }
            .main-content { margin-left: 280px !important; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>

        <div style={{ padding: '40px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '40px', height: '40px', background: 'var(--admin-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(184, 151, 42, 0.3)' }}>
                <ShieldCheck color="#fff" size={24} />
             </div>
             <div>
                <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '800', letterSpacing: '0.05em', margin: 0 }}>STUDIO</h2>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: '0.1em' }}>CONTROL PANEL</div>
             </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  color: isActive ? '#fff' : '#94a3b8',
                  background: isActive ? 'var(--admin-sidebar-active)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '700' : '500',
                  border: isActive ? '1px solid rgba(184, 151, 42, 0.2)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={20} style={{ color: isActive ? 'var(--admin-accent)' : 'inherit' }} />
                  {item.label}
                </div>
                {isActive && <ChevronRight size={14} color="var(--admin-accent)" />}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <UserCircle size={44} color="var(--admin-accent)" />
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', background: 'var(--admin-success)', borderRadius: '50%', border: '2px solid var(--admin-sidebar)' }}></div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.username}</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Administrator</div>
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
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '13px',
              transition: 'all 0.3s'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="main-content">
        {/* Top Header Bar */}
        <header style={{ 
          height: '72px', 
          background: '#fff', 
          borderBottom: '1px solid var(--admin-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 80
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
            >
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--admin-text-main)' }}>
              {navItems.find(item => location.pathname === item.path)?.label || 'Studio Dashboard'}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="desktop-only" style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--admin-border)' }} className="desktop-only"></div>
            <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-light)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
               <span className="desktop-only">Visit Website</span>
               <div style={{ padding: '6px', background: '#f1f5f9', borderRadius: '8px' }}><ExternalLink size={16} /></div>
            </a>
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px' }}>
           <Outlet />
        </main>
      </div>
    </div>
  );
};

const ExternalLink = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default AdminLayout;
