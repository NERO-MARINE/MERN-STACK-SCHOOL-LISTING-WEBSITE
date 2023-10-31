import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = ({ type }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  // handle logout
  const handleLogout = ()=>{
    dispatch({type: 'LOGOUT'})
    navigate('/')
  }

  return (
    <div className={type !== "notHomePage" ? "header" : "headerNotHomePage"}>
      <div className="navbar container">
        <div className="navbar_right">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <div className="logo">NSS</div>
          </Link>
        </div>
        {user ? (
          <div className="navbar_left"> 
              <button className="button" onClick={handleLogout}>Logout</button>
            <Link to="/dashboard">
              <button className="button">List School</button>
            </Link>
          </div>
        ) : (
          <div className="navbar_left">
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
            <Link to="/register">
              <button className="button">Register</button>
            </Link>
          </div>
        )}
      </div>
      {type !== "notHomePage" && (
        <div className="intro container grid1">
          <div className="intro_text flex">
            <h1>
              LETS HELP YOU FIND THE RIGHT SCHOOL FOR YOUR CHILD NEAR YOU!
            </h1>
            <Link to="/search">
              <button className="button">Search School</button>
            </Link>
          </div>
          <img
            src="./introImg.svg"
            alt="introImage"
            className="responsiveImg introImage"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
