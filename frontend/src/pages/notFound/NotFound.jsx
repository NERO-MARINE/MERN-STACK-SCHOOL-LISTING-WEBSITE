import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./notFound.css";
const NotFound = () => {
  return (
    <div className="notFound">
      <Navbar type="notHomePage" />
      <p className="notFoundPara container">
        Ooopsss.. NotFound! We do not have this resource in our website <br />
        <Link to="/">Go back Home</Link>
      </p>

      <Footer />
    </div>
  );
};

export default NotFound;
