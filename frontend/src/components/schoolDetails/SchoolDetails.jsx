import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./schoolDetails.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SchoolDetails = ({ modal, apiData }) => {
  return (
    <div className="schoolDetails">
      <div className="closeBtn">
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => modal(false)} />
      </div>
      <div className="details_left flex">
        <div className="detailItem">
          <div className="label">School Name:</div>
          <div className="labelContent">{apiData.name}</div>
        </div>
        <div className="detailItem">
          <div className="label">State:</div>
          <div className="labelContent">{apiData.state}</div>
        </div>

        <div className="detailItem">
          <div className="label">City:</div>
          <div className="labelContent">{apiData.city}</div>
        </div>

        <div className="detailItem">
          <div className="label">Fee:</div>
          <div className="labelContent">{apiData.feeRange}</div>
        </div>

        <div className="detailItem">
          <div className="label">Category:</div>
          <div className="labelContent">{apiData.category}</div>
        </div>

      </div>

      

      <div className="details_right flex">
        <div className="desc">{apiData.desc}</div>
        <div className="detailItem">
          <div className="label">Email:</div>
          <div className="labelContent">{apiData.email}</div>
        </div>

        <div className="detailItem">
          <div className="label">Phone:</div>
          <div className="labelContent">{apiData.phone}</div>
        </div>

        <div className="detailItem">
          <div className="label">Google Rating</div>
          <button className="button2">{apiData.googleRating}</button>
        </div>

        <div className="detailItem">
          <div className="label">website:</div>
          <Link to={apiData.website}>
          <div className="labelContent">{apiData.website}</div>
          </Link>
        </div>

        <div className="detailItem">
          <div className="label">Google profile:</div>
          <div className="labelContent">missing in schema</div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
