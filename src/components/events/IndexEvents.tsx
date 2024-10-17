import { GET_EVENTS, GET_EVENT_SONGS } from "@/store/graphql/queries/events";
import { useLazyQuery, useQuery } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useCallback, useMemo, useState } from "react";
import AddEditEvents, { EventSongColection } from "./AddEditEvents.tsx";
import EventListItem, { localEventObj } from "./EventListItem.tsx";
import FilterEvent, { FilterEventsProps } from "./FilterEvents.tsx";
import ListSongsInEvent from "./ListSongsInEvent.tsx";
import SortEvent from "./SortEvents.tsx";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [openListSongInEvent, setOpenListSongInEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<localEventObj | null>(
    null,
  );
  const [eventSongsSelected, setEventSongsSelected] = useState<
    EventSongColection[]
  >([]);
  const [openSortEventDrawer, setSortEventDrawer] = useState(false);
  const [openFilterEventDrawer, setFilterEventDrawer] = useState(false);
  const [sortDate, setSortDate] = useState<string>("desc");
  const [filters, setFilters] = useState<FilterEventsProps>({
    from: null,
    to: null,
    status: true,
  });

  const LIMIT = 5;

  const toggleSortEventDrawer = (open: boolean) => () => {
    setSortEventDrawer(open);
  };

  const toggleFilterEventDrawer = (open: boolean) => () => {
    setFilterEventDrawer(open);
  };

  const setSortByDate = (sortByDate: string) => {
    setSortDate(sortByDate);
    setPage(1);
    toggleSortEventDrawer(false)();
  };

  const setFilterBy = (filters: FilterEventsProps) => {
    setFilters(filters);
    setPage(1);
    toggleFilterEventDrawer(false)();
  };

  const {
    loading,
    error,
    data: eventData,
    refetch: refetchEvents,
  } = useQuery(GET_EVENTS, {
    fetchPolicy: "network-only",
    variables: {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
      date: sortDate,
      status: filters.status,
      from: filters.from ? filters.from.toISOString() : null,
      to: filters.to ? filters.to.toISOString() : null,
    },
  });

  const [getEventSongs] = useLazyQuery(GET_EVENT_SONGS);

  const numberOfPages = useMemo(() => {
    if (!eventData || eventData.totalEvents == null) return 0;
    return Math.ceil(eventData.totalEvents?.aggregate?.count / LIMIT);
  }, [eventData]);

  const handleEventSelection = useCallback(
    async (event: localEventObj, openEditDialog: boolean) => {
      let eventSongRes = null;
      setSelectedEvent(event);
      if (event && event.id != null) {
        eventSongRes = await getEventSongs({
          fetchPolicy: "network-only",
          variables: {
            event_id: event?.id || 0,
          },
        });
        setEventSongsSelected(eventSongRes?.data?.event_songs || []);
      }
      if (openEditDialog) setOpen(true);
      else setOpenListSongInEvent(true);
    },
    [getEventSongs],
  );

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-50">Próximos Eventos</h1>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddRoundedIcon className="mr-2 h-4 w-4" />
            Crear Evento
          </button>
        </div>
        <div className="flex w-full justify-between">
          <Button
            variant="outlined"
            sx={{ width: "48%", borderColor: "white", color: "white" }}
            startIcon={<SortIcon />}
            onClick={() => toggleSortEventDrawer(true)()}
          >
            Ordenar
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "48%", borderColor: "white", color: "white" }}
            startIcon={<FilterAltIcon />}
            onClick={() => toggleFilterEventDrawer(true)()}
          >
            Filtrar
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventData?.events?.map((event: localEventObj) => (
            <EventListItem
              key={event.id}
              event={event}
              handleEventSelection={handleEventSelection}
            />
          ))}
          <Pagination
            count={numberOfPages}
            page={page}
            siblingCount={0}
            variant="outlined"
            shape="rounded"
            size="small"
            className="w-full flex items-center justify-center"
            onChange={handleChange}
            sx={{ ...(numberOfPages <= 1 && { display: "none" }) }}
          />
        </div>
        <AddEditEvents
          open={open}
          setOpen={setOpen}
          refetchEvents={refetchEvents}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          eventSongsSelected={eventSongsSelected}
          setEventSongsSelected={setEventSongsSelected}
        />
        {eventSongsSelected && selectedEvent && (
          <ListSongsInEvent
            open={openListSongInEvent}
            setOpen={setOpenListSongInEvent}
            selectedEvent={selectedEvent}
            eventSongsSelected={eventSongsSelected}
          />
        )}
      </div>
      <SortEvent
        open={openSortEventDrawer}
        sortDate={sortDate}
        toggleSortEventDrawer={toggleSortEventDrawer}
        applySortBy={setSortByDate}
      />
      <FilterEvent
        open={openFilterEventDrawer}
        toggleFilterEventDrawer={toggleFilterEventDrawer}
        filters={filters}
        applyFilterBy={setFilterBy}
      />
    </>
  );
}
