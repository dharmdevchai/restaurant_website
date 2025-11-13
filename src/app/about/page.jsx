"use client";
import React from 'react';
import restaurantConfig from '@/config/restaurant';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutPage() {
  useScrollAnimation();
  
  return (
    <div>
      {/* Page Header */}
      <section className="page-header" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="page-header-content">
          <h1>About Us</h1>
          <p>Our Story, Our Passion</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          {/* Our Story */}
          <div className="about-section">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                {restaurantConfig.details.description}
              </p>
              <p>
                From humble beginnings, we've grown into a beloved dining destination, 
                known for our commitment to quality, authenticity, and exceptional hospitality. 
                Every dish we serve tells a story of tradition, innovation, and passion.
              </p>
              <p>
                Our chefs carefully select the finest ingredients, working closely with local 
                suppliers to ensure freshness and quality in every meal. We believe that great 
                food brings people together, creating memories that last a lifetime.
              </p>
            </div>
            <div className="placeholder-image">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop" alt="Restaurant Interior" />
            </div>
          </div>

          {/* Our Values */}
          <div className="about-section reverse">
            <div className="placeholder-image">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=600&fit=crop" alt="Chef Cooking" />
            </div>
            <div className="about-text">
              <h2>Our Values</h2>
              <ul className="values-list">
                <li>
                  <strong>Quality:</strong> We never compromise on the quality of our ingredients 
                  or the care we put into every dish.
                </li>
                <li>
                  <strong>Authenticity:</strong> Traditional recipes meet modern techniques to 
                  create unforgettable flavors.
                </li>
                <li>
                  <strong>Sustainability:</strong> We're committed to sustainable practices and 
                  supporting local producers.
                </li>
                <li>
                  <strong>Community:</strong> We believe in giving back to the community that has 
                  supported us throughout the years.
                </li>
                <li>
                  <strong>Excellence:</strong> From our kitchen to your table, we strive for 
                  excellence in everything we do.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The talented people behind your dining experience</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop" alt="Head Chef" />
              </div>
              <h3>Chef Michael Anderson</h3>
              <p className="member-role">Head Chef</p>
              <p className="member-bio">
                With 15 years of culinary expertise, Chef Michael brings creativity and 
                passion to every dish.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&h=300&fit=crop" alt="Sous Chef" />
              </div>
              <h3>Chef Maria Garcia</h3>
              <p className="member-role">Sous Chef</p>
              <p className="member-bio">
                Specializing in Mediterranean cuisine, Chef Maria adds authentic flavors 
                to our menu.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" alt="Restaurant Manager" />
              </div>
              <h3>David Thompson</h3>
              <p className="member-role">Restaurant Manager</p>
              <p className="member-bio">
                David ensures every guest has an exceptional dining experience from start 
                to finish.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" alt="Pastry Chef" />
              </div>
              <h3>Chef Sophie Laurent</h3>
              <p className="member-role">Pastry Chef</p>
              <p className="member-bio">
                Creating delightful desserts that perfectly complement our savory offerings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
