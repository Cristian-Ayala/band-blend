import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Dayjs } from "dayjs";
import "dayjs/locale/es";
import React, { useEffect, useState } from "react";

export interface FilterEventsProps {
  from: Dayjs | null;
  to: Dayjs | null;
  status: boolean | null;
}

export default function FilterEvents({
  open,
  filters,
  toggleFilterEventDrawer,
  applyFilterBy,
}: {
  open: boolean;
  filters: FilterEventsProps;
  toggleFilterEventDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  applyFilterBy: (filterBy: FilterEventsProps) => void;
}) {
  const [filterBy, setFilterBy] = useState<FilterEventsProps>({
    from: null,
    to: null,
    status: true,
  });

  const handleStatus = (_: React.MouseEvent<HTMLElement>, status: boolean) => {
    setFilterBy({ ...filterBy, status });
  };

  useEffect(() => {
    if (filters) setFilterBy(filters);
  }, [filters]);

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={toggleFilterEventDrawer(false)}
      >
        <div className="self-center mt-4 mb-4" style={{ width: "95%" }}>
          <h2 className="font-black uppercase mb-4">Filtrar por:</h2>
          <h6>Estado del evento:</h6>
          <ToggleButtonGroup
            value={filterBy.status}
            exclusive
            onChange={handleStatus}
            aria-label="text filterBy"
            sx={{ width: "100%", paddingBottom: "2rem" }}
          >
            <ToggleButton
              value={true}
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              ACTIVOS
            </ToggleButton>
            <ToggleButton
              value={false}
              aria-label="centered"
              sx={{ width: "98%" }}
            >
              CERRADOS
            </ToggleButton>
          </ToggleButtonGroup>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="es"
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <MobileDatePicker
              label="Desde"
              value={filterBy.from}
              format="DD/MM/YYYY"
              onChange={(newValue) =>
                setFilterBy({ ...filterBy, from: newValue })
              }
              className="w-full mb-10"
              slotProps={{
                actionBar: {
                  actions: ["clear", "cancel", "accept"],
                },
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="es"
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <MobileDatePicker
              label="Hasta"
              value={filterBy.to}
              format="DD/MM/YYYY"
              onChange={(newValue) =>
                setFilterBy({ ...filterBy, to: newValue })
              }
              className="w-full"
              slotProps={{
                actionBar: {
                  actions: ["clear", "cancel", "accept"],
                },
              }}
              sx={{ marginBottom: "1rem", marginTop: "2rem" }}
            />
          </LocalizationProvider>
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
