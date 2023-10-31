import { useState } from "react";
import axios from 'axios';
import './passwordResetReq.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PasswordResetReq = ({pswResetModal}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [msg, setMsg] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleRequestReset = async () => {
      try {
        const response = await axios.post('http://localhost:5000/account/request-reset', { email });
  
        if (response.status === 200) {
          setMessage('Reset link has been sent to your email.');
          setMsg('');
        } else {
          setMessage('Failed to send reset email');
        }
      } catch (err) {
        console.log(err.response.data);
        setMsg(err.response.data.message);
        setMessage('');
      }
    };
  
    return (
      <div className="flex">
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => pswResetModal(false)} className="closeBtn" />
        <h4>Request Password Reset</h4>
        <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
        <Link onClick={handleRequestReset} className="emailResetLink">Request Reset</Link>
        <p className="success">{message}</p>
        <p className="error">{msg}</p>
      </div>
    );
}
 
export default PasswordResetReq;