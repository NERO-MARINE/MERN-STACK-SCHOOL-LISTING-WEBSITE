import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import "./featuredState.css";
// install this to use react spinner: npm install react-loader-spinner
import { TailSpin } from "react-loader-spinner";
import { URL } from "../../App";

const FeaturedState = () => {
  const { apiData, isLoading } = useFetch(
    `${URL}/schools/count/countByState/?states=Delta,Enugu,Abuja,Lagos`
  );

  // console.log(apiData)
  return (
    <div className="featured">
      <div className="owner container grid1">
        <img
          src="./ownerImg.svg"
          alt="introImage"
          className="responsiveImg ownerImage"
        />
        <div className="owner_text flex">
          <h1>
            Are you a school owner? Do you have any skill aquisition school?{" "}
            <span id="parents">Help Parents</span> Find Your School
          </h1>
          <button className="ownerButton">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              List Your School
            </Link>
          </button>
          <h2 style={{ marginTop: "15px" }}>Steps to List Your School</h2>
          <ul className="listing-steps">
            <li>
              {" "}
              <Link to="/register">Register</Link> with us and{" "}
              <Link to="/login">Login</Link> into your account{" "}
            </li>
            <li>
              Click on <Link to="/dashboard">List a school</Link> to go to your
              dashboard
            </li>
            <li>
              Fill out your school details correctly and upload six quality
              photos of your school!
            </li>
            <li>
              Your School will be visible in searches for our users after it has
              been approved
            </li>
            <li>
              You can see the approval status of your listed school in your{" "}
              <q>
                <Link to="/dashboard">Dashboard</Link>
              </q>
            </li>
            <li>
              If for example you have a Nusersy, primary and a secondary school,
              please list them seperately under the correct category.
            </li>
            <li>
              You can edit the details of your school at anytime. You can also
              unlist your school by deleting it.
            </li>
            <li>
              Deleting your school removes it completely from our database.
            </li>
            <li>
              For any diffculty you can reach out to us on our whatsapp number:{" "}
              <span id="whatsapp">+2347056961743</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="featuredStates container">
        <div className="component_text">Featured States</div>
        <div className="state_cards">
          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Delta State</div>
              <div className="number_of_LGA">25 LGAS</div>
            </div>
            <div className="desc">
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <TailSpin color="green" height={25} width={25} />
                  {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
                </div>
              ) : (
                apiData[0]
              )}{" "}
              schools Available
            </div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Enugu State</div>
              <div className="number_of_LGA">17 LGAS</div>
            </div>
            <div className="desc">
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <TailSpin color="green" height={25} width={25} />
                  {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
                </div>
              ) : (
                apiData[1]
              )}{" "}
              schools Available
            </div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Abuja FCT</div>
              <div className="number_of_LGA">6 LGAS</div>
            </div>
            <div className="desc">
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <TailSpin color="green" height={25} width={25} />
                  {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
                </div>
              ) : (
                apiData[2]
              )}{" "}
              schools Available
            </div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Lagos State</div>
              <div className="number_of_LGA">20 LGAS</div>
            </div>
            <div className="desc">
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <TailSpin color="green" height={25} width={25} />
                  {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
                </div>
              ) : (
                apiData[3]
              )}{" "}
              schools Available
            </div>
          </div>
        </div>
      </div>
      <div className="featuredSchools container"></div>
    </div>
  );
};

export default FeaturedState;
