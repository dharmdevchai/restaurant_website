"use client";
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import apiConfig from '@/config/api';

export default function GalleryPage() {
  useScrollAnimation();
  
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.gallery.getAll));
        if (response.ok) {
          const data = await response.json();
          setGalleryImages(data);
        } else {
          setError('Failed to load gallery images');
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError('Network error while loading gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="page-header-content">
          <h1>Gallery</h1>
          <p>A visual journey through our culinary world</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 className="section-title">Our Restaurant</h2>
          <p className="section-subtitle">Explore our ambiance, dishes, and dining experience</p>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading gallery...</p>
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              borderRadius: '8px',
              margin: '0 1rem'
            }}>
              <p>{error}</p>
            </div>
          ) : (
            <div className="dishes-grid">
              {galleryImages.map((image) => (
                <div key={image.id} className="dish-card">
                  <div className="dish-image">
                    <img src={image.url} alt={image.alt} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
