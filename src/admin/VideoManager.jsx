import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, PlusCircle, LayoutGrid, List, Monitor } from 'lucide-react';
import { COLORS } from '../constants';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('CLIP');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '', title: '', subtitle: '', type: 'CLIP',
    duration: '', channel: '', description: '',
    videos: [], episodes: []
  });

  const tabs = [
    { id: 'CLIP', label: 'Short Clips', icon: List },
    { id: 'SERIES', label: 'Lecture Series', icon: LayoutGrid },
    { id: 'TV_PROGRAM', label: 'TV Programs', icon: Monitor },
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get('http://localhost:5000/api/videos');
    setVideos(res.data);
  };

  const handleOpenModal = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setFormData(video);
    } else {
      setEditingVideo(null);
      setFormData({
        id: '', title: '', subtitle: '', type: activeTab,
        duration: '', channel: '', description: '',
        videos: [], episodes: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editingVideo) {
      await axios.put(`http://localhost:5000/api/videos/${editingVideo._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:5000/api/videos', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setIsModalOpen(false);
    fetchVideos();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this entry?')) {
      await axios.delete(`http://localhost:5000/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchVideos();
    }
  };

  const filteredVideos = videos.filter(v => v.type === activeTab);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', color: COLORS.darkGreen, fontWeight: '700' }}>Manage Video Library</h1>
          <p style={{ color: COLORS.textLight }}>Organize clips, series, and television appearances.</p>
        </div>
        <button onClick={() => handleOpenModal()} style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
          background: COLORS.gold, color: COLORS.darkGreen, border: 'none', borderRadius: '12px',
          fontWeight: '600', cursor: 'pointer'
        }}>
          <Plus size={20} /> Add New {activeTab === 'CLIP' ? 'Clip' : 'Series'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: '#eee', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? COLORS.darkGreen : COLORS.textLight,
              fontWeight: activeTab === tab.id ? '600' : '400',
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredVideos.map(video => (
          <div key={video._id} style={{
            background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative'
          }}>
            <div style={{ fontWeight: '700', color: COLORS.darkGreen, fontSize: '18px' }}>{video.title}</div>
            <div style={{ fontSize: '14px', color: COLORS.textLight }}>{video.subtitle}</div>
            {video.channel && <div style={{ fontSize: '12px', fontWeight: '600', color: COLORS.gold }}>{video.channel}</div>}
            
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px', borderTop: '1px solid #f8f9fa', paddingTop: '16px' }}>
              <button onClick={() => handleOpenModal(video)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #eee', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Edit2 size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(video._id)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ffebeb', background: '#fff5f5', color: '#ff6b6b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', padding: '40px'
          }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', color: COLORS.darkGreen }}>{editingVideo ? 'Edit Entry' : 'Add New Entry'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>YouTube ID</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g., 5RuqA4c_8GQ" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Title (Urdu)</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Subtitle (English)</label>
                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>

              {activeTab === 'CLIP' && (
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 5:20" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
              )}

              {(activeTab === 'SERIES' || activeTab === 'TV_PROGRAM') && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Channel</label>
                    <input type="text" value={formData.channel} onChange={(e) => setFormData({...formData, channel: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                </>
              )}

              <button type="submit" style={{
                marginTop: '20px', width: '100%', padding: '16px', background: COLORS.gold, color: COLORS.darkGreen,
                border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
              }}>
                {editingVideo ? 'Update' : 'Add Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
