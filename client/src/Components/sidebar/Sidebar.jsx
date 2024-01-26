
import { Link } from "react-router-dom";
import  React, { useContext } from "react";  // Removed unnecessary import of React
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./sidebar.css";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Typography variant="h6" className="logo">valentrin</Typography>
      </div>
      <div className="center">
        <Typography variant="subtitle1" className="title">LISTS</Typography>
        <List>
          <Typography variant="subtitle1" className="title">MAIN</Typography>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Typography variant="subtitle1" className="title">LISTS</Typography>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <PersonOutlineIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                <StoreIcon className="icon" />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <CreditCardIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocalShippingIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Logistica" />
          </ListItem>
        </List>
        <Typography variant="subtitle1" className="title">USEFUL</Typography>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InsertChartIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Estadisticas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsNoneIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" />
          </ListItem>
        </List>
        <Typography variant="subtitle1" className="title">SERVICE</Typography>
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="System Health" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PsychologyOutlinedIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesion" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsApplicationsIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Configuracion" />
          </ListItem>
        </List>
        <Typography variant="subtitle1" className="title">USER</Typography>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlinedIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;