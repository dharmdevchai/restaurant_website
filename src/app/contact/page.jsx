"use client";
import React, { useState } from 'react';
import restaurantConfig from '@/config/restaurant';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactPage() {
  useScrollAnimation();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form data:', form);
    alert('Thank you for your message! We will get back to you as soon as possible.');
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="page-header-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have a question or want to make a reservation? We're here to help!</p>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>{restaurantConfig.contact.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>{restaurantConfig.contact.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>{restaurantConfig.contact.email}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h3>Hours</h3>
                  <p>
                    Mon - Thu: {restaurantConfig.hours.display["Monday - Thursday"]}<br />
                    Fri - Sat: {restaurantConfig.hours.display["Friday - Saturday"]}<br />
                    Sunday: {restaurantConfig.hours.display["Sunday"]}
                  </p>
                </div>
              </div>

              <div className="social-links-contact">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href={restaurantConfig.socialMedia.facebook} aria-label="Facebook">📘</a>
                  <a href={restaurantConfig.socialMedia.instagram} aria-label="Instagram">📷</a>
                  <a href={restaurantConfig.socialMedia.twitter} aria-label="Twitter">🐦</a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h2>Find Us</h2>
            <div className="map-placeholder">
              <p>📍 Map Location</p>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                {restaurantConfig.contact.address}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '5px' }}>
                (Map integration can be added here with Google Maps API)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
