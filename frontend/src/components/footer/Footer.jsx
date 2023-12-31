import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_content container">
        <FontAwesomeIcon icon={faFaceLaugh} />
        All Rights Reserved, &copy; Naija School Search 2023
        <br />
        <p>
          <em>comingsoon@support.com | +234000000000</em>
        </p>
      </div>
      <div className="P-policy">
        <Link to="/privacy-policy">See Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
