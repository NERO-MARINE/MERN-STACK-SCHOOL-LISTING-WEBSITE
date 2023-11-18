import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    password: undefined,
    state: undefined,
    lga: undefined,
    schoolOwner: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post("/auth/register", credentials);
      //console.log(res.data) - to use this set const res = axios call
      navigate("/login");
      
    } catch (err) {
      console.log(err.response.data);
      const regError = err.response.data;
      setError(regError.message);
    } finally {
      setIsSubmitting(false); // Reset the state after submission is complete
    }
  };

  useEffect(() => {
    document.title = 'Naija School Search - Register';
  }, []);

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
          />
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            placeholder="Enter your state"
            onChange={handleChange}
          />
          <input
            type="text"
            id="lga"
            placeholder="Enter your LGA"
            onChange={handleChange}
          />

          <p>Do you own a school?</p>
          <select id="schoolOwner" onChange={handleChange}>
            <option value="">select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Your data! Wait..." : "Register"}
          </button>
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
