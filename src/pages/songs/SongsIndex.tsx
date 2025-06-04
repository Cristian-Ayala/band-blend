import AddEditSong, { SongObj } from "@/components/songs/AddEditSong";
import DeleteSong from "@/components/songs/DeleteSong";
import FilterSongs, { SongsFilterProps } from "@/components/songs/FilterSongs";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "@/components/songs/SearchSongs";
import SongListItemMainStyle from "@/components/songs/SongListItemMainStyle";
import SortSongs, { SongsSortProps } from "@/components/songs/SortSongs";
import ManageSongVersions from "@/components/versions/ManageSongVersions";
import { GET_SONGS } from "@/store/graphql/queries/songs";
import { useQuery } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import React, { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SongsIndex() {
  const [open, setOpen] = useState(false);
  const [openVersionModal, setOpenVersionModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedText] = useDebounce(searchKeyword, 1000);
  const [openDeleteSongDialog, setOpenDeleteSongDialog] = useState(false);

  const [selectedSong, setSelectedSong] = useState<SongObj | null>(null);

  const handleSongSelection = useCallback(
    (song: SongObj, openEditDialog: number) => {
      setSelectedSong(song);
      if (openEditDialog === 0) setOpen(true);
      else if (openEditDialog === 1) setOpenVersionModal(true);
      else if (openEditDialog === 2) setOpenDeleteSongDialog(true);
    },
    [],
  );
  const [songSortProps, setSongSortProps] = useState<SongsSortProps>({
    timesPlayed: null,
    date: null,
    status: null,
    title: "asc",
  });

  const [filters, setfilters] = useState<SongsFilterProps>({
    genre: null,
    artist: "",
  });
  filters;
  const [openSortEventDrawer, setSortEventDrawer] = useState(false);
  const [openFilterEventDrawer, setFilterEventDrawer] = useState(false);

  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const LIMIT = 5;
  const {
    loading,
    error,
    data,
    refetch: refetchSongs,
  } = useQuery(GET_SONGS, {
    fetchPolicy: "network-only",
    variables: {
      searchKeyword: `%${debouncedText}%`,
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
      last_time_played: songSortProps.date,
      play_count: songSortProps.timesPlayed,
      title: songSortProps.title,
      artistFilter: filters.artist.trim() === "" ? null : filters.artist,
      genreFilter: filters.genre,
    },
  });

  const onChangeSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLocaleUpperCase();
      setSearchKeyword(value);
    },
    [],
  );

  const toggleSortSongDrawer = (open: boolean) => () => {
    setSortEventDrawer(open);
  };

  const setSortSongs = (filters: SongsSortProps) => {
    setSongSortProps(filters);
    setPage(1);
    toggleSortSongDrawer(false)();
  };

  const setFilterSongs = (filters: SongsFilterProps) => {
    setfilters(filters);
    setPage(1);
    toggleFilterSongDrawer(false)();
  };

  const toggleFilterSongDrawer = (open: boolean) => () => {
    setFilterEventDrawer(open);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="p-5">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-50">Canciones</h2>

              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                onClick={() => {
                  setSelectedSong(null);
                  setOpen(true);
                }}
              >
                <AddRoundedIcon className="mr-2 h-4 w-4" />
                Agregar Canción
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </div>
            <div className="flex w-full justify-between">
              <Button
                variant="outlined"
                sx={{ width: "48%", borderColor: "white", color: "white" }}
                startIcon={<SortIcon />}
                onClick={() => toggleSortSongDrawer(true)()}
              >
                Ordenar
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "48%", borderColor: "white", color: "white" }}
                startIcon={<FilterAltIcon />}
                onClick={() => toggleFilterSongDrawer(true)()}
              >
                Filtrar
              </Button>
            </div>
            <div className="grid gap-4">
              {data.songs.map((song: SongObj) => (
                <SongListItemMainStyle
                  key={song.id}
                  song={song}
                  handleSongSelection={handleSongSelection}
                />
              ))}
              <Pagination
                count={Math.ceil(data.totalSongs?.aggregate?.count / LIMIT)}
                page={page}
                siblingCount={0}
                variant="outlined"
                shape="rounded"
                size="small"
                className="w-full flex items-center justify-center"
                onChange={handleChange}
              />
              <h6 className="text-sm text-gray-400 text-center">
                {data.totalSongs?.aggregate?.count}{" "}
                {data.totalSongs?.aggregate?.count === 1
                  ? "Cancion"
                  : "Canciones"}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <AddEditSong
        open={open}
        setOpen={setOpen}
        refetchSongs={refetchSongs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
      {selectedSong && (
        <ManageSongVersions
          open={openVersionModal}
          setOpen={setOpenVersionModal}
          refetchSongs={refetchSongs}
          selectedSong={selectedSong}
        />
      )}
      {selectedSong && (
        <DeleteSong
          open={openDeleteSongDialog}
          setOpen={setOpenDeleteSongDialog}
          refetchSongs={refetchSongs}
          selectedSong={selectedSong}
        />
      )}
      <SortSongs
        open={openSortEventDrawer}
        songSortProps={songSortProps}
        toggleSortSongDrawer={toggleSortSongDrawer}
        applySortSong={setSortSongs}
      />
      <FilterSongs
        open={openFilterEventDrawer}
        toggleFilterSongDrawer={toggleFilterSongDrawer}
        filters={filters}
        applyFilterBy={setFilterSongs}
      />
    </>
  );
}
