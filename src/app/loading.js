"use client";
import React from 'react';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--white)',
      zIndex: 9999
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid var(--bg-light)',
        borderTop: '5px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{
        marginTop: '1rem',
        color: 'var(--text-light)',
        fontSize: '1.1rem'
      }}>Loading...</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
