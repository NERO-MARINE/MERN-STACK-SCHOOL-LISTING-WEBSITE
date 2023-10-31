import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import SalesList from "../../components/table/Table"

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone</span>
                  <span className="itemValue">+123 3565 47</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address</span>
                  <span className="itemValue">
                    1 Eka st. Oleh, off police road
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country</span>
                  <span className="itemValue">Nigeria</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title= "user spending (last 6 months)"/>
          </div>
        </div>
        <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            {/* FROM table component. we called this component SalesList */}
            <SalesList/>
        </div>
      </div>
    </div>
  );
};

export default Single;
