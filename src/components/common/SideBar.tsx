import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ListIcon from "@mui/icons-material/List";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface SideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export default function SideBar({ open, handleDrawerClose }: SideBarProps) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold text-gray-900 text-gray-50 hover:text-white transition-all duration-500 ease-in-out ${
              isActive ? "activeLink" : ""
            }`
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Eventos" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          to="/songs"
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold text-gray-50 hover:text-white transition-all duration-500 ease-in-out ${
              isActive ? "activeLink" : ""
            }`
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Canciones" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </Drawer>
  );
}
