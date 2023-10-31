import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
