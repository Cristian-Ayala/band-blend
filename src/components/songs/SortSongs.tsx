import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState, useEffect } from "react";

export interface SongsSortProps {
  timesPlayed: string | null;
  date: string | null;
  status: string | null;
  title: string | null;
}

export default function SortEvents({
  open,
  songSortProps,
  toggleSortSongDrawer,
  applySortSong,
}: {
  open: boolean;
  songSortProps: SongsSortProps;
  toggleSortSongDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  applySortSong: (sortProps: SongsSortProps) => void;
}) {
  const [sortProp, setSort] = useState<SongsSortProps>({
    timesPlayed: null,
    date: null,
    status: null,
    title: "asc",
  });

  const handleNameSort = (
    _: React.MouseEvent<HTMLElement>,
    newSortTitle: string | null,
  ) => {
    setSort({ ...sortProp, title: newSortTitle });
  };

  const handleDateSort = (
    _: React.MouseEvent<HTMLElement>,
    newSortDate: string  | null,
  ) => {
    setSort({ ...sortProp,  date: newSortDate });
  };

  const handleTimesPlayedSort = (
    _: React.MouseEvent<HTMLElement>,
    newSortTimesPlayed: string | null,
  ) => {
    setSort({ ...sortProp, timesPlayed: newSortTimesPlayed });
  };

  useEffect(() => {
    if (songSortProps) setSort(songSortProps);
  }, [songSortProps]);

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={toggleSortSongDrawer(false)}
      >
        <div className="self-center mt-4 mb-4" style={{ width: "95%" }}>
          <h2 className="font-black uppercase mb-4">Ordenar por:</h2>
          <h6>Nombre:</h6>
          <ToggleButtonGroup
            value={sortProp.title}
            exclusive
            onChange={handleNameSort}
            aria-label="text sortByTitle"
            sx={{ width: "100%", paddingBottom: "2rem" }}
          >
            <ToggleButton
              value="asc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              ASCENDENTE
            </ToggleButton>
            <ToggleButton
              value="desc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              DESCENDENTE
            </ToggleButton>
          </ToggleButtonGroup>
          <h6>Última vez tocada:</h6>
          <ToggleButtonGroup
            value={sortProp.date}
            exclusive
            onChange={handleDateSort}
            aria-label="text sortByDate"
            sx={{ width: "100%", paddingBottom: "2rem" }}
          >
            <ToggleButton
              value="asc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              ASCENDENTE
            </ToggleButton>
            <ToggleButton
              value="desc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              DESCENDENTE
            </ToggleButton>
          </ToggleButtonGroup>
          <h6>Veces que se ha tocado:</h6>
          <ToggleButtonGroup
            value={sortProp.timesPlayed}
            exclusive
            onChange={handleTimesPlayedSort}
            aria-label="text sortByPlayedTimes"
            sx={{ width: "100%", paddingBottom: "1rem" }}
          >
            <ToggleButton
              value="asc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              ASCENDENTE
            </ToggleButton>
            <ToggleButton
              value="desc"
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              DESCENDENTE
            </ToggleButton>
          </ToggleButtonGroup>
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
          onClick={() => applySortSong(sortProp)}
        >
          Aplicar Orden
        </Button>
      </Drawer>
    </>
  );
}
