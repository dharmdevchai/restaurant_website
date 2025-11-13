import React from 'react';
import Link from 'next/link';
import restaurantConfig from '@/config/restaurant';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>{restaurantConfig.name}</h3>
            <p>{restaurantConfig.tagline}</p>
            <div className="social-links">
              <a href={restaurantConfig.socialMedia.facebook} aria-label="Facebook">📘</a>
              <a href={restaurantConfig.socialMedia.instagram} aria-label="Instagram">📷</a>
              <a href={restaurantConfig.socialMedia.twitter} aria-label="Twitter">🐦</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li>📍 {restaurantConfig.contact.address}</li>
              <li>📞 {restaurantConfig.contact.phone}</li>
              <li>✉️ {restaurantConfig.contact.email}</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hours</h4>
            <ul>
              <li>Mon - Thu: {restaurantConfig.hours.display["Monday - Thursday"]}</li>
              <li>Fri - Sat: {restaurantConfig.hours.display["Friday - Saturday"]}</li>
              <li>Sunday: {restaurantConfig.hours.display["Sunday"]}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 {restaurantConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
