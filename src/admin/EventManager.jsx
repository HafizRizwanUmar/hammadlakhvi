import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, X, PlusCircle, Calendar, MapPin, 
  Image as ImageIcon, Save, ArrowLeft, ChevronRight, Info, Upload
} from 'lucide-react';
import { COLORS, API_BASE, IMG_BASE } from '../constants';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', date: '', location: '', description: '',
    details: [], gallery: [], recurring: false, galleryMode: 'DAYS'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...event,
      details: event.details || [],
      gallery: (event.gallery || []).map(day => ({
        ...day,
        images: (day.images || []).map(img => typeof img === 'string' ? { url: img, title: '' } : img)
      })),
      galleryMode: event.galleryMode || 'DAYS'
    });
    setView('editor');
  };

  const handleAddNew = () => {
    setFormData({
      title: '', date: '', location: '', description: '',
      type: 'Special', icon: '📜', color: '#B8972A', videoId: '',
      details: [], gallery: [{ label: 'Gallery', images: [] }], recurring: false, galleryMode: 'DAYS'
    });
    setView('editor');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (selectedEvent) {
        await axios.put(`${API_BASE}/events/${selectedEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE}/events`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setView('list');
      fetchEvents();
    } catch (err) {
      alert("Error saving event.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event permanently?')) {
      await axios.delete(`${API_BASE}/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchEvents();
    }
  };

  const handleUploadImage = async (dayIdx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await axios.post(`${API_BASE}/events/upload`, fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      const newGallery = [...formData.gallery];
      // Push object instead of string
      newGallery[dayIdx].images.push({ url: res.data.url, title: '' });
      setFormData({ ...formData, gallery: newGallery });
    } catch (err) {
      alert("Upload failed.");
    }
  };

  const addGalleryDay = () => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, { label: `Day ${formData.gallery.length + 1}`, images: [] }]
    });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading Events...</div>;

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {view === 'list' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Events Management</h2>
              <p style={{ color: 'var(--admin-text-light)' }}>Manage public gatherings, conferences, and galleries.</p>
            </div>
            <button onClick={handleAddNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> Create Event
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {events.map(event => (
              <div key={event._id} className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ fontSize: '32px' }}>{event.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--admin-text-main)' }}>{event.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--admin-text-light)', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {event.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {event.location}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => handleEdit(event)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--admin-border)', background: '#fff', cursor: 'pointer' }}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(event._id)} style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#fef2f2', color: 'var(--admin-danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
            {events.length === 0 && <div style={{ textAlign: 'center', padding: '60px', color: 'var(--admin-text-light)' }} className="card">No events found.</div>}
          </div>
        </>
      )}

      {view === 'editor' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={() => setView('list')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <ArrowLeft size={18} /> Back to List
          </button>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>{selectedEvent ? 'Edit Event' : 'Create New Event'}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Event Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Date / Schedule</label>
                <input type="text" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} placeholder="e.g. 15th Aug 2024" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Icon (Emoji)</label>
                <input type="text" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', textAlign: 'center', fontSize: '20px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Theme Color</label>
                <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} style={{ width: '100%', height: '45px', padding: '4px', borderRadius: '10px', border: '1px solid var(--admin-border)', cursor: 'pointer' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Gallery Style</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, galleryMode: 'DAYS'})}
                  style={{ 
                    flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', 
                    background: formData.galleryMode === 'DAYS' ? 'var(--admin-accent)' : '#fff',
                    color: formData.galleryMode === 'DAYS' ? '#fff' : 'var(--admin-text-main)',
                    fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  Grouped by Days / Sections
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    // If switching to gallery mode and there are multiple days, merge them?
                    // For now just switch mode.
                    setFormData({...formData, galleryMode: 'GALLERY'});
                  }}
                  style={{ 
                    flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--admin-border)', 
                    background: formData.galleryMode === 'GALLERY' ? 'var(--admin-accent)' : '#fff',
                    color: formData.galleryMode === 'GALLERY' ? '#fff' : 'var(--admin-text-main)',
                    fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  Single Direct Gallery
                </button>
              </div>
            </div>
            <div style={{ marginTop: '48px' }}>
            <div style={{ marginTop: '48px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
                  {formData.galleryMode === 'DAYS' ? 'Event Gallery (Structured by Days)' : 'Direct Gallery Images'}
                </h3>
                {formData.galleryMode === 'DAYS' && (
                  <button type="button" onClick={addGalleryDay} style={{ color: 'var(--admin-accent)', background: 'transparent', border: '1px solid var(--admin-accent)', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PlusCircle size={16} /> Add Day/Section
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gap: '24px' }}>
                {formData.gallery.map((day, dIdx) => (
                  <div key={dIdx} className="card" style={{ padding: '24px', background: '#fcfcfc' }}>
                    {formData.galleryMode === 'DAYS' && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <input 
                          type="text" 
                          value={day.label} 
                          onChange={(e) => {
                            const newG = [...formData.gallery];
                            newG[dIdx].label = e.target.value;
                            setFormData({...formData, gallery: newG});
                          }}
                          style={{ fontSize: '16px', fontWeight: '700', border: 'none', background: 'transparent', borderBottom: '2px solid var(--admin-accent)' }}
                        />
                        <button type="button" onClick={() => {
                          const newG = formData.gallery.filter((_, i) => i !== dIdx);
                          setFormData({...formData, gallery: newG});
                        }} style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                      {day.images.map((img, iIdx) => (
                        <div key={iIdx} style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--admin-border)', overflow: 'hidden' }}>
                          <div style={{ position: 'relative', aspectRatio: '4/3', background: '#eee' }}>
                            <img 
                              src={(img.url || img).startsWith('http') || (img.url || img).startsWith('data:') ? (img.url || img) : `${IMG_BASE}${img.url || img}`} 
                              alt="Preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              onError={(e) => {
                                console.error("Image load error:", e.target.src);
                                e.target.src = 'https://via.placeholder.com/200x150?text=Error';
                              }}
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const newG = [...formData.gallery];
                                newG[dIdx].images.splice(iIdx, 1);
                                setFormData({...formData, gallery: newG});
                              }}
                              style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,0,0,0.8)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div style={{ padding: '8px' }}>
                            <input 
                              type="text" 
                              placeholder="Image Title" 
                              value={img.title || ''} 
                              onChange={(e) => {
                                const newG = [...formData.gallery];
                                if (typeof newG[dIdx].images[iIdx] === 'string') {
                                  newG[dIdx].images[iIdx] = { url: newG[dIdx].images[iIdx], title: e.target.value };
                                } else {
                                  newG[dIdx].images[iIdx].title = e.target.value;
                                }
                                setFormData({...formData, gallery: newG});
                              }}
                              style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', fontWeight: '700' }}
                            />
                          </div>
                        </div>
                      ))}
                      <label style={{ 
                        aspectRatio: '4/3', borderRadius: '12px', border: '2px dashed var(--admin-border)', 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                        cursor: 'pointer', color: 'var(--admin-text-light)', gap: '4px', background: '#fff'
                      }}>
                        <Upload size={24} />
                        <span style={{ fontSize: '11px', fontWeight: '800' }}>UPLOAD IMAGE</span>
                        <input type="file" hidden onChange={(e) => handleUploadImage(dIdx, e)} accept="image/*" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '48px', width: '100%', height: '54px', fontSize: '16px' }}>
              {selectedEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventManager;
