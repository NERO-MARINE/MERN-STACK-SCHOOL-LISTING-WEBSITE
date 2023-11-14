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
            <p className="username">
              Welcome {user.username}
            </p>
            <Link to="/dashboard">
              List a School
            </Link>
            <Link to="/favoriteSchools">
              Favorites
            </Link>
            <button className="button" onClick={handleLogout}>Logout</button>
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
              Welcome To Naija School Search.
            </h1>
            <h2>
            Search and Find The Right School For Your Child!
            </h2>
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
