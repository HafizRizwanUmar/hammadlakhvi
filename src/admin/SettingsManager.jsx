import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Save, Info, Phone, Mail, Globe, MapPin, Server, ShieldCheck } from 'lucide-react';
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'clean'],
    ],
  };

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
      setSaveStatus('Changes saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving changes.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--admin-text-light)' }}>Loading settings...</div>;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Platform Settings</h2>
          <p style={{ color: 'var(--admin-text-light)' }}>Manage global site content and notification configurations.</p>
        </div>
        {saveStatus && (
          <div style={{ 
            padding: '10px 20px', borderRadius: '12px', 
            background: saveStatus.includes('Error') ? '#fef2f2' : '#ecfdf5', 
            color: saveStatus.includes('Error') ? 'var(--admin-danger)' : 'var(--admin-success)', 
            fontWeight: '700', fontSize: '14px', border: '1px solid currentColor' 
          }}>
            {saveStatus}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '32px' }}>

        {/* Contact Info Section */}
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--admin-accent)' }}>
            <Phone size={24} />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--admin-text-main)' }}>Contact Details</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-light)', marginBottom: '20px' }}>Global contact information used in footer and contact page.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Phone Number', icon: Phone, key: 'phone', type: 'text' },
              { label: 'Email Address', icon: Mail, key: 'email', type: 'email' },
              { label: 'Facebook Page', icon: Globe, key: 'facebook', type: 'text' },
              { label: 'YouTube Channel ID', icon: Globe, key: 'youtube', type: 'text' },
              { label: 'Physical Address', icon: MapPin, key: 'location', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>{field.label}</label>
                <div style={{ position: 'relative' }}>
                  <field.icon size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-accent)' }} />
                  <input 
                    type={field.type} 
                    value={contact[field.key]} 
                    onChange={(e) => setContact({...contact, [field.key]: e.target.value})} 
                    style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => handleSave('contact', contact)} className="btn-primary" style={{ marginTop: '32px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Save size={18} /> Update Contact Info
          </button>
        </div>
      </div>

      {/* Email Config Section */}
      <div className="card" style={{ padding: '32px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--admin-accent)' }}>
          <Server size={24} />
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--admin-text-main)' }}>Email Notification System</h3>
        </div>
        <div style={{ background: 'var(--admin-bg)', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--admin-border)' }}>
          <p style={{ fontSize: '13px', color: 'var(--admin-text-light)', margin: 0, display: 'flex', gap: '8px' }}>
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            Configure the SMTP server to send automated emails when users submit inquiries. 
            Use an <strong>App Password</strong> if you are using Gmail.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Admin Notification Email</label>
            <input type="email" value={emailConfig.email} onChange={(e) => setEmailConfig({...emailConfig, email: e.target.value})} placeholder="admin@example.com" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>SMTP App Password</label>
            <input type="password" value={emailConfig.password} onChange={(e) => setEmailConfig({...emailConfig, password: e.target.value})} placeholder="•••• •••• •••• ••••" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>SMTP Host</label>
            <input type="text" value={emailConfig.host} onChange={(e) => setEmailConfig({...emailConfig, host: e.target.value})} placeholder="smtp.gmail.com" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Port</label>
            <input type="text" value={emailConfig.port} onChange={(e) => setEmailConfig({...emailConfig, port: e.target.value})} placeholder="587" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
          </div>
        </div>

        <button onClick={() => handleSave('email_config', emailConfig)} className="btn-primary" style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} /> Save Config
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;
