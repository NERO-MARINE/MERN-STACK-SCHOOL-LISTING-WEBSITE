import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import PasswordResetReq from "../../components/passwordResetReq/PasswordResetReq";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEmailModal = () => {
    setOpen(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credentials)
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="LoginPage">
      <Navbar type="notHomePage" />
      <div className="formGrid">
        <form className="formContainer" onSubmit={handleClick}>
          <h1>Login</h1>
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
          <button disabled={loading}>{loading ? "Signing in, wait!": "Login"}</button>
          <div className="line"></div>
          {error && <span>{error.message}</span>}
          <Link onClick={handleEmailModal}>forgot password?</Link>
          <Link to="/register">don't have an account? register here!</Link>
          {open && (
            <div className="emailModal">
              <PasswordResetReq pswResetModal={setOpen} />
            </div>
          )}
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

export default Login;
