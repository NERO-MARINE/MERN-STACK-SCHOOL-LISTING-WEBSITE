import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
// import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
// import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";


const Sidebar = () => {
  const { dispatch } = useContext(AuthContext)
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext)
  const navigate = useNavigate()
  // handle logout
  const handleLogout = ()=>{
    dispatch({type: 'LOGOUT'})
    navigate('/')
  }

 
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none"}}>
          <span className="logo">NSS-Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <Link to="/" style={{ textDecoration: "none" }}>
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LIST</p>
          <li>
            <GroupIcon className="icon" />
            <Link to="/users" style={{ textDecoration: "none" }}>
              <span>Users</span>
            </Link>
          </li>
          <li>
            <ProductionQuantityLimitsOutlinedIcon className="icon" />
            <Link to="/schools" style={{ textDecoration: "none" }}>
              <span>Schools</span>
            </Link>
          </li>
          {/* <li>
            <InventoryOutlinedIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingOutlinedIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <QueryStatsOutlinedIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <AndroidOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <MenuBookOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsSuggestOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <Person3OutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li style={{ position: "relative", top: "300px"}}>
            <LogoutOutlinedIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=> darkModeDispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={()=> darkModeDispatch({type: "DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;
