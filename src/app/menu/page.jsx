"use client";
import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MenuPage() {
  useScrollAnimation();
  
  const [activeFilter, setActiveFilter] = useState('all');

  const menuData = {
    appetizers: [
      { name: 'Bruschetta', description: 'Toasted bread with tomatoes, basil, and olive oil', price: '$8.99' },
      { name: 'Calamari', description: 'Crispy fried squid with marinara sauce', price: '$12.99' },
      { name: 'Stuffed Mushrooms', description: 'Mushroom caps filled with herbs and cheese', price: '$9.99' },
      { name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, Caesar dressing', price: '$10.99' }
    ],
    mains: [
      { name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with herbs and lemon butter sauce', price: '$24.99' },
      { name: 'Ribeye Steak', description: 'Prime cut ribeye with roasted vegetables', price: '$32.99' },
      { name: 'Chicken Parmesan', description: 'Breaded chicken breast with marinara and mozzarella', price: '$18.99' },
      { name: 'Seafood Pasta', description: 'Linguine with shrimp, mussels, and clams in garlic sauce', price: '$22.99' },
      { name: 'Vegetarian Risotto', description: 'Creamy arborio rice with seasonal vegetables', price: '$16.99' },
      { name: 'Lamb Chops', description: 'Grilled lamb chops with mint sauce', price: '$28.99' }
    ],
    desserts: [
      { name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: '$7.99' },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: '$8.99' },
      { name: 'Cheesecake', description: 'New York style cheesecake with berry compote', price: '$7.99' },
      { name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar topping', price: '$8.99' }
    ],
    beverages: [
      { name: 'House Wine', description: 'Red or White', price: '$8.99' },
      { name: 'Craft Beer', description: 'Selection of local craft beers', price: '$6.99' },
      { name: 'Fresh Juice', description: 'Orange, Apple, or Cranberry', price: '$4.99' },
      { name: 'Specialty Coffee', description: 'Espresso, Cappuccino, or Latte', price: '$4.99' }
    ]
  };

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' }
  ];

  const shouldShowCategory = (category) => {
    return activeFilter === 'all' || activeFilter === category;
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="page-header-content">
          <h1>Our Menu</h1>
          <p>Delicious dishes crafted with passion</p>
        </div>
      </section>

      {/* Menu Filter */}
      <section className="menu-filter">
        <div className="container">
          <div className="filter-buttons">
            {filterCategories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section">
        <div className="container">
          {shouldShowCategory('appetizers') && (
            <div className="menu-category" data-category="appetizers">
              <h2 className="category-title">Appetizers</h2>
              <div className="menu-grid">
                {menuData.appetizers.map((item, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p className="menu-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shouldShowCategory('mains') && (
            <div className="menu-category" data-category="mains">
              <h2 className="category-title">Main Courses</h2>
              <div className="menu-grid">
                {menuData.mains.map((item, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p className="menu-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shouldShowCategory('desserts') && (
            <div className="menu-category" data-category="desserts">
              <h2 className="category-title">Desserts</h2>
              <div className="menu-grid">
                {menuData.desserts.map((item, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p className="menu-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shouldShowCategory('beverages') && (
            <div className="menu-category" data-category="beverages">
              <h2 className="category-title">Beverages</h2>
              <div className="menu-grid">
                {menuData.beverages.map((item, index) => (
                  <div key={index} className="menu-item">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p className="menu-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
