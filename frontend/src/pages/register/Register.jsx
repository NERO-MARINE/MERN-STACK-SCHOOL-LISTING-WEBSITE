import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";
import { useEffect, useState } from "react";
import axios from "axios";
// for recaptcha
import ReCAPTCHA from "react-google-recaptcha";
import { URL } from "../../App";

const Register = () => {
  // for recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  // for recaptcha
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    password: undefined,
    state: undefined,
    lga: undefined,
    schoolOwner: undefined,
    hearAboutUs: undefined,
    agreedToTerms: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verify reCAPTCHA on the client-side
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // for recaptcha: to send the form data and recaptcha value to the server for verification. This was done in the authController.js for register route

      const registrationData = {
        ...credentials,
        recaptchaValue: recaptchaValue,
      };

      await axios.post(`${URL}/auth/register`, registrationData);
      //console.log(res.data) - to use this set const res = axios call
      alert("Registration is Successful. An Email has been sent you.");
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
    document.title = "Naija School Search - Register";
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

          <p>How did you hear about us?</p>
          <select id="hearAboutUs" onChange={handleChange}>
            <option value="">select option</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="google">Google</option>
            <option value="family and friends">Family and friends</option>
            <option value="others">Others</option>
          </select>

          <div id="terms">
            <input type="checkbox" required />
            <label htmlFor="agreedToTerms">
              I Agree to{" "}
              <Link to="/terms-and-conditions">Terms and Condition</Link>
            </label>
          </div>

          <ReCAPTCHA
            sitekey="6LdePyIpAAAAAHxvjU8W1YD3Toff8uvvLpp4YrHc"
            onChange={handleRecaptchaChange}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Your data! Wait..." : "Register"}
          </button>
          <div className="line"></div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* {error && <span>{error.message}</span>} */}
          <Link to="/login">already have an account? Login here!</Link>
        </form>

        <div className="formImage">
          <img
            src="./introImg.svg"
            alt="introImage"
            className="responsiveImg introImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
