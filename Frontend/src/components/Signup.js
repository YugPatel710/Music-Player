import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';
import logo from '../assets/spotify-logo.png';
import { signup } from '../services/auth';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email.includes('@')) return setMessage('Invalid email address.');
    if (password.length < 6) return setMessage('Password must be 6+ characters.');
    if (password !== confirmPassword) return setMessage('Passwords do not match.');

    setIsLoading(true);
    setMessage('');
    try {
      await signup(email, password);
      navigate('/');
    } catch (error) {
      setMessage(error.message || 'Sign up failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {message && <p className="error">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;