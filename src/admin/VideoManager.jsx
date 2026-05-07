import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, PlusCircle, LayoutGrid, List, Monitor, 
  ChevronRight, ArrowLeft, Video, Calendar, Tv, Radio, ExternalLink, Search, ArrowUp, ArrowDown, Upload
} from 'lucide-react';
import { COLORS, API_BASE, IMG_BASE } from '../constants';

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
    duration: '', channel: '', description: '', sequence: 0,
    details: [], gallery: [], recurring: false, galleryMode: 'DAYS',
    videos: [], episodes: [], thumbnail: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [ytLink, setYtLink] = useState('');

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
      // Sort by sequence (asc) then by date (desc)
      const sorted = res.data.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
      setVideos(sorted);
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
       sequence: entity.sequence || 0,
       videos: entity.videos || [],
       episodes: entity.episodes || []
    });
    setYtLink(entity.id ? `https://youtube.com/watch?v=${entity.id}` : '');
    setThumbnailFile(null);
    setView('editor');
  };

  const handleAddNew = () => {
    setSelectedEntity(null);
    setFormData({
      id: '', title: '', subtitle: '', type: selectedCategory.id,
      duration: '', channel: '', description: '', sequence: videos.filter(v => v.type === selectedCategory.id).length + 1,
      details: [], gallery: [{ label: 'Gallery', images: [] }], recurring: false, galleryMode: 'DAYS',
      videos: [], episodes: [], thumbnail: ''
    });
    setYtLink('');
    setThumbnailFile(null);
    setView('editor');
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleYtLinkChange = (url) => {
    setYtLink(url);
    const id = extractYoutubeId(url);
    if (id) {
      setFormData(prev => ({ ...prev, id }));
    }
  };

  const handleTitleChange = (title) => {
    setFormData(prev => {
      const newData = { ...prev, title };
      // Auto-assign slug/id only if it's currently empty and it's a SERIES/TV_PROGRAM
      if (!prev.id && (prev.type === 'SERIES' || prev.type === 'TV_PROGRAM' || prev.type === 'PAYAM_SUBAH')) {
        // Simple slugify: lowercase, replace spaces with hyphens, remove special chars
        const slug = title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        newData.id = slug;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Use FormData for file upload
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'videos' || key === 'episodes') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }

    try {
      if (selectedEntity && selectedEntity._id) {
        await axios.put(`${API_BASE}/videos/${selectedEntity._id}`, data, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post(`${API_BASE}/videos`, data, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setView('entities');
      fetchVideos();
    } catch (err) {
      alert("Error saving data.");
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
                <p style={{ fontSize: '13px', color: 'var(--admin-text-light)' }}>{filteredEntities.length} resources found (Ordered by sequence)</p>
              </div>
            </div>
            <button onClick={handleAddNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> Create New
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {filteredEntities.map(entity => (
              <div key={entity._id} onClick={() => handleSelectEntity(entity)} className="card" style={{ padding: '20px', cursor: 'pointer', borderLeft: '4px solid var(--admin-accent)' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'var(--admin-accent)', fontSize: '18px', flexShrink: 0 }}>
                     {entity.sequence || 0}
                   </div>
                   <div style={{ flex: 1, minWidth: 0 }}>
                     <h4 className={entity.type !== 'CLIP' ? 'urdu' : ''} style={{ fontSize: '15px', color: 'var(--admin-text-main)', margin: 0, fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entity.title}</h4>
                     <p style={{ fontSize: '12px', color: 'var(--admin-text-light)', margin: '4px 0 0' }}>{entity.subtitle || entity.id}</p>
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--admin-border)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-light)', textTransform: 'uppercase' }}>
                    {entity.type === 'SERIES' || entity.type === 'TV_PROGRAM' || entity.type === 'PAYAM_SUBAH' 
                      ? `${(entity.videos?.length || 0) + (entity.episodes?.length || 0)} Episodes` 
                      : entity.duration || 'Video'}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(entity._id); }} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: 'var(--admin-danger)', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--admin-bg)', color: 'var(--admin-text-main)', fontSize: '11px', fontWeight: '700' }}>Manage →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'editor' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setView('entities')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={18} /> Cancel
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: 'var(--admin-text-light)', fontWeight: '700' }}>SEQUENCE ORDER:</span>
              <input 
                type="number" 
                value={formData.sequence} 
                onChange={(e) => setFormData({...formData, sequence: parseInt(e.target.value) || 0})}
                style={{ width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontWeight: '800', textAlign: 'center' }} 
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>{selectedEntity ? 'Edit Resource' : 'Create New Resource'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Title (Urdu)</label>
                <input type="text" value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} dir="rtl" className="urdu" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '18px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>English Subtitle</label>
                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                <Video size={16} color="#ef4444" /> YouTube Video Link (Placeholder)
              </label>
              <input 
                type="text" 
                placeholder="Paste YouTube URL here (e.g. https://www.youtube.com/watch?v=...)" 
                value={ytLink} 
                onChange={(e) => handleYtLinkChange(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#f9fafb' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>ID / Slug</label>
                  <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
               </div>
               <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Duration/Info</label>
                  <input type="text" value={formData.duration || formData.channel || ''} onChange={(e) => setFormData({...formData, [selectedCategory.id === 'CLIP' || selectedCategory.id === 'LONG' ? 'duration' : 'channel']: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
               </div>
               <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Thumbnail</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={formData.thumbnail || ''} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} placeholder="URL" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', fontSize: '12px' }} />
                    <label style={{ cursor: 'pointer', background: 'var(--admin-bg)', padding: '10px', borderRadius: '10px', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={18} />
                      <input type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} style={{ display: 'none' }} accept="image/*" />
                    </label>
                  </div>
                  {thumbnailFile && <div style={{ fontSize: '10px', color: 'var(--admin-success)', marginTop: '4px' }}>Ready: {thumbnailFile.name}</div>}
               </div>
            </div>

            {/* Payam-e-Subah Specific Episode Management */}
            {selectedCategory.id === 'PAYAM_SUBAH' && (
              <div style={{ marginTop: '48px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Manage Archive Episodes</h3>
                  <button type="button" onClick={() => setFormData({...formData, episodes: [...(formData.episodes || []), { month: '', date: '', topic: '', dunyanewsUrl: '', youtubeId: '' }]})} style={{ color: 'var(--admin-accent)', background: 'transparent', border: '1px solid var(--admin-accent)', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PlusCircle size={16} /> Add Archive Entry
                  </button>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {(formData.episodes || []).map((ep, idx) => (
                    <div key={idx} className="card" style={{ padding: '20px', background: '#fcfcfc', border: '1px solid var(--admin-border)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '12px' }}>
                        <input placeholder="Month (e.g. April 2019)" value={ep.month} onChange={(e) => {
                          const newEps = [...formData.episodes];
                          newEps[idx].month = e.target.value;
                          setFormData({...formData, episodes: newEps});
                        }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <input placeholder="Exact Date (e.g. April 9, 2019)" value={ep.date} onChange={(e) => {
                          const newEps = [...formData.episodes];
                          newEps[idx].date = e.target.value;
                          setFormData({...formData, episodes: newEps});
                        }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <button type="button" onClick={() => setFormData({...formData, episodes: formData.episodes.filter((_, i) => i !== idx)})} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>
                      </div>
                      <input placeholder="Topic / Title (Urdu)" className="urdu" dir="rtl" value={ep.topic} onChange={(e) => {
                        const newEps = [...formData.episodes];
                        newEps[idx].topic = e.target.value;
                        setFormData({...formData, episodes: newEps});
                      }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', marginBottom: '12px', fontSize: '16px' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <input placeholder="YouTube Link or ID" value={ep.youtubeId} onChange={(e) => {
                          const val = e.target.value;
                          const extractedId = extractYoutubeId(val) || val;
                          const newEps = [...formData.episodes];
                          newEps[idx].youtubeId = extractedId;
                          setFormData({...formData, episodes: newEps});
                        }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <input placeholder="Dunya News URL (Optional)" value={ep.dunyanewsUrl} onChange={(e) => {
                          const newEps = [...formData.episodes];
                          newEps[idx].dunyanewsUrl = e.target.value;
                          setFormData({...formData, episodes: newEps});
                        }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standard Episodes List Management */}
            {(selectedCategory.id === 'SERIES' || selectedCategory.id === 'TV_PROGRAM') && (
              <div style={{ marginTop: '48px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Manage Episodes</h3>
                    <button type="button" onClick={() => setFormData({...formData, videos: [...(formData.videos || []), { id: '', title: '', ep: '' }]})} style={{ color: 'var(--admin-accent)', background: 'transparent', border: '1px solid var(--admin-accent)', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PlusCircle size={16} /> Add Episode
                    </button>
                 </div>
                 <div style={{ display: 'grid', gap: '12px' }}>
                    {formData.videos?.map((vid, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px auto', gap: '12px', alignItems: 'center', padding: '12px', background: '#fcfcfc', border: '1px solid var(--admin-border)', borderRadius: '12px' }}>
                        <input placeholder="episode youtube link" value={vid.id} onChange={(e) => {
                          const val = e.target.value;
                          const extractedId = extractYoutubeId(val) || val;
                          const newVids = [...formData.videos];
                          newVids[idx].id = extractedId;
                          setFormData({...formData, videos: newVids});
                        }} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <input placeholder="episode title" value={vid.title} onChange={(e) => {
                          const newVids = [...formData.videos];
                          newVids[idx].title = e.target.value;
                          setFormData({...formData, videos: newVids});
                        }} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
                        <input placeholder="episode number" value={vid.ep} onChange={(e) => {
                          const newVids = [...formData.videos];
                          newVids[idx].ep = e.target.value;
                          setFormData({...formData, videos: newVids});
                        }} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--admin-border)', textAlign: 'center' }} />
                        <button type="button" onClick={() => setFormData({...formData, videos: formData.videos.filter((_, i) => i !== idx)})} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                      </div>
                    ))}
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
