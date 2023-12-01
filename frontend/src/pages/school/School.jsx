import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./school.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";
// install this to use react spinner: npm install react-loader-spinner
import { TailSpin } from "react-loader-spinner";
// for recaptcha
import ReCAPTCHA from "react-google-recaptcha";

const School = () => {
  // for recaptcha
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  // for recaptcha
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
    // console.log(i); this is the index number of each image becos it is the second parameter in the array(map) iteration method i.e value, index, array
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const location = useLocation();
  // console.log(location)
  const id = location.pathname.split("/")[2];
  // console.log(id)

  const { apiData, isLoading } = useFetch(`/schools/${id}`);

  const images = apiData.images;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [credentials, setCredentials] = useState({
    name: undefined,
    phone: undefined,
    message: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verify reCAPTCHA on the client-side
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      setIsSubmitting(true);

      // for recaptcha: to send the form data and recaptcha value to the server for verification. This was done in the schoolsController.js for sendSchool message route
      const sendEmailData = {
        ...credentials,
        recaptchaValue: recaptchaValue,
      };

      await axios.post(
        `/schools/contact/school/${apiData.email}/${apiData.name}`,
        sendEmailData
      );
      alert(`Message Sent Sucessfully to ${apiData.name}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const encodedAddress = encodeURIComponent(apiData.address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // open school address on google map
  const openGoogleMaps = () => {
    window.open(googleMapsUrl, "_blank");
  };
  // console.log('Google Maps URL:', googleMapsUrl);

  // open school website
  const schoolWebsite = apiData.website;
  const openSchoolWebsite = () => {
    window.open(schoolWebsite, "_blank");
  };

  // open school google-profile
  const schoolGoogleProfile = apiData.googleProfile;
  const openSchoolGoogleProfile = () => {
    window.open(schoolGoogleProfile, "_blank");
  };

  useEffect(() => {
    document.title = `Naija School Search - ${apiData.name}`;
  }, [apiData.name]);

  return (
    <div className="school">
      <Navbar type="notHomePage" />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        DETAILS OF {apiData.name}
      </h1>
      <div className="schoolWrapper container">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />

            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow arrowLeft"
              onClick={() => handleMove("left")}
            />

            <div className="sliderWrapper">
              <img
                src={images && "/uploads/" + images[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow arrowRight"
              onClick={() => handleMove("right")}
            />
          </div>
        )}
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <TailSpin color="green" height={70} width={70} />
            {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
          </div>
        ) : (
          apiData && (
            <div className="schoolImageWrapper">
              {images &&
                images.map((photo, i) => (
                  <div className="schoolImages" key={i}>
                    <img
                      src={`/uploads/${photo}`}
                      alt="schoolImages"
                      className="imageItem responsiveImg"
                      onClick={() => handleOpen(i)}
                    />
                  </div>
                ))}
            </div>
          )
        )}

        <div className="schoolInfo">
          <ul>
            <li>
              School Name: <h2>{apiData.name}</h2>{" "}
            </li>
            <li>State: {apiData.state}</li>
            <li>L.G.A: {apiData.lga}</li>
            <li>City: {apiData.city}</li>
            <li>Catgory: {apiData.category}</li>
            <li>Email Address: {apiData.email}</li>
            <li>Phone: {apiData.phone}</li>
            <li onClick={openGoogleMaps}>
              School Address: <b style={{ color: "red" }}>{apiData.address}</b>{" "}
              <br></br> Click to View on google maps
            </li>
            {apiData.website === "undefined" ? (
              <li>Website: Not Available</li>
            ) : (
              <li>
                School Website:{" "}
                <b style={{ color: "red" }} onClick={openSchoolWebsite}>
                  {apiData.website}
                </b>
              </li>
            )}
            {apiData.googleProfile === "undefined" ? (
              <li>School Google Profile: Not Available</li>
            ) : (
              <li>
                School Google Profile:{" "}
                <b style={{ color: "red" }} onClick={openSchoolGoogleProfile}>
                  {apiData.googleProfile}
                </b>
              </li>
            )}
            <li>Fee Range per session: {apiData.feeRange}</li>
            <li>Description: {apiData.desc}</li>
          </ul>
        </div>

        <div className="messageSchool">
          <h1>Leave A Message For {apiData.name}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Enter Your name"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              id="phone"
              placeholder="Enter Your Phone"
              required
              onChange={handleChange}
            />
            <textarea
              placeholder={"Leave a message for " + apiData.name}
              id="message"
              required
              onChange={handleChange}
            ></textarea>
            <ReCAPTCHA
              sitekey="6LdePyIpAAAAAHxvjU8W1YD3Toff8uvvLpp4YrHc"
              onChange={handleRecaptchaChange}
            />
            <button>
              {isSubmitting ? "sending message. Wait!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default School;
