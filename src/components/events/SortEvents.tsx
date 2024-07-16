import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState, useEffect } from "react";

export default function SortEvents({
  open,
  sortDate,
  toggleSortEventDrawer,
  applySortBy,
}: {
  open: boolean;
  sortDate: string;
  toggleSortEventDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  applySortBy: (sortByDate: string) => void;
}) {
  const [sortByDate, setSortByDate] = useState<string>("asc");

  const handleAlignment = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSortByDate(newAlignment);
  };

  useEffect(() => {
    if (sortDate) setSortByDate(sortDate);
  }, [sortDate]);

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={toggleSortEventDrawer(false)}
      >
        <div className="self-center mt-4 mb-4" style={{ width: "95%" }}>
          <h2 className="font-black uppercase mb-4">Ordenar por:</h2>
          <h6>Fecha:</h6>
          <ToggleButtonGroup
            value={sortByDate}
            exclusive
            onChange={handleAlignment}
            aria-label="text sortByDate"
            sx={{ width: "100%" }}
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
          onClick={() => applySortBy(sortByDate)}
        >
          Aplicar Orden
        </Button>
      </Drawer>
    </>
  );
}
