"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiConfig from '@/config/api';
import { useGlobalLoader } from '@/app/components/GlobalLoaderContext';

export default function AdminLogin() {
  const { showLoader, hideLoader } = useGlobalLoader();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      showLoader('Logging in...');
      const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.auth.login), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store login status in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUsername', data.username);
        // Use a small delay to ensure the loader is shown before navigation
        setTimeout(() => {
          hideLoader();
          router.push('/admin');
        }, 100);
      } else {
        setError(data.message || 'Invalid username or password');
        hideLoader();
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
      hideLoader();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">🔒</div>
          <h1>Admin Login</h1>
          <p>Access the gallery management panel</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              placeholder="Enter your username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>
          <div className="credential-item">
            <span className="credential-label">Username:</span>
            <span className="credential-value">admin</span>
          </div>
          <div className="credential-item">
            <span className="credential-label">Password:</span>
            <span className="credential-value">admin123</span>
          </div>
          <p className="credential-note">
            After logging in, you can change the password in the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}