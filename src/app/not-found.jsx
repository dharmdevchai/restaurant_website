import React from 'react';
import Link from 'next/link';

function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '6rem',
        color: 'var(--primary-color)',
        marginBottom: '1rem'
      }}>404</h1>
      <h2 style={{
        fontSize: '2rem',
        color: 'var(--secondary-color)',
        marginBottom: '1rem'
      }}>Page Not Found</h2>
      <p style={{
        color: 'var(--text-light)',
        marginBottom: '2rem',
        fontSize: '1.1rem'
      }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
