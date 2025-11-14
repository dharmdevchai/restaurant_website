"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useGlobalLoader } from '@/app/components/GlobalLoaderContext';

export default function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { showLoader, hideLoader } = useGlobalLoader();

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
      showLoader('Redirecting to login...');
      // Use a small delay to ensure the loader is shown before navigation
      setTimeout(() => {
        router.push('/admin/login');
        hideLoader();
      }, 100);
    }
  }, [router, pathname, showLoader, hideLoader]);

  const handleLogout = () => {
    showLoader('Logging out...');
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    // Use a small delay to ensure the loader is shown before navigation
    setTimeout(() => {
      router.push('/admin/login');
      hideLoader();
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  // Don't show admin navigation on login page
  if (pathname === '/admin/login') {
    return <main>{children}</main>;
  }

  return (
    <div className="admin-layout">
      {/* Admin Navigation */}
      <nav className="admin-nav">
        <div className="admin-nav-container">
          <div className="admin-nav-header">
            Admin Dashboard
          </div>
          <button 
            className="admin-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`admin-nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button 
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Logout
            </button>
            <div className="admin-nav-links">
              <Link 
                href="/admin" 
                className={`admin-nav-link ${pathname === '/admin' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/gallery" 
                className={`admin-nav-link ${pathname === '/admin/gallery' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/admin/reservations" 
                className={`admin-nav-link ${pathname === '/admin/reservations' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Reservations
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}