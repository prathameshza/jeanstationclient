// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    custName: '',
    address: '',
    phoneNo: '',
    email: '',
    userName: '',
    pwd: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7120/api/Customers', formData);
      if (response.status === 201) {
        alert('Account created successfully! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="custName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="custName" name="custName" value={formData.custName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNo" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">Password</label>
          <input type="password" className="form-control" id="pwd" name="pwd" value={formData.pwd} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;