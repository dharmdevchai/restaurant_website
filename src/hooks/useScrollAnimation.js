"use client";
import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll('.feature-card, .dish-card, .testimonial-card, .menu-item, .team-member, .contact-item, .contact-form-wrapper');
    
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Cleanup
    return () => {
      animateElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
}

export function useNavbarScroll() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.transition = 'box-shadow 0.3s ease';
      } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.transition = 'box-shadow 0.3s ease';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
