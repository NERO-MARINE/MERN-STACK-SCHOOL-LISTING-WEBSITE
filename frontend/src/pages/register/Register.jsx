import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        username: undefined,
        password: undefined,
    })

    const handleChange = (e)=>{
        setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}))
    }

    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/auth/register', credentials)
            //console.log(res.data) - to use this set const res = axios call
            navigate('/login')
        }

        catch(err){
            console.log(err.response.data)
            const regError =  err.response.data
            setError(regError.message)
        }
    }

  return (
    <div className="RegisterPage">
      <Navbar type="notHomePage" />
      <div className="formGrid">
        <form className="formContainer" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            required
          />
          <button>Login</button>
          <div className="line"></div>
          {/* {error && <span>{error.message}</span>} */}
          <Link to="/login">already have an account? Login here!</Link>
          {error && <p>{error}</p>}
        </form>

        <div className="formImage">
          <img
            src="./introImg.svg"
            alt="introImage"
            className="responsiveImg introImage"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
