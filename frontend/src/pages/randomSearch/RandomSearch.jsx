import "./randomSearch.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// install this to use react spinner: npm install react-loader-spinner
import { TailSpin } from "react-loader-spinner";
import { URL } from "../../App";

const RandomSearch = () => {
  const location = useLocation();
  let searchTexts = location.state;
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(searchTexts);
  useEffect(() => {
    // Define an asynchronous function
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${URL}/schools/random-search/${searchTexts}`
        );
        setApiData(response.data);
        setError("");
        // console.log(response.data)
      } catch (error) {
        // console.error("Error fetching data:", error.response.data);
        setError(error.response.data);
        setApiData("");
      } finally {
        setIsLoading(false);
      }
    };

    // Invoke the asynchronous function
    fetchData();
    document.title = "Naija School Search - Search Results";
  }, [searchTexts]);

  return (
    <div className="randomSearch">
      <Navbar type="notHomePage" />
      <div className="randomResults container">
        <h4>Random Search Results</h4>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <TailSpin color="green" height={80} width={80} />
            {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
          </div>
        ) : (
          apiData &&
          apiData.map((favSchool) => (
            <div className="schoolShowCase" key={favSchool._id}>
              <div className="photo flex">
                <div className="label">Premises:</div>
                <img
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                  // src={`${URL}/uploads/` + favSchool.images[0]}
                  src={
                    `https://res.cloudinary.com/dixtyyrsn/image/upload/` +
                    favSchool.images[0]
                  }
                  alt={favSchool.name}
                />
              </div>
              <div className="schoolName flex">
                <div className="label">School Name</div>
                <div className="name">{favSchool.name}</div>

                {favSchool.googleProfile === "undefined" ? (
                  <button className="button rating">Google Rating N/A</button>
                ) : (
                  <button className="button rating">
                    {favSchool.googleRating} Google Rating
                  </button>
                )}
              </div>
              <div className="schoolName flex">
                <div className="label">City/Town/community</div>
                <div className="name">{favSchool.city}</div>
              </div>
              <div className="feeRange flex">
                <div className="label">Fee Range</div>
                <div className="fee">{favSchool.feeRange} per session</div>
                <Link to={`/school/${favSchool._id}`}>
                  <button className="button detailsBtn">View Details</button>
                </Link>
              </div>
            </div>
          ))
        )}

        {error && (
          <div className="notFoundDiv">
            <img
              src="searchNotFound.svg"
              alt="error image"
              width={200}
              height={100}
              className="responsiveImg"
            />
            <p className="errorPara">{error && error.message}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RandomSearch;
