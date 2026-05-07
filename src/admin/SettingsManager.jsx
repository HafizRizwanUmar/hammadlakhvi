import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, Info, Phone, Mail, Globe, MapPin, Server, ShieldCheck, 
  Layout, Type, List, Copyright, LayoutTemplate, UserCircle, Plus, Trash2
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  const [contact, setContact] = useState({ phone: '', email: '', facebook: '', youtube: '', location: '' });
  const [emailConfig, setEmailConfig] = useState({ email: '', password: '', host: 'smtp.gmail.com', port: '587' });
  
  const [hero, setHero] = useState({
    title: 'Dr. Muhammad Hammad Lakhvi',
    urduTitle: 'پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللّٰہ',
    bioSnippet: '• صدر فیتھ فاؤنڈیشن • سابق ڈین کلیہ علوم اسلامیہ جامعہ پنجاب',
    creds: ['Post-Doc — Glasgow UK', 'Ph.D. Islamic Studies', 'LLB Law', 'MA Islamiyat — Gold Medal']
  });

  const [footer, setFooter] = useState({
    orgs: ["Markazi Jamiat Ahlul Hadith", "Pegham TV", "Faith Foundation", "Punjab Quran Board"],
    quals: ["Post-Doctorate, Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal", "MA Arabic"]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactRes, emailRes, heroRes, footerRes] = await Promise.all([
        axios.get(`${API_BASE}/meta/contact`).catch(() => ({ data: {} })),
        axios.get(`${API_BASE}/meta/email_config`).catch(() => ({ data: {} })),
        axios.get(`${API_BASE}/meta/hero`).catch(() => ({ data: null })),
        axios.get(`${API_BASE}/meta/footer`).catch(() => ({ data: null }))
      ]);
      
      setContact(prev => ({ ...prev, ...contactRes.data }));
      if (emailRes.data?.email) setEmailConfig(prev => ({ ...prev, ...emailRes.data }));
      if (heroRes.data) setHero(heroRes.data);
      if (footerRes.data) setFooter(footerRes.data);
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
          <p style={{ color: 'var(--admin-text-light)' }}>Manage global site content and system configurations.</p>
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

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {[
          { id: 'contact', label: 'Contact Info', icon: Phone },
          { id: 'hero', label: 'Hero Section', icon: LayoutTemplate },
          { id: 'footer', label: 'Footer Content', icon: Layout },
          { id: 'email', label: 'Email Server', icon: Server },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--admin-sidebar-active)' : '#fff',
              color: activeTab === tab.id ? '#fff' : 'var(--admin-text-light)',
              fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.3s', boxShadow: 'var(--shadow-sm)'
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '40px' }}>
        
        {activeTab === 'contact' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Contact Details</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-light)' }}>Used in the footer and contact page.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { label: 'Phone Number', icon: Phone, key: 'phone' },
                { label: 'Email Address', icon: Mail, key: 'email' },
                { label: 'Facebook URL', icon: Globe, key: 'facebook' },
                { label: 'YouTube URL', icon: Globe, key: 'youtube' },
                { label: 'Address', icon: MapPin, key: 'location' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>{field.label}</label>
                  <div style={{ position: 'relative' }}>
                    <field.icon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-accent)' }} />
                    <input 
                      value={contact[field.key]} 
                      onChange={(e) => setContact({...contact, [field.key]: e.target.value})}
                      style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => handleSave('contact', contact)} className="btn-primary" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> Update Contact Info
            </button>
          </div>
        )}

        {activeTab === 'hero' && (
          <div>
             <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Hero Section Content</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-light)' }}>Edit the main banner content on the Home page.</p>
            </div>
            <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Main Title (English)</label>
                <input value={hero.title} onChange={(e) => setHero({...hero, title: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Urdu Title</label>
                <input value={hero.urduTitle} onChange={(e) => setHero({...hero, urduTitle: e.target.value})} className="urdu" dir="rtl" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '18px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Short Bio Snippet (Urdu)</label>
                <textarea value={hero.bioSnippet} onChange={(e) => setHero({...hero, bioSnippet: e.target.value})} className="urdu" dir="rtl" rows="2" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '16px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Credentials List</label>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {hero.creds.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input value={c} onChange={(e) => {
                        const newC = [...hero.creds];
                        newC[i] = e.target.value;
                        setHero({...hero, creds: newC});
                      }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                      <button onClick={() => setHero({...hero, creds: hero.creds.filter((_, idx) => idx !== i)})} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => setHero({...hero, creds: [...hero.creds, '']})} style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '8px', border: '1px dashed var(--admin-accent)', background: 'transparent', color: 'var(--admin-accent)', fontWeight: '700', cursor: 'pointer', fontSize: '12px', marginTop: '8px' }}>+ Add Credential</button>
                </div>
              </div>
            </div>
            <button onClick={() => handleSave('hero', hero)} className="btn-primary" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> Update Hero Section
            </button>
          </div>
        )}

        {activeTab === 'footer' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Footer Content</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-light)' }}>Edit organizational and educational details in the footer.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
               <div>
                 <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Organizations</label>
                 <div style={{ display: 'grid', gap: '8px' }}>
                    {footer.orgs.map((o, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px' }}>
                        <input value={o} onChange={(e) => {
                          const newO = [...footer.orgs];
                          newO[i] = e.target.value;
                          setFooter({...footer, orgs: newO});
                        }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <button onClick={() => setFooter({...footer, orgs: footer.orgs.filter((_, idx) => idx !== i)})} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                      </div>
                    ))}
                    <button onClick={() => setFooter({...footer, orgs: [...footer.orgs, '']})} style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '8px', border: '1px dashed var(--admin-accent)', background: 'transparent', color: 'var(--admin-accent)', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>+ Add Organization</button>
                 </div>
               </div>
               <div>
                 <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Qualifications</label>
                 <div style={{ display: 'grid', gap: '8px' }}>
                    {footer.quals.map((q, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px' }}>
                        <input value={q} onChange={(e) => {
                          const newQ = [...footer.quals];
                          newQ[i] = e.target.value;
                          setFooter({...footer, quals: newQ});
                        }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <button onClick={() => setFooter({...footer, quals: footer.quals.filter((_, idx) => idx !== i)})} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                      </div>
                    ))}
                    <button onClick={() => setFooter({...footer, quals: [...footer.quals, '']})} style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '8px', border: '1px dashed var(--admin-accent)', background: 'transparent', color: 'var(--admin-accent)', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>+ Add Qualification</button>
                 </div>
               </div>
            </div>
            <button onClick={() => handleSave('footer', footer)} className="btn-primary" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> Update Footer Content
            </button>
          </div>
        )}

        {activeTab === 'email' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Email Notification System</h3>
              <p style={{ fontSize: '14px', color: 'var(--admin-text-light)' }}>Configure SMTP to receive inquiry notifications.</p>
            </div>
            <div style={{ background: 'var(--admin-bg)', padding: '20px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--admin-border)', display: 'flex', gap: '12px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--admin-success)', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: 'var(--admin-text-light)', margin: 0 }}>Use an App Password for Gmail. Host usually is smtp.gmail.com and port 587.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Admin Notification Email</label>
                <input value={emailConfig.email} onChange={(e) => setEmailConfig({...emailConfig, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>App Password</label>
                <input type="password" value={emailConfig.password} onChange={(e) => setEmailConfig({...emailConfig, password: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>SMTP Host</label>
                <input value={emailConfig.host} onChange={(e) => setEmailConfig({...emailConfig, host: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Port</label>
                <input value={emailConfig.port} onChange={(e) => setEmailConfig({...emailConfig, port: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>
            <button onClick={() => handleSave('email_config', emailConfig)} className="btn-primary" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> Update Email Server Config
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SettingsManager;
