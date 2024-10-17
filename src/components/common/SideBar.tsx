import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ListIcon from "@mui/icons-material/List";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import NavLinkSideBar from "./NavLinkSideBar";

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
  const arrayOfPath = [
    {
      routeTo: "/",
      routeName: "Eventos",
      icon: ListIcon,
    },
    {
      routeTo: "/songs",
      routeName: "Canciones",
      icon: LibraryMusicIcon,
    },
    {
      routeTo: "/members",
      routeName: "Miembros",
      icon: GroupsRoundedIcon,
    },
    {
      routeTo: "/roles",
      routeName: "Roles",
      icon: QueueMusicRoundedIcon,
    },
  ];

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
        {arrayOfPath.map((path) => (
          <NavLinkSideBar key={path.routeTo} {...path} />
        ))}
      </List>
    </Drawer>
  );
}
