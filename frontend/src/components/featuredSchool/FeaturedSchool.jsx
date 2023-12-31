// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featuredSchool.css";
import useFetch from "../../useFetch";
// install this to use react spinner: npm install react-loader-spinner
import { TailSpin } from "react-loader-spinner";
import { URL } from "../../App";

const FeaturedSchool = () => {
  /* below i used "fetch api" - featuredSchools represents apiData in the axios method i used finally

    const [featuredSchools, setFeaturedSchools] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchFeaturedSchools = async()=>{
            const response = await fetch('http://localhost:5000/schools/?featured=true')

            const json = await response.json() // parses response from json to valid object

            if(response.ok){
                setFeaturedSchools(json)
                setIsLoading(false)
            }
        }

        fetchFeaturedSchools()
    },[])
  
    console.log(featuredSchools)*/

  const { apiData, isLoading } = useFetch(
    `${URL}/schools/featuredSchools?featured=true`
  );
  // console.log(apiData)
  return (
    <div className="featuredSchool">
      <div className="component_text">Featured Schools</div>
      <div className="featuredSchool_list container">
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
          apiData.map((school) => (
            <div className="F_school" key={school._id}>
              <img
                // src={`${URL}/uploads/` + school.images[0]}
                src={
                  `https://res.cloudinary.com/dixtyyrsn/image/upload/` +
                  school.images[0]
                }
                alt="featuredSchool"
              />
              <div className="F_school_details">
                <p>{school.name}</p>
                <p>{school.state}</p>
                <p>{school.lga}</p>
                <Link to={`/school/${school._id}`}>
                  <button className="button">SEE DETAILS</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedSchool;
