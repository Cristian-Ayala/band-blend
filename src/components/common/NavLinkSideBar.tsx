import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material"; // for proper typing

interface SideBarProps {
  routeTo: string;
  routeName: string;
  icon: SvgIconComponent;
}

export default function SideBar({
  routeTo,
  routeName,
  icon: Icon,
}: SideBarProps) {

  return (
    <NavLink
      to={routeTo}
      className={({ isActive }) =>
        `flex items-center gap-2 font-semibold text-gray-50 hover:text-white transition-all duration-500 ease-in-out ${
          isActive ? "activeLink" : ""
        }`
      }
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={routeName} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}
