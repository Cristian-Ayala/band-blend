import { GET_EVENTS } from "@/store/graphql/queries/events";
import { useQuery } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import AddEditEvents from "./AddEditEvents.tsx";
import EventListItem, {localEventObj} from "./EventListItem.tsx";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const LIMIT = 5;
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
    },
  });

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Próximos Eventos
        </h1>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
          onClick={() => setOpen(true)}
        >
          <AddRoundedIcon className="mr-2 h-4 w-4" />
          Crear Evento
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventData?.events?.map((event: localEventObj) => (
          <EventListItem key={event.id} {...event} />
        ))}
        <Pagination
          count={Math.ceil(eventData.totalEvents?.aggregate?.count / LIMIT)}
          page={page}
          siblingCount={0}
          variant="outlined"
          shape="rounded"
          size="small"
          className="w-full flex items-center justify-center"
          onChange={handleChange}
        />
      </div>
      <AddEditEvents
        open={open}
        setOpen={setOpen}
        refetchEvents={refetchEvents}
      />
    </div>
  );
}
