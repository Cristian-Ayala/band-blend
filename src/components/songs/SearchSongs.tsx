import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import SongListItem from "./SongListItem";
import SongsInPlaylist from "../songs/SongsInPlaylist";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchSongs() {
  const [showListSongs, setShowListSongs] = useState(false);

  const handleClickShowListSongs = () => setShowListSongs((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Buscador
        </Grid>
        <Grid item xs={10}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="toggle"
            onClick={handleClickShowListSongs}
            onMouseDown={handleMouseDownPassword}
          >
            <ListIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <SongListItem />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Pagination
              count={10}
              siblingCount={0}
              variant="outlined"
              shape="rounded"
              size="small"
              className="w-full flex items-center justify-center"
            />
          </Stack>
        </Grid>
      </Grid>
      <SongsInPlaylist open={showListSongs} handleClose={handleClickShowListSongs} />
    </>
  );
}
