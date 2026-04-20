import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, PlusCircle, LayoutGrid, List, Monitor, 
  ChevronRight, ArrowLeft, Video, Calendar, Tv, Radio
} from 'lucide-react';
import { COLORS, API_BASE } from '../constants';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    { id: 'CLIP', label: 'Short Video Clips', desc: 'Manage 1-2 minute social media reminders', icon: List, color: '#0ea5e9' },
    { id: 'LONG', label: 'Full Lectures', desc: 'Complete university and mosque lectures', icon: Video, color: '#8b5cf6' },
    { id: 'SERIES', label: 'Lecture Series', desc: 'Walidayn series, Ramadan Tafseer, etc.', icon: LayoutGrid, color: '#f59e0b' },
    { id: 'TV_PROGRAM', label: 'Television Programs', desc: 'Pegham TV, Dunya News, Peace TV', icon: Monitor, color: '#10b981' },
    { id: 'PAYAM_SUBAH', label: 'Payam-e-Subah Archive', desc: 'Manage yearly morning archives', icon: Radio, color: '#ef4444' },
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
    if (cat.id === 'CLIP' || cat.id === 'LONG') {
      setView('entities');
    } else {
      setView('entities');
    }
  };

  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
    setFormData(entity);
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
    try {
      if (selectedEntity && selectedEntity._id) {
        await axios.put(`${API_BASE}/videos/${selectedEntity._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/videos`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setView('entities');
      fetchVideos();
    } catch (err) {
      alert("Error saving data. Please check fields.");
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

  const filteredEntities = videos.filter(v => v.type === selectedCategory?.id);

  // ── RENDER HELPERS ────────────────────────────────────────────────────────

  const renderBreadcrumbs = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '14px' }}>
      <button onClick={() => setView('categories')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Library</button>
      {selectedCategory && (
        <>
          <ChevronRight size={14} color="#94a3b8" />
          <button onClick={() => setView('entities')} style={{ background: 'none', border: 'none', color: view === 'entities' ? COLORS.darkGreen : '#64748b', cursor: 'pointer', fontWeight: view === 'entities' ? '700' : '400' }}>{selectedCategory.label}</button>
        </>
      )}
      {selectedEntity && (
        <>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ fontWeight: '700', color: COLORS.darkGreen }}>{selectedEntity.title}</span>
        </>
      )}
    </div>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {view === 'categories' && (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          <div style={{ marginBottom: '48px' }}>
            <h1 style={{ fontSize: '32px', color: '#1e293b', fontWeight: '800' }}>Video Library</h1>
            <p style={{ color: '#64748b' }}>Select a section to manage content.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {categories.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => handleSelectCategory(cat)}
                style={{ 
                  background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', 
                  cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${cat.color}15`, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <cat.icon size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{cat.label}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'entities' && (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setView('categories')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleAddNew} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: COLORS.darkGreen, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
              <Plus size={20} /> Create New {selectedCategory.label.split(' ')[0]}
            </button>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>{selectedCategory.label}</h2>
            <p style={{ color: '#64748b' }}>Manage existing programs and their episodes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredEntities.map(entity => (
              <div key={entity._id} onClick={() => handleSelectEntity(entity)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                   {entity.thumbnail ? (
                     <img src={entity.thumbnail} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                   ) : (
                     <div style={{ width: '80px', height: '60px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={24} color="#cbd5e1" /></div>
                   )}
                   <div style={{ flex: 1 }}>
                     <h4 className={entity.type !== 'CLIP' ? 'urdu' : ''} style={{ fontSize: '15px', color: '#1e293b', margin: 0, fontWeight: '700' }}>{entity.title}</h4>
                     <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>{entity.subtitle}</p>
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {entity.type === 'SERIES' || entity.type === 'TV_PROGRAM' ? `${entity.videos?.length || 0} Episodes` : entity.duration || 'Video'}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(entity._id); }} style={{ padding: '6px', borderRadius: '6px', border: 'none', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    <button style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Manage →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'editor' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <button onClick={() => setView('entities')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              <ArrowLeft size={16} /> Cancel & Exit
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Section: <strong>{selectedCategory.label}</strong></span>
              {selectedEntity && <span style={{ padding: '4px 12px', background: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: '700', borderRadius: '6px' }}>Existing Entry</span>}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '48px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px', color: '#1e293b' }}>{selectedEntity ? 'Edit Program Details' : 'Configure New Program'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Main Title (Urdu)</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} dir="rtl" className="urdu" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '18px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>English Title / Translation</label>
                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Unique Slug</label>
                  <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g. pegham-tv-series" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
               </div>
               {(selectedCategory.id === 'CLIP' || selectedCategory.id === 'LONG') ? (
                 <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Duration</label>
                    <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 5:20" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                 </div>
               ) : (
                 <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Main Channel</label>
                    <input type="text" value={formData.channel} onChange={(e) => setFormData({...formData, channel: e.target.value})} placeholder="e.g. Pegham TV" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                 </div>
               )}
               <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Thumbnail (Optional)</label>
                  <input type="text" value={formData.thumbnail} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} placeholder="/image.jpg" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
               </div>
            </div>

            {/* Episodes Management Section (For Series/TV) */}
            {(selectedCategory.id === 'SERIES' || selectedCategory.id === 'TV_PROGRAM') && (
              <div style={{ marginTop: '40px', padding: '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>Episode Management</h3>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>List all videos belonging to this program below.</p>
                    </div>
                    <button type="button" onClick={() => setFormData({...formData, videos: [...(formData.videos || []), { id: '', title: '', ep: '' }]})} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#fff', color: COLORS.darkGreen, border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                      <PlusCircle size={18} /> Add New Episode
                    </button>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {formData.videos?.map((vid, idx) => {
                      const extractId = (str) => {
                        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                        const match = str.match(regex);
                        return match ? match[1] : str; // return extracted ID or original if already ID
                      };

                      return (
                        <div key={idx} style={{ 
                          display: 'grid', gridTemplateColumns: '80px 1fr 1.5fr 0.6fr 40px', gap: '16px', 
                          alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '20px', 
                          border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
                        }}>
                          {/* Thumbnail Preview */}
                          <div style={{ width: '80px', height: '54px', borderRadius: '8px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {vid.id ? (
                               <img 
                                 src={`https://img.youtube.com/vi/${extractId(vid.id)}/mqdefault.jpg`} 
                                 alt="Preview" 
                                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                 onError={(e) => { e.target.style.display = 'none'; }}
                               />
                            ) : <Video size={20} color="#cbd5e1" />}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Paste Link</label>
                            <input 
                              type="text" 
                              placeholder="YouTube URL or ID" 
                              value={vid.id} 
                              onChange={(e) => {
                                const newVids = [...formData.videos];
                                newVids[idx].id = extractId(e.target.value);
                                setFormData({...formData, videos: newVids});
                              }} 
                              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} 
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Video Title (Urdu/Eng)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Introduction to Fiqh" 
                              value={vid.title} 
                              onChange={(e) => {
                                const newVids = [...formData.videos];
                                newVids[idx].title = e.target.value;
                                setFormData({...formData, videos: newVids});
                              }} 
                              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} 
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Part #</label>
                            <input 
                              type="text" 
                              placeholder="Ep 1" 
                              value={vid.ep} 
                              onChange={(e) => {
                                const newVids = [...formData.videos];
                                newVids[idx].ep = e.target.value;
                                setFormData({...formData, videos: newVids});
                              }} 
                              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} 
                            />
                          </div>

                          <button type="button" onClick={() => {
                            const newVids = formData.videos.filter((_, i) => i !== idx);
                            setFormData({...formData, videos: newVids});
                          }} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', height: '40px', width: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })}
                    {(!formData.videos || formData.videos.length === 0) && (
                      <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '20px' }}>
                        No episodes added yet. Click "Add New Episode" to start building the list.
                      </div>
                    )}
                 </div>
              </div>
            )}

            <button type="submit" style={{ marginTop: '48px', width: '100%', padding: '20px', background: COLORS.gold, color: COLORS.darkGreen, border: 'none', borderRadius: '18px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(184,151,42,0.3)' }}>
              {selectedEntity ? 'Save Changes' : 'Publish Program'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
