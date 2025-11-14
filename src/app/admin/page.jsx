"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiConfig from '@/config/api';

export default function AdminDashboard() {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // Add state for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const router = useRouter();

  // Initialize with default credentials if not set
  useEffect(() => {
    const storedCredentials = localStorage.getItem('adminCredentials');
    if (!storedCredentials) {
      const defaultCredentials = {
        username: 'admin',
        password: 'admin123'
      };
      localStorage.setItem('adminCredentials', JSON.stringify(defaultCredentials));
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate new password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    try {
      const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.auth.changePassword), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Reset form and show success
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordError('');
        setPasswordSuccess(data.message);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setPasswordSuccess('');
          setShowPasswordChange(false);
        }, 3000);
      } else {
        setPasswordError(data.message || 'Error changing password');
      }
    } catch (error) {
      setPasswordError('Network error. Please try again.');
      console.error('Password change error:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel. Select an option below to manage content:</p>
      </div>
      
      {passwordSuccess && (
        <div className="alert alert-success">
          {passwordSuccess}
        </div>
      )}
      
      {showPasswordChange ? (
        <div className="password-change-card">
          <div className="card-header">
            <h2>Change Password</h2>
          </div>
          {passwordError && (
            <div className="alert alert-error">
              {passwordError}
            </div>
          )}
          <form onSubmit={handlePasswordChange} className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  className="form-control"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="password-toggle-btn"
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="password-toggle-btn"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="form-control"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle-btn"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Change Password</button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setPasswordError('');
                  // Reset visibility states
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setShowPasswordChange(true)}
          className="btn btn-outline change-password-btn"
        >
          Change Admin Password
        </button>
      )}
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">🖼️</div>
          <h2>Gallery Management</h2>
          <p>Upload, edit, and manage gallery images</p>
          <Link href="/admin/gallery" className="btn btn-primary">
            Manage Gallery
          </Link>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h2>Reservation Management</h2>
          <p>View and manage customer reservations</p>
          <Link href="/admin/reservations" className="btn btn-primary">
            Manage Reservations
          </Link>
        </div>
      </div>
    </div>
  );
}