import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./school.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../useFetch";
import { Link, useLocation } from "react-router-dom";

const School = () => {
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

  const location = useLocation()
  // console.log(location)
  const id = location.pathname.split('/')[2]
  // console.log(id)

  const {apiData, isLoading} = useFetch(`http://localhost:5000/schools/${id}`)

  // console.log(apiData)

  // <img key={index} src={`/uploads/${image}`} />

  const images = apiData.images
  // console.log(images && images[0])

  return (
    <div className="school">
      <Navbar type="notHomePage" />
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
              <img src={images && 'http://localhost:5000/uploads/' + images[slideNumber]} alt="" className="sliderImg" />
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow arrowRight"
              onClick={() => handleMove("right")}
            />
          </div>
        )}
       {isLoading ? 'Loading please wait' : apiData && <div className="schoolImageWrapper">
          {images && images.map((photo, i) => (
            <div className="schoolImages" key={i}>
              <img
                src={`http://localhost:5000/uploads/${photo}`}
                alt="schoolImages"
                className="imageItem responsiveImg"
                onClick={() => handleOpen(i)}
              />
            </div>
          ))}
        </div>}

        <div className="schoolInfo">
          <ul>
            <li>School Name: <h2>{apiData.name}</h2> </li>
            <li>State: {apiData.state}</li>
            <li>L.G.A: {apiData.lga}</li>
            <li>City: {apiData.city}</li>
            <li>Email Address: {apiData.email}</li>
            <li>Phone: {apiData.phone}</li>
            <li>School Address: {apiData.address}</li>
            <li>School Website: <Link to={apiData.website}>{apiData.website}</Link></li>
            <li>School Google Profile: <Link to={apiData.googleProfile}>{apiData.googleProfile}</Link></li>
            <li>Fee Range per session: {apiData.feeRange}</li>
            <li>Description: {apiData.desc}</li>
            
          </ul>
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default School;
