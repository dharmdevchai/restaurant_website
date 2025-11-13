"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/app/components/Loader';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load reservations from backend API on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reservations');
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
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
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
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1>Reservation Management</h1>
        <Link href="/admin" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <Loader message="Loading reservations..." />
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
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
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              padding: '3rem', 
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