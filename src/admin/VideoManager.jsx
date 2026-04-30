import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, PlusCircle, LayoutGrid, List, Monitor, 
  ChevronRight, ArrowLeft, Video, Calendar, Tv, Radio, ExternalLink, Search
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation State
  const [view, setView] = useState('categories'); // 'categories' | 'entities' | 'editor'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', subtitle: '', type: 'CLIP',
    duration: '', channel: '', description: '',
    videos: [], episodes: []
  });

  const categories = [
    { id: 'CLIP', label: 'Short Clips', desc: 'Social media reminders', icon: List, color: '#0ea5e9' },
    { id: 'LONG', label: 'Full Lectures', desc: 'University & Jumuah', icon: Video, color: '#8b5cf6' },
    { id: 'SERIES', label: 'Lecture Series', desc: 'Tafseer & Topic series', icon: LayoutGrid, color: '#f59e0b' },
    { id: 'TV_PROGRAM', label: 'TV Programs', desc: 'Pegham TV archives', icon: Monitor, color: '#10b981' },
    { id: 'PAYAM_SUBAH', label: 'Payam-e-Subah', desc: 'Yearly archives', icon: Radio, color: '#ef4444' },
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setView('entities');
  };

  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
    setFormData({
       ...entity,
       videos: entity.videos || [],
       episodes: entity.episodes || []
    });
    setView('editor');
  };

  const handleAddNew = () => {
    setSelectedEntity(null);
    setFormData({
      id: '', title: '', subtitle: '', type: selectedCategory.id,
      duration: '', channel: '', description: '',
      videos: [], episodes: []
    });
    setView('editor');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Sanitize payload
    const submissionData = { ...formData };
    delete submissionData._id;
    delete submissionData.__v;
    delete submissionData.createdAt;
    delete submissionData.updatedAt;

    try {
      if (selectedEntity && selectedEntity._id) {
        await axios.put(`${API_BASE}/videos/${selectedEntity._id}`, submissionData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/videos`, submissionData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setView('entities');
      fetchVideos();
    } catch (err) {
      alert("Error saving data. Please check all required fields.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this permanently?')) {
      await axios.delete(`${API_BASE}/videos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchVideos();
    }
  };

  const filteredEntities = videos.filter(v => 
    v.type === selectedCategory?.id && 
    (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     v.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {view === 'categories' && (
        <>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Video Library</h2>
            <p style={{ color: 'var(--admin-text-light)' }}>Select a category to manage content or series.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {categories.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => handleSelectCategory(cat)}
                className="card"
                style={{ padding: '32px', cursor: 'pointer' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${cat.color}15`, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <cat.icon size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>{cat.label}</h3>
                <p style={{ fontSize: '13px', color: 'var(--admin-text-light)', lineHeight: 1.5 }}>{cat.desc}</p>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: cat.color }}>
                   Manage Section <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'entities' && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setView('categories')} className="btn-secondary" style={{ padding: '8px 12px' }}>
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{selectedCategory.label}</h2>
                <p style={{ fontSize: '13px', color: 'var(--admin-text-light)' }}>{filteredEntities.length} resources found</p>
              </div>
            </div>
            <button onClick={handleAddNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> Create New
            </button>
          </div>

          <div className="card" style={{ padding: '16px', marginBottom: '32px', display: 'flex', gap: '12px', alignItems: 'center' }}>
             <Search size={18} color="var(--admin-text-light)" />
             <input 
               type="text" 
               placeholder={`Search in ${selectedCategory.label}...`} 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px' }}
             />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {filteredEntities.map(entity => (
              <div key={entity._id} onClick={() => handleSelectEntity(entity)} className="card" style={{ padding: '20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                   <div style={{ width: '100px', height: '65px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {entity.thumbnail ? (
                       <img src={entity.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     ) : <Video size={24} color="#cbd5e1" />}
                   </div>
                   <div style={{ flex: 1, minWidth: 0 }}>
                     <h4 className={entity.type !== 'CLIP' ? 'urdu' : ''} style={{ fontSize: '15px', color: 'var(--admin-text-main)', margin: 0, fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entity.title}</h4>
                     <p style={{ fontSize: '12px', color: 'var(--admin-text-light)', margin: '4px 0 0' }}>{entity.subtitle || entity.id}</p>
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--admin-border)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-light)', textTransform: 'uppercase' }}>
                    {entity.type === 'SERIES' || entity.type === 'TV_PROGRAM' ? `${entity.videos?.length || 0} Episodes` : entity.duration || 'Video'}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(entity._id); }} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: 'var(--admin-danger)', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--admin-bg)', color: 'var(--admin-text-main)', fontSize: '11px', fontWeight: '700' }}>Manage →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredEntities.length === 0 && (
             <div style={{ textAlign: 'center', padding: '100px', color: 'var(--admin-text-light)' }} className="card">No items found in this section.</div>
          )}
        </>
      )}

      {view === 'editor' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setView('entities')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={18} /> Cancel
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: 'var(--admin-text-light)', fontWeight: '700' }}>CATEGORY: <span style={{ color: 'var(--admin-accent)' }}>{selectedCategory.label}</span></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>{selectedEntity ? 'Edit Resource' : 'Create New Resource'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>Title (Urdu)</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} dir="rtl" className="urdu" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '18px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>English Translation / Subtitle</label>
                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '15px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>Unique Slug (ID)</label>
                  <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g. jumuah-lecture-2024" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
               </div>
               {(selectedCategory.id === 'CLIP' || selectedCategory.id === 'LONG') ? (
                 <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>Video Duration</label>
                    <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 10:45" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
                 </div>
               ) : (
                 <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>Channel / Platform</label>
                    <input type="text" value={formData.channel} onChange={(e) => setFormData({...formData, channel: e.target.value})} placeholder="e.g. Pegham TV" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
                 </div>
               )}
               <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--admin-text-light)' }}>Cover Image URL</label>
                  <input type="text" value={formData.thumbnail || ''} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} placeholder="/path/to/image.jpg" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '14px' }} />
               </div>
            </div>

            {/* Episodes List Management */}
            {(selectedCategory.id === 'SERIES' || selectedCategory.id === 'TV_PROGRAM') && (
              <div style={{ marginTop: '48px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Manage Episodes</h3>
                    <button type="button" onClick={() => setFormData({...formData, videos: [...(formData.videos || []), { id: '', title: '', ep: '' }]})} style={{ color: 'var(--admin-accent)', background: 'transparent', border: '1px solid var(--admin-accent)', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PlusCircle size={16} /> Add Episode
                    </button>
                 </div>

                 <div style={{ display: 'grid', gap: '16px' }}>
                    {formData.videos?.map((vid, idx) => {
                      const extractId = (str) => {
                        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                        const match = str.match(regex);
                        return match ? match[1] : str;
                      };

                      return (
                        <div key={idx} className="card" style={{ 
                          display: 'grid', gridTemplateColumns: 'auto 1fr 1.5fr auto auto', gap: '12px', 
                          alignItems: 'center', padding: '16px', background: '#fcfcfc'
                        }}>
                          <div style={{ width: '60px', height: '40px', borderRadius: '6px', background: '#f1f5f9', overflow: 'hidden' }}>
                            {vid.id && (
                               <img 
                                 src={`https://img.youtube.com/vi/${extractId(vid.id)}/mqdefault.jpg`} 
                                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                 onError={(e) => { e.target.style.display = 'none'; }}
                               />
                            )}
                          </div>

                          <input 
                            type="text" 
                            placeholder="Video Link/ID" 
                            value={vid.id} 
                            onChange={(e) => {
                              const newVids = [...formData.videos];
                              newVids[idx].id = extractId(e.target.value);
                              setFormData({...formData, videos: newVids});
                            }} 
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '13px' }} 
                          />

                          <input 
                            type="text" 
                            placeholder="Episode Title" 
                            value={vid.title} 
                            onChange={(e) => {
                              const newVids = [...formData.videos];
                              newVids[idx].title = e.target.value;
                              setFormData({...formData, videos: newVids});
                            }} 
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '13px' }} 
                          />

                          <input 
                            type="text" 
                            placeholder="Part" 
                            value={vid.ep} 
                            style={{ width: '60px', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontSize: '13px', textAlign: 'center' }}
                            onChange={(e) => {
                              const newVids = [...formData.videos];
                              newVids[idx].ep = e.target.value;
                              setFormData({...formData, videos: newVids});
                            }} 
                          />

                          <button type="button" onClick={() => {
                            const newVids = formData.videos.filter((_, i) => i !== idx);
                            setFormData({...formData, videos: newVids});
                          }} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })}
                    {(!formData.videos || formData.videos.length === 0) && (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-light)', border: '2px dashed var(--admin-border)', borderRadius: '16px' }}>
                        No episodes added yet.
                      </div>
                    )}
                 </div>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: '48px', width: '100%', height: '54px', fontSize: '16px' }}>
              {selectedEntity ? 'Save Changes' : 'Publish to Library'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
