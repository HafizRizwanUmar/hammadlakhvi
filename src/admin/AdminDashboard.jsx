import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Video, Users, ArrowUpRight } from 'lucide-react';
import { COLORS } from '../constants';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ articles: 0, videos: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [arts, vids] = await Promise.all([
          axios.get('http://localhost:5000/api/articles'),
          axios.get('http://localhost:5000/api/videos')
        ]);
        setStats({
          articles: arts.data.length,
          videos: vids.data.length
        });
      } catch (err) {
        console.error('Error fetching dashboard stats');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Articles', count: stats.articles, icon: BookOpen, color: '#4CAF50' },
    { label: 'Videos & Clips', count: stats.videos, icon: Video, color: '#2196F3' },
    { label: 'Active Admins', count: 1, icon: Users, color: COLORS.gold },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', color: COLORS.darkGreen, fontWeight: '700' }}>Dashboard Overview</h1>
        <p style={{ color: COLORS.textLight }}>Quick summary of your website content and activity.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{
            padding: '24px',
            borderRadius: '20px',
            background: '#fff',
            border: '1px solid #eee',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${card.color}15`,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <card.icon size={24} />
              </div>
              <ArrowUpRight size={20} color="#ccc" />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: COLORS.textLight, fontWeight: '500' }}>{card.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: COLORS.darkGreen }}>{card.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${COLORS.darkGreen}, ${COLORS.green})`,
        borderRadius: '20px',
        padding: '32px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '12px' }}>Welcome to the management portal!</h2>
          <p style={{ opacity: 0.8, fontSize: '15px', lineHeight: '1.6' }}>
            From here, you can easily add new research articles, update video lectures, and manage the content displayed on your website. 
            All changes reflect immediately on the public site.
          </p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '16px 24px',
          borderRadius: '16px',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '4px' }}>System Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#4CAF50' }}></div>
            Operational
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
