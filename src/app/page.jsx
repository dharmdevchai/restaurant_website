"use client";
import restaurantConfig from '@/config/restaurant';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  useScrollAnimation();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{restaurantConfig.hero.title}</h1>
          <p className="hero-subtitle">{restaurantConfig.hero.subtitle}</p>
          <div className="hero-buttons">
            <a href="/menu" className="btn btn-primary">View Menu</a>
            <a href="#features" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="features-grid">
            {restaurantConfig.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Dishes Section */}
      <section className="special-dishes">
        <div className="container">
          <h2 className="section-title">Our Special Dishes</h2>
          <p className="section-subtitle">Carefully crafted by our expert chefs</p>
          <div className="dishes-grid">
            <div className="dish-card">
              <div className="dish-image">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop" alt="Grilled Salmon" />
              </div>
              <div className="dish-content">
                <h3>Grilled Salmon</h3>
                <p>Fresh Atlantic salmon with herbs and lemon butter sauce</p>
                <span className="dish-price">$24.99</span>
              </div>
            </div>
            <div className="dish-card">
              <div className="dish-image">
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop" alt="Mediterranean Salad" />
              </div>
              <div className="dish-content">
                <h3>Mediterranean Salad</h3>
                <p>Fresh greens, feta cheese, olives, and homemade dressing</p>
                <span className="dish-price">$12.99</span>
              </div>
            </div>
            <div className="dish-card">
              <div className="dish-image">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop" alt="Signature Pizza" />
              </div>
              <div className="dish-content">
                <h3>Signature Pizza</h3>
                <p>Wood-fired pizza with premium toppings and artisan cheese</p>
                <span className="dish-price">$18.99</span>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <a href="/menu" className="btn btn-primary">View Full Menu</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Reviews from our valued guests</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Amazing food and excellent service! The atmosphere is perfect for a romantic dinner. Highly recommend!"
              </p>
              <p className="testimonial-author">- Sarah Johnson</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best restaurant in town! Fresh ingredients and the chef's specials are always incredible."
              </p>
              <p className="testimonial-author">- Michael Chen</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "A delightful dining experience. The staff is friendly and the food is consistently outstanding."
              </p>
              <p className="testimonial-author">- Emily Rodriguez</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
