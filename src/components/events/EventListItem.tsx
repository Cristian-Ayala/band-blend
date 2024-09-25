import {
  getHourFromStringTime,
  getLongDateFromStringDate,
} from "@/plugins/helpers";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

export interface localEventObj {
  id: number;
  hour: string;
  desc: string | null;
  date: string;
  name: string;
}

interface EventListItemProps {
  event: localEventObj;
  handleEventSelection: (event: localEventObj, openEditDialog: boolean) => void;
}
export default function EventListItem({
  event,
  handleEventSelection,
}: EventListItemProps) {
  const showDesc = event.desc != null && event.desc.trim().length > 0;
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="p-3 grid">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {event.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getLongDateFromStringDate(event.date)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getHourFromStringTime(event.hour)}
              </p>
            </div>
            <div
              className="flex items-center justify-between"
              style={showDesc ? {} : { display: "none" }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {event.desc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              onClick={() => handleEventSelection(event, true)}
            >
              <DriveFileRenameOutlineRoundedIcon className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              onClick={() => handleEventSelection(event, false)}
            >
              <RemoveRedEyeRoundedIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
