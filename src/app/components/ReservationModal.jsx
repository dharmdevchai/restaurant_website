"use client";
import { useState, useEffect } from "react";
import apiConfig from "@/config/api";

export default function ReservationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle body scroll when modal opens/closes
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.reservations.create), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        // Show alert with reservation details
        alert("Thank you for your reservation! 🎉\n\nWe have received your request and will contact you shortly to confirm the details.\n\nReservation Summary:\n- Name: " + form.name + "\n- Date: " + form.date + "\n- Time: " + form.time + "\n- Guests: " + form.guests + "\n\nA member of our team will reach out to " + form.email + " or " + form.phone + " within 24 hours to finalize your reservation.\n\nWe look forward to serving you!");
        // Reset form after a short delay
        setTimeout(() => {
          setForm({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            guests: "2",
            specialRequests: ""
          });
          setSubmitSuccess(false);
          setOpen(false);
        }, 2000);
      } else {
        alert("Sorry, there was an error processing your reservation. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert("Network error. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <a href="#" className="btn-reservation" onClick={(e) => { e.preventDefault(); setOpen(true); }}>Reservations</a>
      {open && (
        <div className="modal" style={{ display: 'block' }} onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setOpen(false)}>&times;</span>
            <h2>Make a Reservation</h2>
            {submitSuccess ? (
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <h3>Reservation Request Submitted! 🎉</h3>
                <p>Thank you for your reservation. We will contact you shortly to confirm the details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="3"
                  value={form.specialRequests}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Reserve Table</button>
            </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
