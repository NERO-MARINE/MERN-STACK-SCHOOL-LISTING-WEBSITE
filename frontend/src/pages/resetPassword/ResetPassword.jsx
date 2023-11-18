import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './resetPassword.css'
import Navbar from '../../components/navbar/Navbar';

function ResetPassword() {
//   const [token, setToken] = useState('');
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

//   const handleTokenChange = (e) => {
//     setToken(e.target.value);
//   };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/account/reset-password', { token, password });

      if (response.status === 200) {
        setMessage('Password reset is successful');
      } else {
        setMessage('Failed to reset password');
      }
    } catch (err) {
      // console.error(err.response.data);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    document.title = 'Naija School Search - Reset-Password';
  }, []);

  return (
    <div className="passwordReset">
      <Navbar type="notHomePage" />
      <form onSubmit={handleResetPassword} className='pswResetForm container'>
      <h2>Reset Password</h2>
      <input type="hidden" placeholder="Enter your token" value={token} readOnly/>
      <input type="password" placeholder="Enter your new password" value={password} onChange={handlePasswordChange}  required/>
      <button>Reset Password</button>
      <p>{message}</p>
    </form>
    </div>
   
  );
}

export default ResetPassword;