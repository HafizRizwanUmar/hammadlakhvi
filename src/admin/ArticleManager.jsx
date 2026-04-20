import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  Plus, Edit2, Trash2, X, Eye, FileText, 
  ArrowLeft, Upload, Save, Globe, Book
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';
import ArticleDetailPage from '../pages/ArticleDetail';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'edit'
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', titleEn: '', journal: '', year: '', 
    lang: 'urdu', category: 'Contemporary', abstract: '', content: ''
  });
  const [thumbnail, setThumbnail] = useState(null);

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
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this article permanently?')) {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArticles();
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData(article);
    setActiveTab('edit');
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setFormData({
      id: '', title: '', titleEn: '', journal: '', year: '', 
      lang: 'urdu', category: 'Contemporary', abstract: '', content: ''
    });
    setThumbnail(null);
    setActiveTab('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Use FormData for Multer support (thumbnails)
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });
    if (thumbnail) {
      data.append('thumbnail', thumbnail);
    }

    try {
      if (editingArticle) {
        await axios.put(`${API_BASE}/articles/${editingArticle.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/articles`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setActiveTab('list');
      fetchArticles();
    } catch (err) {
      alert('Error saving publication: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {activeTab === 'list' ? (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h1 style={{ fontSize: '32px', color: '#1e293b', fontWeight: '800', letterSpacing: '-0.02em' }}>Research Publications</h1>
              <p style={{ color: '#64748b' }}>Manage your published journals and research papers.</p>
            </div>
            <button onClick={handleCreateNew} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
              background: COLORS.darkGreen, color: '#fff', border: 'none', borderRadius: '14px',
              fontWeight: '700', cursor: 'pointer', boxShadow: '0 10px 20px rgba(26,58,42,0.15)'
            }}>
              <Plus size={22} /> Publish New Article
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading publications...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {articles.map(article => (
                <div key={article._id} style={{
                  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '28px',
                  display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ padding: '6px 12px', background: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: '800', borderRadius: '8px' }}>{article.year}</span>
                    <span style={{ color: COLORS.gold, fontWeight: '800', fontSize: '11px', textTransform: 'uppercase' }}>{article.category}</span>
                  </div>
                  <div>
                    <h3 className={article.lang === 'urdu' ? 'urdu' : ''} style={{ 
                      fontSize: article.lang === 'urdu' ? '22px' : '18px', color: '#1e293b', margin: 0, lineHeight: 1.5 
                    }}>{article.title}</h3>
                    <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '14px' }}>{article.journal}</p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                    <button onClick={() => handleEdit(article)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', fontSize: '14px' }}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button onClick={() => handleDelete(article.id)} style={{ padding: '12px', borderRadius: '12px', border: 'none', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setActiveTab('list')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              <ArrowLeft size={18} /> Back to Publications
            </button>
            <button onClick={() => setIsPreviewOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
              <Eye size={18} /> Live Preview
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '32px', padding: '48px', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '40px' }}>{editingArticle ? 'Update Publication' : 'Draft New Publication'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Article Identifier (Link Slug)</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g. dawat-e-deen-role" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div>
                   <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Language</label>
                   <select value={formData.lang} onChange={(e) => setFormData({...formData, lang: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff' }}>
                     <option value="urdu">Urdu</option>
                     <option value="en">English</option>
                   </select>
                 </div>
                 <div>
                   <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Year</label>
                   <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="2024" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                 </div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Main Title (Urdu/English)</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className={formData.lang === 'urdu' ? 'urdu' : ''} required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: formData.lang === 'urdu' ? '22px' : '18px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Published In (Journal Name)</label>
                <input type="text" value={formData.journal} onChange={(e) => setFormData({...formData, journal: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff' }}>
                  {['Contemporary', 'Seerah', 'Fiqh', 'History', 'Philosophy', 'Ethics', 'Economics', 'Interfaith', 'Tafseer'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Abstract / Quick Summary</label>
              <textarea value={formData.abstract} onChange={(e) => setFormData({...formData, abstract: e.target.value})} rows="4" className={formData.lang === 'urdu' ? 'urdu' : ''} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px' }} />
            </div>

            <div style={{ marginBottom: '40px' }}>
               <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Article Content (Full Text)</label>
               <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                  <ReactQuill 
                    theme="snow"
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    modules={modules}
                    style={{ height: '500px', marginBottom: '50px' }}
                  />
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px', alignItems: 'center' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>Feature Thumbnail</label>
                  <div style={{ position: 'relative' }}>
                    <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                    <div style={{ padding: '14px', border: '2px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                      {thumbnail ? `Selected: ${thumbnail.name}` : `Click to Upload Thumbnail`}
                    </div>
                  </div>
               </div>
               <div style={{ paddingTop: '28px' }}>
                  <button type="submit" style={{ width: '100%', padding: '18px', background: COLORS.gold, color: COLORS.darkGreen, border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(184,151,42,0.2)' }}>
                    {editingArticle ? 'Update Publication' : 'Publish Publication'}
                  </button>
               </div>
            </div>
          </form>
        </div>
      )}

      {/* Preview Modal Overlay */}
      {isPreviewOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 2000, overflowY: 'auto', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '16px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={20} color={COLORS.gold} />
              <span style={{ fontWeight: '800', color: '#1e293b' }}>Live Publication Preview</span>
            </div>
            <button onClick={() => setIsPreviewOpen(false)} style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Exit Preview</button>
          </div>
          <div>
            <ArticleDetailPage article={formData} onBack={() => setIsPreviewOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
};

export default ArticleManager;
