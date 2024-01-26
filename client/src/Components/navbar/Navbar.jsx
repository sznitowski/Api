import React from "react";
import { AppBar, Toolbar, InputBase, IconButton, Badge, Avatar } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import "./navbar.css";

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="wrapper">
        <div className="search">
          <InputBase placeholder="Search..." />
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
             /*  onClick={() => dispatch({ type: "TOGGLE" })} */
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Badge badgeContent={1} color="primary">
              <NotificationsNoneOutlinedIcon className="icon" />
            </Badge>
          </div>
          <div className="item">
            <Badge badgeContent={2} color="primary">
              <ChatBubbleOutlineOutlinedIcon className="icon" />
            </Badge>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Avatar
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
