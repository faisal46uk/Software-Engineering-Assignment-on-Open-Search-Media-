import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './nameStyling.css';

function ProfilePage() {
  const { token } = useAuth();

  const [oldProfile, setOldProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOldProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newProfile.name && !newProfile.email && !newProfile.phone) {
      setError('Please enter at least one field to update.');
      return;
    }

    try {
      await axios.put('http://localhost:5001/api/user/update', newProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear new input fields
      setNewProfile({ name: '', email: '', phone: '' });
      setSuccessPopup(true);

      // Refresh old profile
      const res = await axios.get('http://localhost:5001/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOldProfile(res.data);

      setTimeout(() => setSuccessPopup(false), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setError('❌ Failed to update profile.');
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-image">
        <img
          src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Profile"
        />
      </div>

      <div className="profile-box">
        <h2>👤 Profile Details</h2>

        {error && <p className="message error">{error}</p>}
        {successPopup && (
          <div className="success-popup">
            ✅ Profile updated successfully!
          </div>
        )}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-col">
              <label>Old Name</label>
              <input value={oldProfile.name} disabled />
            </div>
            <div className="input-col">
              <label>New Name</label>
              <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-col">
              <label>Old Email</label>
              <input value={oldProfile.email} disabled />
            </div>
            <div className="input-col">
              <label>New Email</label>
              <input
                type="email"
                name="email"
                value={newProfile.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-col">
              <label>Old Phone</label>
              <input value={oldProfile.phone} disabled />
            </div>
            <div className="input-col">
              <label>New Phone</label>
              <input
                type="text"
                name="phone"
                value={newProfile.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="profile-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
