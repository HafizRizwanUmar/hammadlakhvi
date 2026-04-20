import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Upload, Save, Search, ExternalLink } from 'lucide-react';
import { COLORS, API_BASE, IMG_BASE } from '../constants';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '', title: '', titleEn: '', journal: '', year: '', 
    category: 'Contemporary', authors: 'Prof. Dr. Muhammad Hammad Lakhvi',
    abstract: '', content: '', url: '', lang: 'urdu'
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/articles`);
      setArticles(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setFormData(article);
    } else {
      setEditingArticle(null);
      setFormData({
        id: '', title: '', titleEn: '', journal: '', year: '', 
        category: 'Contemporary', authors: 'Prof. Dr. Muhammad Hammad Lakhvi',
        abstract: '', content: '', url: '', lang: 'urdu'
      });
    }
    setThumbnail(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await axios.delete(`${API_BASE}/articles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchArticles();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (thumbnail) data.append('thumbnail', thumbnail);

    const token = localStorage.getItem('token');
    if (editingArticle) {
      await axios.put(`${API_BASE}/articles/${editingArticle.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post(`${API_BASE}/articles`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setIsModalOpen(false);
    fetchArticles();
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', color: COLORS.darkGreen, fontWeight: '700' }}>Manage Articles</h1>
          <p style={{ color: COLORS.textLight }}>Publish and edit research articles.</p>
        </div>
        <button onClick={() => handleOpenModal()} style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
          background: COLORS.gold, color: COLORS.darkGreen, border: 'none', borderRadius: '12px',
          fontWeight: '600', cursor: 'pointer'
        }}>
          <Plus size={20} /> Add New Article
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
        <input 
          type="text" 
          placeholder="Search articles by title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: '1px solid #eee', fontSize: '15px' }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f8f9fa' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontWeight: '600' }}>Article Title</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontWeight: '600' }}>Category</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontWeight: '600' }}>Year</th>
              <th style={{ padding: '16px', textAlign: 'right', color: COLORS.textLight, fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: COLORS.darkGreen }}>{article.title}</div>
                  <div style={{ fontSize: '12px', color: COLORS.textLight }}>{article.titleEn}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: `${COLORS.gold}15`, color: COLORS.gold, fontSize: '12px', fontWeight: '600' }}>
                    {article.category}
                  </span>
                </td>
                <td style={{ padding: '16px', color: COLORS.textLight }}>{article.year}</td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => handleOpenModal(article)} style={{ p: '8px', border: 'none', background: 'none', color: COLORS.green, cursor: 'pointer' }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(article.id)} style={{ p: '8px', border: 'none', background: 'none', color: '#ff6b6b', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '800px',
            maxHeight: '90vh', overflowY: 'auto', padding: '40px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', color: COLORS.darkGreen }}>{editingArticle ? 'Edit Article' : 'Add New Article'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Article ID (Slug)</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g., role-of-women-in-dawah" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Title (Urdu)</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Title (English)</label>
                <input type="text" value={formData.titleEn} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Journal</label>
                <input type="text" value={formData.journal} onChange={(e) => setFormData({...formData, journal: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Year</label>
                <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Abstract</label>
                <textarea value={formData.abstract} onChange={(e) => setFormData({...formData, abstract: e.target.value})} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Full Content (supports Urdu)</label>
                <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows="10" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: "'Noto Nastaliq Urdu', serif" }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Thumbnail Image</label>
                <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>External URL (Optional)</label>
                <input type="text" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
                <button type="submit" style={{
                  width: '100%', padding: '16px', background: COLORS.gold, color: COLORS.darkGreen,
                  border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
                }}>
                  {editingArticle ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManager;
