import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { useState } from "react";
import AddEditEvents from "./AddEditEvents.tsx";

export default function Events() {
  const [open, setOpen] = useState(false);

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
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Service 1
              </h3>
              <div className="inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full px-3 py-1 text-xs">
                Sunday
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  9:00 AM - 10:30 AM
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sanctuary
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Service 2
              </h3>
              <div className="inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full px-3 py-1 text-xs">
                Sunday
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  11:00 AM - 12:30 PM
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sanctuary
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Youth Group
              </h3>
              <div className="inline-flex w-fit items-center whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full px-3 py-1 text-xs">
                Friday
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  7:00 PM - 9:00 PM
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Youth Room
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                  <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEditEvents open={open} setOpen={setOpen} />
    </div>
  );
}
