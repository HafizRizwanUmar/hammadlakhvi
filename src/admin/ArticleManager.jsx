import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RichTextEditor from '../components/RichTextEditor';
import { 
  Plus, Edit2, Trash2, X, Eye, FileText, 
  ArrowLeft, Upload, Save, Globe, Book, Search, Filter
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';
import ArticleDetailPage from '../pages/ArticleDetail';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'edit'
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    id: '', title: '', titleEn: '', journal: '', year: '', 
    lang: 'urdu', category: 'Contemporary', abstract: '', content: ''
  });
  const [thumbnail, setThumbnail] = useState(null);



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
      try {
        await axios.delete(`${API_BASE}/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchArticles();
      } catch (err) {
        alert('Error deleting article');
      }
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
       ...article,
       id: article.id || '',
       title: article.title || '',
       titleEn: article.titleEn || '',
       journal: article.journal || '',
       year: article.year || '',
       lang: article.lang || 'urdu',
       category: article.category || 'Contemporary',
       abstract: article.abstract || '',
       content: article.content || ''
    });
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
    
    // Sanitize data and remove immutable fields
    const submissionData = { ...formData };
    delete submissionData._id;
    delete submissionData.__v;
    delete submissionData.createdAt;
    delete submissionData.updatedAt;

    const data = new FormData();
    Object.keys(submissionData).forEach(key => {
      if (submissionData[key] !== null && submissionData[key] !== undefined) {
        const val = typeof submissionData[key] === 'object' ? JSON.stringify(submissionData[key]) : submissionData[key];
        data.append(key, val);
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

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {activeTab === 'list' ? (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--admin-text-main)' }}>Research Publications</h2>
              <p style={{ color: 'var(--admin-text-light)' }}>Manage and edit your academic research and articles.</p>
            </div>
            <button onClick={handleCreateNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> New Publication
            </button>
          </div>

          <div className="card" style={{ padding: '20px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
             <Search size={20} color="var(--admin-text-light)" />
             <input 
               type="text" 
               placeholder="Search by title or slug..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '15px', outline: 'none' }}
             />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px', color: 'var(--admin-text-light)' }}>
              <div style={{ marginBottom: '16px' }}>Loading publications...</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {filteredArticles.map(article => (
                <div key={article._id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ 
                      padding: '4px 10px', background: 'var(--admin-bg)', color: 'var(--admin-text-light)', 
                      fontSize: '11px', fontWeight: '700', borderRadius: '6px', border: '1px solid var(--admin-border)' 
                    }}>{article.year}</span>
                    <span style={{ color: 'var(--admin-accent)', fontWeight: '800', fontSize: '11px', textTransform: 'uppercase' }}>{article.category}</span>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 className={article.lang === 'urdu' ? 'urdu' : ''} style={{ 
                      fontSize: article.lang === 'urdu' ? '20px' : '17px', color: 'var(--admin-text-main)', 
                      margin: '0 0 8px', fontWeight: '700', lineHeight: 1.5 
                    }}>{article.title}</h3>
                    <p style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '13px' }}>{article.journal}</p>
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', gap: '10px', paddingTop: '20px', borderTop: '1px solid var(--admin-border)' }}>
                    <button onClick={() => handleEdit(article)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '700', fontSize: '13px' }}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(article.id)} style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#fef2f2', color: 'var(--admin-danger)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setActiveTab('list')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}>
              <ArrowLeft size={18} /> Back
            </button>
            <button onClick={() => setIsPreviewOpen(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderColor: 'var(--admin-accent)', color: 'var(--admin-accent)' }}>
              <Eye size={18} /> Preview
            </button>
          </div>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px', background: '#fff' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>{editingArticle ? 'Update Publication' : 'Draft New Publication'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Identifier (URL Slug)</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g. dawat-e-deen" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Language</label>
                <select value={formData.lang} onChange={(e) => setFormData({...formData, lang: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#fff', fontSize: '14px' }}>
                  <option value="urdu">Urdu</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Year</label>
                <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="2024" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Full Publication Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className={formData.lang === 'urdu' ? 'urdu' : ''} required style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: formData.lang === 'urdu' ? '20px' : '16px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Journal Name</label>
                <input type="text" value={formData.journal} onChange={(e) => setFormData({...formData, journal: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#fff', fontSize: '14px' }}>
                  {['Contemporary', 'Seerah', 'Fiqh', 'History', 'Philosophy', 'Ethics', 'Economics', 'Interfaith', 'Tafseer'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Abstract / Summary</label>
              <textarea value={formData.abstract} onChange={(e) => setFormData({...formData, abstract: e.target.value})} rows="4" className={formData.lang === 'urdu' ? 'urdu' : ''} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
            </div>

            <div style={{ marginBottom: '40px' }}>
               <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Article Content</label>
               <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                  <RichTextEditor 
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    style={{ height: '450px', marginBottom: '50px' }}
                    lang={formData.lang}
                  />
               </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end', paddingTop: '24px', borderTop: '1px solid var(--admin-border)' }}>
               <div style={{ flex: 1, minWidth: '250px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--admin-text-light)', marginBottom: '8px' }}>Update Thumbnail</label>
                  <div style={{ position: 'relative', height: '54px' }}>
                    <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px dashed var(--admin-border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-light)', fontSize: '13px', gap: '8px' }}>
                      <Upload size={16} /> {thumbnail ? thumbnail.name : 'Choose file...'}
                    </div>
                  </div>
               </div>
               <button type="submit" className="btn-primary" style={{ flex: 1, height: '54px', fontSize: '16px' }}>
                 {editingArticle ? 'Update Publication' : 'Publish Publication'}
               </button>
            </div>
          </form>
        </div>
      )}

      {/* Preview Overlay */}
      {isPreviewOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 2000, overflowY: 'auto' }}>
          <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '12px 24px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Book size={18} color="var(--admin-accent)" />
              <span style={{ fontWeight: '800' }}>Live Preview</span>
            </div>
            <button onClick={() => setIsPreviewOpen(false)} className="btn-secondary" style={{ padding: '8px 24px' }}>Close</button>
          </div>
          <ArticleDetailPage article={formData} onBack={() => setIsPreviewOpen(false)} />
        </div>
      )}

    </div>
  );
};

export default ArticleManager;
