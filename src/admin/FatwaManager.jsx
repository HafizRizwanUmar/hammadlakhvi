import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, PlusCircle, HelpCircle, Save, ArrowLeft, Search, List
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';

const FatwaManager = () => {
  const [fatwas, setFatwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [selectedFatwa, setSelectedFatwa] = useState(null);
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    sequence: 0,
    active: true
  });

  useEffect(() => {
    fetchFatwas();
  }, []);

  const fetchFatwas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/fatwas`);
      setFatwas(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedFatwa(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      sequence: fatwas.length + 1,
      active: true
    });
    setView('editor');
  };

  const handleEdit = (fatwa) => {
    setSelectedFatwa(fatwa);
    setFormData({
      question: fatwa.question,
      answer: fatwa.answer,
      category: fatwa.category || 'General',
      sequence: fatwa.sequence || 0,
      active: fatwa.active !== undefined ? fatwa.active : true
    });
    setView('editor');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Q&A?')) {
      try {
        await axios.delete(`${API_BASE}/fatwas/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchFatwas();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (selectedFatwa) {
        await axios.put(`${API_BASE}/fatwas/${selectedFatwa._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/fatwas`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchFatwas();
      setView('list');
    } catch (err) {
      console.error(err);
      alert('Failed to save. Check your login session.');
    }
  };

  const filteredFatwas = fatwas.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {view === 'list' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Q&A / Fatwa Management</h2>
              <p style={{ color: 'var(--admin-text-light)' }}>Manage Islamic questions and answers shown on the public site.</p>
            </div>
            <button onClick={handleAddNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> Add New Q&A
            </button>
          </div>

          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-light)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search questions or answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 52px', borderRadius: '14px', border: '1px solid var(--admin-border)', fontSize: '15px' }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredFatwas.map(fatwa => (
                <div key={fatwa._id} className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(184,151,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold }}>
                      <HelpCircle size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--admin-text-main)', marginBottom: '4px' }}>{fatwa.question}</h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--admin-text-light)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><List size={14} /> {fatwa.category}</span>
                        <span style={{ color: fatwa.active ? 'var(--admin-success)' : 'var(--admin-danger)' }}>{fatwa.active ? '● Active' : '○ Hidden'}</span>
                        <span>Seq: {fatwa.sequence}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => handleEdit(fatwa)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#fff', cursor: 'pointer' }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(fatwa._id)} style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#fef2f2', color: 'var(--admin-danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
              {filteredFatwas.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'var(--admin-text-light)' }} className="card">No results found.</div>}
            </div>
          )}
        </>
      )}

      {view === 'editor' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button onClick={() => setView('list')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <ArrowLeft size={18} /> Back to List
          </button>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>{selectedFatwa ? 'Edit Q&A' : 'Create New Q&A'}</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Question (Urdu or English)</label>
              <textarea 
                value={formData.question} 
                onChange={(e) => setFormData({...formData, question: e.target.value})} 
                required 
                rows="3"
                style={{ width: '100%', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '16px', fontFamily: 'inherit' }} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Answer / Fatwa Detail</label>
              <textarea 
                value={formData.answer} 
                onChange={(e) => setFormData({...formData, answer: e.target.value})} 
                required 
                rows="8"
                style={{ width: '100%', padding: '16px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '15px', lineHeight: '1.6', fontFamily: 'inherit' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Category</label>
                <input 
                  type="text" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Sequence (Order)</label>
                <input 
                  type="number" 
                  value={formData.sequence} 
                  onChange={(e) => setFormData({...formData, sequence: parseInt(e.target.value)})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input 
                type="checkbox" 
                id="isActive"
                checked={formData.active} 
                onChange={(e) => setFormData({...formData, active: e.target.checked})} 
                style={{ width: '20px', height: '20px' }}
              />
              <label htmlFor="isActive" style={{ fontSize: '14px', fontWeight: '600' }}>Show on public website</label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', height: '54px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Save size={20} /> {selectedFatwa ? 'Save Changes' : 'Publish Q&A'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FatwaManager;
