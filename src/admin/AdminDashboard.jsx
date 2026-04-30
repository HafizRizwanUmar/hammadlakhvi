import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BookOpen, Video, ShieldCheck, ArrowRight,
  FileText, PlayCircle, Settings, Layout, Plus
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ articles: 0, videos: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [arts, vids] = await Promise.all([
          axios.get(`${API_BASE}/articles`),
          axios.get(`${API_BASE}/videos`)
        ]);
        setStats({
          articles: arts.data.length,
          videos: vids.data.length
        });
      } catch (err) {
        console.error('Error fetching dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const metrics = [
    { label: 'Published Articles', count: stats.articles, icon: BookOpen, color: '#0ea5e9' },
    { label: 'Video Resources', count: stats.videos, icon: Video, color: '#8b5cf6' },
    { label: 'System Status', count: 'Online', icon: ShieldCheck, color: '#10b981' },
  ];

  const quickActions = [
    { title: 'Publish Article', desc: 'Create research papers', icon: FileText, path: '/admin/articles', color: '#0ea5e9' },
    { title: 'Add Videos', desc: 'Sync YouTube lectures', icon: PlayCircle, path: '/admin/videos', color: '#8b5cf6' },
  ];

  return (
    <div style={{ animation: 'fadeUp 0.6s ease-out' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--admin-text-main)', marginBottom: '8px' }}>
          Welcome back, Administrator
        </h2>
        <p style={{ color: 'var(--admin-text-light)', fontSize: '16px' }}>
          Here's what's happening on your platform today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginBottom: '48px' 
      }}>
        {metrics.map((card, idx) => (
          <div key={idx} className="card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '18px', 
              background: `${card.color}10`, color: card.color, 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <card.icon size={32} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--admin-text-light)', fontWeight: '700', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--admin-text-main)' }}>
                {loading ? '...' : card.count}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        {/* Quick Actions */}
        <section>
           <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--admin-text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <Layout size={20} color="var(--admin-accent)" /> Quick Actions
           </h3>
           <div style={{ display: 'grid', gap: '20px' }}>
              {quickActions.map((action, i) => (
                <div 
                  key={i} 
                  className="card"
                  onClick={() => navigate(action.path)}
                  style={{ 
                    padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: action.color }}><action.icon size={28} /></div>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--admin-text-main)' }}>{action.title}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--admin-text-light)' }}>{action.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--admin-border)" />
                </div>
              ))}
           </div>
        </section>

        {/* Info / Tips */}
        <section className="card" style={{ padding: '32px' }}>
           <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--admin-text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <Settings size={20} color="var(--admin-text-light)" /> Growth Tips
           </h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { id: '01', title: 'Article Optimization', text: 'Use clear links slugs like "role-of-deen" for better SEO sharing.' },
                { id: '02', title: 'Video Categorization', text: 'Always group series together to make it easier for students to follow.' },
                { id: '03', title: 'Engagement', text: 'Check inquiries daily to stay connected with your community.' }
              ].map((tip) => (
                <div key={tip.id} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '10px', 
                    background: 'var(--admin-bg)', color: 'var(--admin-accent)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '12px', fontWeight: '800', flexShrink: 0 
                  }}>{tip.id}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--admin-text-main)', marginBottom: '4px' }}>{tip.title}</div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-text-light)', lineHeight: '1.5' }}>{tip.text}</p>
                  </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => navigate('/admin/articles')}
        style={{
          position: 'fixed', bottom: '32px', right: '32px',
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'var(--admin-accent)', color: '#fff',
          border: 'none', boxShadow: '0 12px 24px rgba(184, 151, 42, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 100
        }}
        className="mobile-toggle"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

export default AdminDashboard;
