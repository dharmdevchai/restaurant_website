"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/app/components/Loader';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ url: '', alt: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ url: '', alt: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load images from backend API on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gallery');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          setError('Failed to load images');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Network error while loading images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('galleryImages', JSON.stringify(images));
    }
  }, [images]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (newImage.url && newImage.alt) {
      try {
        const response = await fetch('http://localhost:5000/api/gallery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newImage),
        });
        
        if (response.ok) {
          const addedImage = await response.json();
          setImages([...images, addedImage]);
          setNewImage({ url: '', alt: '' });
        } else {
          setError('Failed to add image');
        }
      } catch (error) {
        console.error('Error adding image:', error);
        setError('Network error while adding image');
      }
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
      } else {
        setError('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Network error while deleting image');
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      
      if (response.ok) {
        const updatedImage = await response.json();
        const updatedImages = images.map(image => 
          image.id === id ? updatedImage : image
        );
        setImages(updatedImages);
        setEditingIndex(null);
      } else {
        setError('Failed to update image');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setError('Network error while updating image');
    }
  };

  const startEditing = (image) => {
    setEditingIndex(image.id);
    setEditData({ url: image.url, alt: image.alt });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditData({ url: '', alt: '' });
  };

  // Set loading to false after images are loaded
  useEffect(() => {
    if (images.length > 0 && loading) {
      setLoading(false);
    }
  }, [images, loading]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1>Gallery Management</h1>
        <Link href="/gallery" className="btn btn-secondary">
          View Gallery
        </Link>
      </div>

      {/* Add New Image Form */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem' 
      }}>
        <h2>Add New Image</h2>
        <form onSubmit={handleAddImage} style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr auto', 
          gap: '1rem', 
          alignItems: 'end' 
        }}>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageAlt">Alt Text</label>
            <input
              type="text"
              id="imageAlt"
              value={newImage.alt}
              onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
              placeholder="Describe the image"
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Image
          </button>
        </form>
      </div>

      {/* Image List */}
      <h2>Current Gallery Images ({images.length})</h2>
      {loading ? (
        <Loader message="Loading gallery images..." />
      ) : (
        <>
          <div className="dishes-grid">
            {images.map((image) => (
              <div key={image.id} className="dish-card">
                {editingIndex === image.id ? (
                  <div style={{ padding: '1rem' }}>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={editData.url}
                        onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                        className="form-control"
                        style={{ marginBottom: '0.5rem' }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Alt Text</label>
                      <input
                        type="text"
                        value={editData.alt}
                        onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                        className="form-control"
                        style={{ marginBottom: '1rem' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => saveEdit(image.id)} 
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="btn btn-outline"
                        style={{ flex: 1 }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="dish-image">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                      />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <p style={{ 
                        fontWeight: '500', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.9rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {image.alt}
                      </p>
                      <p style={{ 
                        color: '#666', 
                        fontSize: '0.8rem', 
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {image.url}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => startEditing(image)} 
                          className="btn btn-outline"
                          style={{ flex: 1 }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteImage(image.id)} 
                          className="btn"
                          style={{ 
                            flex: 1, 
                            backgroundColor: '#e74c3c', 
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px' 
            }}>
              <p>No images in gallery. Add your first image above!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
