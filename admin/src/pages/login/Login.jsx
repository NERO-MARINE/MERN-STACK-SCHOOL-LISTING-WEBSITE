import { Link, useNavigate } from "react-router-dom";
// import Footer from "../../components/footer/Footer";
// import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import axios from "axios";
import { URL } from "../../App";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credentials)
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${URL}/auth/login`, credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
        // console.log(res.data)
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "you are not allowed" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="LoginPage">
      {/* <Navbar/> */}
      <div className="formGrid">
        <form className="formContainer" onSubmit={handleClick}>
          <h1>Admin Login</h1>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
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
          <button disabled={loading}>Login</button>
          <div className="line"></div>
          {error && <span>{error.message}</span>}
          <Link href="#">forgot password?</Link>
        </form>

        <div className="formImage">
          <img
            src="./introImg.svg"
            alt="introImage"
            className="responsiveImg introImage"
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
