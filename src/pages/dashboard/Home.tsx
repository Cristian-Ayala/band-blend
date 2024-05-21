import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Events from "@/components/events/IndexEvents.tsx";

export default function Home() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Events />
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Servicio 1 Canciones
            </h2>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              <AddRoundedIcon className="mr-2 h-4 w-4" />
              Add Song
            </button>
          </div>
          <div className="grid gap-4">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="p-6 grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      Amazing Grace
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      John Newton
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      role="combobox"
                      aria-controls="radix-:R3dllafnnja:"
                      aria-expanded="false"
                      aria-autocomplete="none"
                      dir="ltr"
                      data-state="closed"
                      data-placeholder=""
                      className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[80px]"
                    >
                      <span style={{ pointerEvents: "none" }}>Key</span>
                      <KeyboardArrowDownRoundedIcon className="h-4 w-4" />
                    </button>
                    <select
                      aria-hidden="true"
                      tabIndex={-1}
                      style={{
                        position: "absolute",
                        border: "0",
                        width: "1px",
                        height: "1px",
                        padding: "0",
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        wordWrap: "normal",
                      }}
                    >
                      <option value=""></option>
                    </select>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <DeleteRoundedIcon className="h-4 w-4" />
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
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      10,000 Reasons
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Matt Redman
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      role="combobox"
                      aria-controls="radix-:R3ellafnnja:"
                      aria-expanded="false"
                      aria-autocomplete="none"
                      dir="ltr"
                      data-state="closed"
                      data-placeholder=""
                      className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[80px]"
                    >
                      <span style={{ pointerEvents: "none" }}>Key</span>
                      <KeyboardArrowDownRoundedIcon className="h-4 w-4" />
                    </button>
                    <select
                      aria-hidden="true"
                      tabIndex={-1}
                      style={{
                        position: "absolute",
                        border: "0",
                        width: "1px",
                        height: "1px",
                        padding: "0",
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        wordWrap: "normal",
                      }}
                    >
                      <option value=""></option>
                    </select>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <DeleteRoundedIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Añadir una nueva canción
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Search for a song to add to the event.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[200px]"
                  type="search"
                  placeholder="Search songs..."
                />
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                  <AddRoundedIcon className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
