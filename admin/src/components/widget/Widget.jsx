import "./widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";


const Widget = ({ type, allSchools, numUser, numApprovedSchools, numFeaturedSchools}) => { 

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "see all users",
        figure: numUser.length,
        icon: (
          <Person3OutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2" }}
          />
        ),
      };
      break;
    case "school":
      data = {
        title: "ALL SCHOOLS",
        isMoney: false,
        link: "see all schools",
        figure: allSchools.length,
        icon: <ShoppingCartOutlinedIcon className="icon" style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2" }}/>
      };
      break;
    case "approved":
      data = {
        title: "APPROVED SCHOOLS",
        isMoney: false,
        link: "see details",
        figure: numApprovedSchools.length,
        icon: <MonetizationOnOutlinedIcon className="icon" style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2" }}/>
      };
      break;
    case "featured":
      data = {
        title: "FEATURED SCHOOLS",
        isMoney: false,
        link: "see details",
        figure: numFeaturedSchools.length,
        icon: <AccountBalanceWalletOutlinedIcon className="icon" style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2" }}/>
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.figure}
        </span>
        <Link to="/" style={{textDecoration: "none", color: "lightgray"}}>
        <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          NSS
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
