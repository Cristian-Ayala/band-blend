import AddEditSong, { SongObj } from "@/components/songs/AddEditSong";
import DeleteSong from "@/components/songs/DeleteSong";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "@/components/songs/SearchSongs";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import SongListItemMainStyle from "@/components/songs/SongListItemMainStyle";
import { GET_SONGS } from "@/store/graphql/queries/songs";
import { useQuery } from "@apollo/client";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SongsIndex() {
  const [open, setOpen] = useState(false);
  const [openDeleteSongDialog, setOpenDeleteSongDialog] = useState(false);

  const [selectedSong, setSelectedSong] = useState<SongObj | null>(null);

  const handleSongSelection = (song: SongObj, openEditDialog: boolean) => {
    setSelectedSong(song);
    if (openEditDialog) setOpen(true);
    else setOpenDeleteSongDialog(true);
  };

  const {
    loading,
    error,
    data,
    refetch: refetchSongs,
  } = useQuery(GET_SONGS, {
    fetchPolicy: "network-only",
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <div className="p-5">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                Canciones
              </h2>

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
                />
              </Search>
            </div>
            <div className="grid gap-4">
              {data.songs.map((song: SongObj) => (
                <SongListItemMainStyle
                  key={song.id}
                  song={song}
                  handleSongSelection={handleSongSelection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddEditSong
        open={open}
        setOpen={setOpen}
        refetchSongs={refetchSongs}
        selectedSong={selectedSong}
      />
      {selectedSong && (
        <DeleteSong
          open={openDeleteSongDialog}
          setOpen={setOpenDeleteSongDialog}
          refetchSongs={refetchSongs}
          selectedSong={selectedSong}
        />
      )}
    </>
  );
}
