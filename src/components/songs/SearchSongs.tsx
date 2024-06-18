import { SongObj } from "@/components/songs/AddEditSong";
import { reorder } from "@/plugins/helpers";
import { GET_SONGS } from "@/store/graphql/queries/songs";
import { useLazyQuery } from "@apollo/client";
import { DropResult } from "@hello-pangea/dnd";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import { Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SongsInPlaylist from "../songs/SongsInPlaylist";
import SongListItem from "./SongListItem";

export const Search = styled("div")(({ theme }) => ({
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

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export interface SongsCollection {
  [key: number]: SongObj;
}

export default function SearchSongs() {
  const [showListSongs, setShowListSongs] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [songsEvent, setSongsEvent] = useState<SongsCollection>({});
  const [songsEventArray, setSongsEventArray] = useState<SongObj[]>([]);

  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const LIMIT = 5;
  const [getSong, { loading, error, data }] = useLazyQuery(GET_SONGS, {
    fetchPolicy: "network-only",
    variables: {
      searchKeyword: `%${searchKeyword}%`,
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });

  const debouncedGetSong = useDebouncedCallback(() => {
    getSong();
  }, 1000);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleUpperCase();
    setSearchKeyword(value);
    debouncedGetSong();
  };
  const handleClickShowListSongs = () => setShowListSongs((show) => !show);
  const handlePreventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const mutateSongCollection = (song: SongObj) => {
    if (song.id == null) return;
    const songs = {
      ...songsEvent,
    };
    if (Object.prototype.hasOwnProperty.call(songs, song.id)) {
      delete songs[song.id];
      songsEventArray.splice(songsEventArray.findIndex(tmpSong => tmpSong.id === song.id), 1);
    } else {
      songs[song.id] = song;
      songsEventArray.push(song);
    }
    setSongsEvent(songs);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;
    const newItems = reorder(songsEventArray, source.index, destination.index);
    setSongsEventArray(newItems);
  };

  if (error) return <p>Error : {error.message}</p>;

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
              placeholder="Buscar Canciones"
              inputProps={{ "aria-label": "search" }}
              value={searchKeyword}
              onChange={onChangeSearchInput}
            />
          </Search>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="toggle"
            onClick={handleClickShowListSongs}
            onMouseDown={handlePreventDefault}
            disabled={songsEvent == null || Object.keys(songsEvent).length == 0}
          >
            <ListIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {loading || !data ? (
            <div className="w-full flex flex-col items-center justify-center">
              <Icon component={LibraryMusicIcon} sx={{ fontSize: 60 }} />
              {loading ? <h6>Buscando Canción</h6> : <h6>Busca una Canción</h6>}
            </div>
          ) : (
            data.songs.map((song: SongObj) => (
              <SongListItem
                key={song.id}
                song={song}
                songsEvent={songsEvent}
                mutateSongCollection={mutateSongCollection}
              />
            ))
          )}
        </Grid>
        {data && data.totalSongs && data.totalSongs.aggregate.count > LIMIT ? (
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(data.totalSongs.aggregate.count / LIMIT)}
                page={page}
                siblingCount={0}
                variant="outlined"
                shape="rounded"
                size="small"
                className="w-full flex items-center justify-center"
                onChange={handleChange}
              />
            </Stack>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <SongsInPlaylist
        open={showListSongs}
        handleClose={handleClickShowListSongs}
        mutateSongCollection={mutateSongCollection}
        songsEvent={songsEvent}
        songsEventArray={songsEventArray}
        onDragEnd={onDragEnd}
      />
    </>
  );
}
