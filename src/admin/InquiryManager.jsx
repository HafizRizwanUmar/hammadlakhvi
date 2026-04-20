import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2, CheckCircle, Clock, Eye, X } from 'lucide-react';
import { COLORS } from '../constants';

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/inquiries', {
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
      await axios.patch(`http://localhost:5000/api/inquiries/${id}/status`, { status }, {
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
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInquiries();
      setSelectedInquiry(null);
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  if (loading) return <div>Loading inquiries...</div>;

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: COLORS.darkGreen, fontWeight: '700' }}>User Inquiries</h1>
        <p style={{ color: COLORS.textLight }}>Manage messages received from the contact form.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: COLORS.textLight }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: COLORS.textLight }}>User</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: COLORS.textLight }}>Subject</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: COLORS.textLight }}>Date</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: COLORS.textLight }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                <td style={{ padding: '16px 24px' }}>
                  {inq.status === 'unread' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', background: '#fff4e6', color: '#d9480f', fontSize: '12px', fontWeight: '600' }}>
                      <Clock size={14} /> Unread
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', background: `${COLORS.green}15`, color: COLORS.green, fontSize: '12px', fontWeight: '600' }}>
                      <CheckCircle size={14} /> Read
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: '600', color: COLORS.text }}>{inq.name}</div>
                  <div style={{ fontSize: '12px', color: COLORS.textLight }}>{inq.email}</div>
                </td>
                <td style={{ padding: '16px 24px', color: COLORS.text }}>{inq.subject}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: COLORS.textLight }}>
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { setSelectedInquiry(inq); if (inq.status === 'unread') updateStatus(inq._id, 'read'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.darkGreen }} title="View">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => deleteInquiry(inq._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e03131' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textLight }}>
            No inquiries found.
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '24px', padding: '32px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setSelectedInquiry(null)} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', cursor: 'pointer', color: COLORS.textLight }}>
              <X size={24} />
            </button>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: COLORS.gold, fontWeight: '700', marginBottom: '8px' }}>User Information</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: COLORS.darkGreen }}>{selectedInquiry.name}</h2>
              <div style={{ color: COLORS.textLight }}>{selectedInquiry.email}</div>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: COLORS.textLight, fontWeight: '700', marginBottom: '8px' }}>Subject</div>
              <div style={{ fontWeight: '600', color: COLORS.darkGreen, marginBottom: '16px' }}>{selectedInquiry.subject}</div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: COLORS.textLight, fontWeight: '700', marginBottom: '8px' }}>Message</div>
              <div style={{ color: COLORS.text, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{selectedInquiry.message}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`mailto:${selectedInquiry.email}`} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: COLORS.darkGreen, color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: '600' }}>
                Reply via Email
              </a>
              <button onClick={() => deleteInquiry(selectedInquiry._id)} style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #e03131', color: '#e03131', background: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManager;
