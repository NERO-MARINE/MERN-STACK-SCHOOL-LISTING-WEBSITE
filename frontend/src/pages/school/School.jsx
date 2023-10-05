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
import SchoolDetails from "../../components/schoolDetails/SchoolDetails";
import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";

const School = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleModal = (e) => {
    setOpenModal(true);
    setOpen(false) // incase the image silder is up
  };

  const location = useLocation()
  // console.log(location)
  const id = location.pathname.split('/')[2]
  // console.log(id)

  const {apiData, isLoading} = useFetch(`http://localhost:5000/schools/${id}`)

  // console.log(apiData)

  const images = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3XQqYGO_07DbEk9YU242aI0ZcCmJ1TpT2VdQhR84Xw&s",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBlF15I8_SB3vpYL-p-dOuQpCVeB-QKUkmC2oErfEEg&s",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3XQqYGO_07DbEk9YU242aI0ZcCmJ1TpT2VdQhR84Xw&s",
    },

    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBlF15I8_SB3vpYL-p-dOuQpCVeB-QKUkmC2oErfEEg&s",
    },

    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3XQqYGO_07DbEk9YU242aI0ZcCmJ1TpT2VdQhR84Xw&s",
    },

    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBlF15I8_SB3vpYL-p-dOuQpCVeB-QKUkmC2oErfEEg&s",
    },
  ];
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
              <img src={images[slideNumber].src} alt="" className="sliderImg" />
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow arrowRight"
              onClick={() => handleMove("right")}
            />
          </div>
        )}
       {isLoading ? 'Loading please wait' : apiData && <div className="schoolImageWrapper">
          {images.map((photo, i) => (
            <div className="schoolImages" key={i}>
              <img
                src={photo.src}
                alt="schoolImages"
                className="imageItem responsiveImg"
                onClick={() => handleOpen(i)}
              />
            </div>
          ))}
        </div>}
        {isLoading ? 'Loading please wait' : apiData && <button
          onClick={handleModal}
          className="button2"
          style={{ marginTop: "10px" }}
        >
          SEE DETAILS
        </button>}
        <div className="schoolDescriptionWrapper">
          {openModal && <SchoolDetails modal={setOpenModal} apiData={apiData}/>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default School;
