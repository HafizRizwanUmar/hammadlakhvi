import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Info, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { COLORS, API_BASE, IMG_BASE } from '../constants';

const SettingsManager = () => {
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState({
    phone: '', email: '', facebook: '', youtube: '', location: ''
  });
  const [emailConfig, setEmailConfig] = useState({
    email: '', password: '', host: 'smtp.gmail.com', port: '587'
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bioRes, contactRes, emailRes] = await Promise.all([
        axios.get(`${API_BASE}/meta/biography`).catch(() => ({ data: '' })),
        axios.get(`${API_BASE}/meta/contact`).catch(() => ({ data: {} })),
        axios.get(`${API_BASE}/meta/email_config`).catch(() => ({ data: {} }))
      ]);
      setBio(bioRes.data);
      setContact(prev => ({ ...prev, ...contactRes.data }));
      if (emailRes.data && emailRes.data.email) {
        setEmailConfig(prev => ({ ...prev, ...emailRes.data }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key, value) => {
    setSaveStatus(`Saving ${key}...`);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/meta/${key}`, { value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaveStatus('All changes saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving changes.');
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', color: COLORS.darkGreen, fontWeight: '700' }}>Site Settings & Biography</h1>
          <p style={{ color: COLORS.textLight }}>Update personal information and contact details.</p>
        </div>
        {saveStatus && (
          <div style={{ padding: '8px 16px', borderRadius: '8px', background: `${COLORS.green}15`, color: COLORS.green, fontWeight: '600', fontSize: '14px' }}>
            {saveStatus}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Biography Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: COLORS.darkGreen }}>
            <Info size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Biography</h2>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="15"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '20px', fontSize: '15px', lineHeight: '1.6' }}
            placeholder="Enter the biography text here..."
          />
          <button onClick={() => handleSave('biography', bio)} style={{
            width: '100%', padding: '14px', borderRadius: '12px', background: COLORS.darkGreen, color: '#fff',
            border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <Save size={18} /> Update Biography
          </button>
        </div>

        {/* Contact Info Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: COLORS.darkGreen }}>
            <Phone size={24} />
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Contact Details</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold }} />
                <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold }} />
                <input type="email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Facebook URL</label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold }} />
                <input type="text" value={contact.facebook} onChange={(e) => setContact({...contact, facebook: e.target.value})} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>YouTube Channel ID</label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold }} />
                <input type="text" value={contact.youtube} onChange={(e) => setContact({...contact, youtube: e.target.value})} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Location / Address</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.gold }} />
                <input type="text" value={contact.location} onChange={(e) => setContact({...contact, location: e.target.value})} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>
            </div>
          </div>

          <button onClick={() => handleSave('contact', contact)} style={{
            marginTop: '32px', width: '100%', padding: '14px', borderRadius: '12px', background: COLORS.gold, color: COLORS.darkGreen,
            border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <Save size={18} /> Update Contact Info
          </button>
        </div>
      </div>

      {/* Email Config Section */}
      <div style={{ marginTop: '40px', background: '#fff', padding: '32px', borderRadius: '20px', border: '1px solid #eee', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: COLORS.darkGreen }}>
          <Mail size={24} />
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Email Notification Settings</h2>
        </div>
        <p style={{ fontSize: '13px', color: COLORS.textLight, marginBottom: '24px' }}>
          Configure the SMTP server to send automated emails when a user submits an inquiry. 
          Use an <strong>App Password</strong> if using Gmail.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>SMTP Email (Admin Notification)</label>
            <input type="email" value={emailConfig.email} onChange={(e) => setEmailConfig({...emailConfig, email: e.target.value})} placeholder="your-email@gmail.com" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Email Password / App Password</label>
            <input type="password" value={emailConfig.password} onChange={(e) => setEmailConfig({...emailConfig, password: e.target.value})} placeholder="xxxx xxxx xxxx xxxx" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>SMTP Host</label>
              <input type="text" value={emailConfig.host} onChange={(e) => setEmailConfig({...emailConfig, host: e.target.value})} placeholder="smtp.gmail.com" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.textLight, marginBottom: '8px' }}>Port</label>
              <input type="text" value={emailConfig.port} onChange={(e) => setEmailConfig({...emailConfig, port: e.target.value})} placeholder="587" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
            </div>
          </div>
        </div>

        <button onClick={() => handleSave('email_config', emailConfig)} style={{
          marginTop: '32px', width: '100%', padding: '14px', borderRadius: '12px', background: COLORS.darkGreen, color: '#fff',
          border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <Save size={18} /> Save Email Config
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;
