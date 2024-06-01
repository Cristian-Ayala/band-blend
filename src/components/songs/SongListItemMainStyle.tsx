import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

export default function songListItemMainStyle({
  id,
  title,
  artist,
}: {
  id: number;
  title: string;
  artist: string;
}) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
      key={id}
    >
      <div className="p-6 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{artist}</p>
          </div>
          <div className="flex items-center gap-2">
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
  );
}
