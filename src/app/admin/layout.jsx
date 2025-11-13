"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't check authentication for login page
    if (pathname === '/admin/login') {
      setIsLoggedIn(true);
      return;
    }
    
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    router.push('/admin/login');
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  // Don't show admin navigation on login page
  if (pathname === '/admin/login') {
    return <main>{children}</main>;
  }

  return (
    <div>
      {/* Admin Navigation */}
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Admin Dashboard
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginRight: '1rem'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#c82333';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#dc3545';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            Logout
          </button>
          <Link href="/admin" style={{ 
            color: 'white', 
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            transition: 'all 0.3s',
            fontWeight: '500',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            Dashboard
          </Link>
          <Link href="/admin/gallery" style={{ 
            color: 'white', 
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            transition: 'all 0.3s',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            Gallery
          </Link>
          <Link href="/admin/reservations" style={{ 
            color: 'white', 
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            transition: 'all 0.3s',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            Reservations
          </Link>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
}