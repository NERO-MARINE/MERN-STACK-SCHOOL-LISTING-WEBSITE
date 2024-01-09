import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ type }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const [credentials, setCredentials] = useState({
    search: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSearch = async () => {
    navigate("/random-search", { state: credentials.search });
  };

  return (
    <div className={type !== "notHomePage" ? "header" : "headerNotHomePage"}>
      <div className="container">
        <div className="navbar">
          <Link to="/" className="logo">
            NSS
          </Link>
          <div className="search">
            <input
              type="text"
              placeholder="Search School..."
              onChange={handleChange}
              id="search"
            />
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            </button>
          </div>
          <div className="menu-icon" onClick={toggleNavbar}>
            ☰
          </div>
          {user ? (
            <div className={`nav-links ${isOpen ? "open" : ""}`}>
              <p className="username">{`Welcome  ${user.username}`}</p>
              <Link to="/dashboard" onClick={closeNavbar}>
                List a School
              </Link>
              <Link to="/favoriteSchools" onClick={closeNavbar}>
                Favorites
              </Link>
              <Link to="/about" onClick={closeNavbar}>
                About Us
              </Link>
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
              <div className="close-icon" onClick={closeNavbar}>
                ✕
              </div>
            </div>
          ) : (
            <div className={`nav-links ${isOpen ? "open" : ""}`}>
              <Link to="/login" onClick={closeNavbar}>
                Login
              </Link>
              <Link to="/register" onClick={closeNavbar}>
                Register
              </Link>
              <Link to="/about" onClick={closeNavbar}>
                About Us
              </Link>
              <div className="close-icon" onClick={closeNavbar}>
                ✕
              </div>
            </div>
          )}
        </div>
      </div>
      {type !== "notHomePage" && (
        <div className="intro container grid1">
          <div className="intro_text flex">
            <h1>Welcome To Naija School Search.</h1>
            <h2>
              Search and Find The Right School/Skill Acquisition Center For Your
              Child!
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
