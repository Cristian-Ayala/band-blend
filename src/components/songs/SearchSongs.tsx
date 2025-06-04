import { EventSongColection } from "@/components/events/AddEditEvents";
import { SongObj } from "@/components/songs/AddEditSong";
import { reorder } from "@/plugins/helpers";
import { DELETE_EVENT_SONG } from "@/store/graphql/mutations/events";
import { GET_SONGS } from "@/store/graphql/queries/songs";
import { useLazyQuery, useMutation } from "@apollo/client";
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
import React, { useEffect, useState } from "react";
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
  [key: number]: SongObjExtended;
}

export interface SongObjExtended extends SongObj {
  __new_song?: boolean;
  song_version_id?: number | string;
  song_version_name?: string | null;
  member_id?: number | null;
}

export default function SearchSongs({
  songsEventArray,
  eventSongsSelected,
  setSongsEventArray,
  idEvent,
}: {
  songsEventArray: SongObjExtended[];
  eventSongsSelected: EventSongColection[];
  setSongsEventArray: React.Dispatch<React.SetStateAction<SongObj[]>>;
  idEvent: number | null;
}) {
  const [showListSongs, setShowListSongs] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [songsEvent, setSongsEvent] = useState<SongsCollection>({});

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
  const [
    mutateDeleteEventSong,
    { loading: loadingDeleteEventSong, error: errorDeleteEventSong },
  ] = useMutation(DELETE_EVENT_SONG);
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

  const mutateSongCollection = (
    song: SongObj,
    songVerID?: number | string | null,
    modifyVer?: boolean,
    songVerName?: string | null,
  ) => {
    if (song.id == null) return;
    let tmpSongsEvent = { ...songsEvent };
    if (Array.isArray(songsEvent)) {
      tmpSongsEvent = songsEvent.reduce<Record<number, SongObjExtended>>(
        (acc, song: SongObjExtended) => {
          if (song != null && song.id != null) acc[song.id] = song;
          return acc;
        },
        {},
      );
    }
    const songs = {
      ...tmpSongsEvent,
    };
    if (Object.prototype.hasOwnProperty.call(songs, song.id)) {
      if (
        idEvent != null &&
        !Object.prototype.hasOwnProperty.call(songs[song.id], "__new_song") &&
        !modifyVer
      ) {
        mutateDeleteEventSong({
          variables: {
            event_id: idEvent,
            song_id: song.id,
          },
        });
      }

      if (modifyVer) {
        if (songVerID !== null) {
          songs[song.id].song_version_id = songVerID;
        }
        songs[song.id].song_version_name = songVerName;
      } else {
        delete songs[song.id];
        songsEventArray.splice(
          songsEventArray.findIndex((tmpSong) => tmpSong.id === song.id),
          1,
        );
      }
    } else {
      songs[song.id] = { ...song, __new_song: true };
      if (songVerID != null) {
        songs[song.id].song_version_id = songVerID;
        songs[song.id].song_version_name = songVerName;
      }

      songsEventArray.push({ ...songs[song.id] });
    }
    setSongsEvent(songs);
  };

  const setMemberInSong = (song: SongObjExtended, member_id: number) => {
    if (song.id == null || member_id == null) return;
    const songsEventTmp: SongObjExtended[] = JSON.parse(
      JSON.stringify(songsEventArray),
    );
    const getIdx = songsEventTmp.findIndex(
      (tmpSong: SongObjExtended) => tmpSong.id === song.id,
    );
    if (getIdx != null) songsEventTmp[getIdx].member_id = member_id;
    setSongsEvent(songsEventTmp.map((song) => song));
    setSongsEventArray(songsEventTmp);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;
    const newItems = reorder(songsEventArray, source.index, destination.index);
    setSongsEventArray(newItems);
  };

  useEffect(() => {
    // Code to run after the component is mounted
    const songs = songsEventArray.reduce<Record<number, SongObj>>(
      (acc, song: SongObj) => {
        if (song != null && song.id != null) acc[song.id] = song;
        return acc;
      },
      {},
    );
    setSongsEvent(songs);
    return () => {
      setSongsEvent({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>Error : {error.message}</p>;
  if (loadingDeleteEventSong) return <p>Loading...</p>;
  if (errorDeleteEventSong)
    return <p>Error : {errorDeleteEventSong.message}</p>;

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
        eventSongsSelected={eventSongsSelected}
        mutateSongCollection={mutateSongCollection}
        songsEvent={songsEvent}
        songsEventArray={songsEventArray}
        onDragEnd={onDragEnd}
        setMemberInSong={setMemberInSong}
      />
    </>
  );
}
