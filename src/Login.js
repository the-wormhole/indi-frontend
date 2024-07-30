import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import config from '../config';

const Login = ()=>{
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    setError(''); 
    try{
      const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
        mobile,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }catch(err){
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return(
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number with Country code(+91)"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="/signup"> 
        {/* style={"text-decoration:none"}> */}
          Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
