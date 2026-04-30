import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2, CheckCircle, Clock, Eye, X, User, Calendar, MessageSquare } from 'lucide-react';
import { COLORS, API_BASE, IMG_BASE } from '../constants';

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(res.data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE}/inquiries/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInquiries();
      if (selectedInquiry?._id === id) setSelectedInquiry(prev => ({ ...prev, status }));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInquiries();
      setSelectedInquiry(null);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--admin-text-light)' }}>Loading inquiries...</div>;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800' }}>User Inquiries</h2>
        <p style={{ color: 'var(--admin-text-light)' }}>Review and manage messages from your website visitors.</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {inquiries.map((inq) => (
          <div 
            key={inq._id} 
            className="card" 
            style={{ 
              padding: '24px', 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: '20px',
              borderLeft: inq.status === 'unread' ? '4px solid var(--admin-accent)' : '4px solid transparent'
            }}
          >
            <div style={{ flex: 1, minWidth: '250px', display: 'flex', gap: '20px', alignItems: 'center' }}>
               <div style={{ 
                 width: '48px', height: '48px', borderRadius: '50%', 
                 background: inq.status === 'unread' ? 'rgba(184, 151, 42, 0.1)' : '#f1f5f9',
                 color: inq.status === 'unread' ? 'var(--admin-accent)' : 'var(--admin-text-light)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
               }}>
                 <User size={24} />
               </div>
               <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{inq.name}</h4>
                    {inq.status === 'unread' && (
                      <span style={{ fontSize: '10px', fontWeight: '800', padding: '2px 8px', background: 'var(--admin-accent)', color: '#fff', borderRadius: '10px', textTransform: 'uppercase' }}>New</span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--admin-text-light)', marginBottom: '4px' }}>{inq.subject}</div>
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={12} /> {new Date(inq.createdAt).toLocaleDateString()}
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
               <button 
                 onClick={() => { setSelectedInquiry(inq); if (inq.status === 'unread') updateStatus(inq._id, 'read'); }} 
                 className="btn-secondary"
                 style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
               >
                 <Eye size={16} /> <span className="desktop-only">View Message</span>
               </button>
               <button 
                 onClick={() => deleteInquiry(inq._id)} 
                 style={{ padding: '10px', borderRadius: '10px', background: '#fef2f2', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer' }}
               >
                 <Trash2 size={18} />
               </button>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--admin-text-light)' }} className="card">
            <Mail size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
            <div>No inquiries found in your inbox.</div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 2000, padding: '20px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ 
            background: '#fff', width: '100%', maxWidth: '650px', 
            borderRadius: 'var(--radius-xl)', padding: '40px', position: 'relative', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'fadeUp 0.3s ease'
          }}>
            <button 
              onClick={() => setSelectedInquiry(null)} 
              style={{ position: 'absolute', right: '24px', top: '24px', background: '#f1f5f9', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--admin-accent)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '8px' }}>Sender Information</div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)', marginBottom: '4px' }}>{selectedInquiry.name}</h2>
              <a href={`mailto:${selectedInquiry.email}`} style={{ color: 'var(--admin-text-light)', textDecoration: 'none', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} /> {selectedInquiry.email}
              </a>
            </div>
            
            <div style={{ background: 'var(--admin-bg)', padding: '32px', borderRadius: '24px', marginBottom: '32px', border: '1px solid var(--admin-border)' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--admin-text-light)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '8px' }}>Subject</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--admin-text-main)' }}>{selectedInquiry.subject}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--admin-text-light)', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '8px' }}>Message Body</div>
                <div style={{ color: 'var(--admin-text-main)', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontSize: '15px' }}>{selectedInquiry.message}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a 
                href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`} 
                style={{ flex: 2, textDecoration: 'none' }}
              >
                <button className="btn-primary" style={{ width: '100%', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Mail size={18} /> Compose Reply
                </button>
              </a>
              <button 
                onClick={() => deleteInquiry(selectedInquiry._id)} 
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid #fee2e2', color: 'var(--admin-danger)', background: '#fff', cursor: 'pointer', fontWeight: '700' }}
              >
                Delete Thread
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManager;
