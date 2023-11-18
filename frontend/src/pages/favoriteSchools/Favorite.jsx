import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./favorite.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../useFetch";
const Favorite = () => {
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const { apiData, isLoading, error } = useFetch(
    `/schools/favorite/Schools/${userId}`
  );

  //   console.log(apiData)

  useEffect(() => {
    document.title = "Naija School Search - Favorite Schools";
  }, []);

  return (
    <div className="favorite">
      <Navbar type="notHomePage" />

      <div className="favSchools container">
        <h1>Favourite Schools</h1>
        {isLoading
          ? "Loading please wait"
          : apiData &&
            apiData.map((favSchool) => (
              <div className="schoolShowCase" key={favSchool._id}>
                <div className="photo flex">
                  <div className="label">Premises:</div>
                  <img
                    width="100%"
                    height="120px"
                    style={{ objectFit: "cover" }}
                    src={"/uploads/" + favSchool.images[0]}
                    alt={favSchool.name}
                  />
                </div>
                <div className="schoolName flex">
                  <div className="label">School Name</div>
                  <div className="name">{favSchool.name}</div>
                  <button className="button rating">
                    {favSchool.googleRating} Google Rating
                  </button>
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
            ))}

        <h2>{error && error.message}</h2>
      </div>

      <Footer />
    </div>
  );
};

export default Favorite;
