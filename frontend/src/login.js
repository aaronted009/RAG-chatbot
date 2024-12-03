import React, { useState } from 'react';
import './Login.css';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [isActive , setisActive] = useState(false);

  const handleClose = () => {
    document.getElementById("connexionForm").classList.remove("show");
    document.getElementById("connexionForm").classList.add("hidden");
    //setisActive(false);
    
  }
  


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }

    // Simulate a login attempt (replace with actual login logic)
    if (username === 'admin' && password === 'password123') {
      alert('Login successful');
      // Redirect to another page or set up authentication logic
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <a className='close' onClick={handleClose}> <i className="fi fi-rr-close"></i> X </a>
      <h2>Login</h2>
      <form onSubmit={handleSubmitLogin}>
        <div>
          
          <input
          placeholder="Nom d'utilisateur"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
           
          <input
           placeholder="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
