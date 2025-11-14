"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/app/components/Loader';
import apiConfig from '@/config/api';
import { useGlobalLoader } from '@/app/components/GlobalLoaderContext';

export default function AdminReservations() {
  const { showLoader, hideLoader } = useGlobalLoader();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load reservations from backend API on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        showLoader('Loading reservations...');
        const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.reservations.getAll));
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          setError('Failed to load reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Network error while loading reservations');
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (id) => {
    try {
      showLoader('Deleting reservation...');
      const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.reservations.delete(id)), {
        method: 'DELETE',
      });
      
      if (response.ok) {
        const updatedReservations = reservations.filter(reservation => reservation.id !== id);
        setReservations(updatedReservations);
      } else {
        setError('Failed to delete reservation');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('Network error while deleting reservation');
    } finally {
      hideLoader();
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem' 
      }}>
        <h1>Reservation Management</h1>
        <Link href="/admin" className="btn btn-secondary" style={{ width: 'fit-content' }}>
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <Loader message="Loading reservations..." />
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '8px',
          margin: '0 1rem'
        }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h2>Current Reservations ({reservations.length})</h2>
          {reservations.length > 0 ? (
            <div style={{ 
              overflowX: 'auto',
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e9ecef' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Contact</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Date & Time</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Guests</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Special Requests</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>{reservation.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <div>{reservation.email}</div>
                        <div>{reservation.phone}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{reservation.date}</div>
                        <div>{reservation.time}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>{reservation.guests}</td>
                      <td style={{ padding: '1rem' }}>{reservation.specialRequests || 'None'}</td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          onClick={() => handleDeleteReservation(reservation.id)} 
                          className="btn"
                          style={{ 
                            backgroundColor: '#e74c3c', 
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px' 
            }}>
              <p>No reservations yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}