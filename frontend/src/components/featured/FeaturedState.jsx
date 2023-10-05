import useFetch from "../../useFetch";
import "./featuredState.css";
const FeaturedState = () => {
    const {apiData, isLoading} = useFetch('http://localhost:5000/schools/count/countByState/?states=Delta,Enugu,Abuja,Lagos')

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
          <h1>Are you a school owner? Help Parents Find Your School</h1>
          <button className="ownerButton">List Your School</button>
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
            <div className="desc">{isLoading ? 'loading' : apiData[0]} schools Available</div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Enugu State</div>
              <div className="number_of_LGA">25 LGAS</div>
            </div>
            <div className="desc">{isLoading ? 'loading' : apiData[1]} schools Available</div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Abuja State</div>
              <div className="number_of_LGA">25 LGAS</div>
            </div>
            <div className="desc">{isLoading ? 'loading' : apiData[2]} schools Available</div>
          </div>

          <div className="state_card flex">
            <div className="stateTitle">
              <div className="state">Lagos State</div>
              <div className="number_of_LGA">25 LGAS</div>
            </div>
            <div className="desc">{isLoading ? 'loading' : apiData[3]} schools Available</div>
          </div>
        </div>
      </div>
      <div className="featuredSchools container"></div>
    </div>
  );
};

export default FeaturedState;
