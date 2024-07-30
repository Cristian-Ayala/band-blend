import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import { GET_ARTISTS } from "@/store/graphql/queries/songs";
import { useQuery } from "@apollo/client";

export interface SongsFilterProps {
  genre: number | null;
  artist: string;
}

interface ArtistInterface {
  artist: string;
  id: number;
}

export default function FilterEvents({
  open,
  filters,
  toggleFilterSongDrawer,
  applyFilterBy,
}: {
  open: boolean;
  filters: SongsFilterProps;
  toggleFilterSongDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  applyFilterBy: (filterBy: SongsFilterProps) => void;
}) {
  const [filterBy, setFilterBy] = useState<SongsFilterProps>({
    genre: null,
    artist: "",
  });

  const [songArtist, setSongArtist] = useState(null);

  const handleGenre = (
    _: React.MouseEvent<HTMLElement>,
    genre: number | null,
  ) => {
    setFilterBy({
      ...filterBy,
      genre,
    });
  };

  const { data } = useQuery(GET_ARTISTS);

  useEffect(() => {
    if (filters) setFilterBy(filters);
  }, [filters]);

  useEffect(() => {
    if (data == null || data.songs == null || !Array.isArray(data.songs))
      return;
    setSongArtist(data.songs.map((artist: ArtistInterface) => artist.artist));
  }, [data]);

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={toggleFilterSongDrawer(false)}
      >
        <div className="self-center mt-4 mb-4" style={{ width: "95%" }}>
          <h2 className="font-black uppercase mb-4">Filtrar por:</h2>
          <h6>Género:</h6>
          <ToggleButtonGroup
            value={filterBy.genre}
            exclusive
            onChange={handleGenre}
            aria-label="text filterBy"
            sx={{ width: "100%", paddingBottom: "2rem" }}
          >
            <ToggleButton value={0} aria-label="centered" sx={{ width: "98%" }}>
              JÚBILO
            </ToggleButton>
            <ToggleButton value={1} aria-label="centered" sx={{ width: "98%" }}>
              ADORACIÓN
            </ToggleButton>
          </ToggleButtonGroup>
          {songArtist && (
            <Autocomplete
              value={filterBy.artist}
              disablePortal
              isOptionEqualToValue={(option, value) => option?.valueOf === value?.valueOf}
              id="filterBy.artist"
              autoHighlight
              getOptionLabel={(option: string) => option || ""}
              options={songArtist}
              onChange={(_, newValue: string | null) => {
                setFilterBy({
                  ...filterBy,
                  artist: newValue || "",
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Artistas" />
              )}
            />
          )}
        </div>
        <Button
          variant="outlined"
          sx={{
            width: "95%",
            borderColor: "white",
            color: "white",
            alignSelf: "center",
            marginBottom: "1rem",
          }}
          onClick={() => applyFilterBy(filterBy)}
        >
          Aplicar Filtro
        </Button>
      </Drawer>
    </>
  );
}
