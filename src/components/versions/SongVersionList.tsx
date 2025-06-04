import { SongVersionObj } from "@/components/events/AddEditEvents";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

export default function songListItemMainStyle({
  handleSongVerSelection,
  songVersion,
}: {
  handleSongVerSelection: (
    songVersion: SongVersionObj,
    openEditDialog: boolean,
  ) => void;
  songVersion: SongVersionObj;
}) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm mb-4"
      data-v0-t="card"
      key={songVersion.id}
    >
      <div className="p-3 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold text-gray-50">
              {songVersion.version_name}
            </h3>
            <p className="text-sm text-gray-400">
              Nota: {songVersion?.key_note}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              onClick={() => handleSongVerSelection(songVersion, true)}
            >
              <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              onClick={() => handleSongVerSelection(songVersion, false)}
            >
              <DeleteRoundedIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
