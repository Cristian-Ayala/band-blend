import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
      >
        <CalendarMonthIcon className="h-6 w-6" />
        <span>Event Planner</span>
      </Link>
      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
          type="button"
          id="radix-:R6dafnnja:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <img
            src="/placeholder.svg"
            width="32"
            height="32"
            alt="User Avatar"
            className="rounded-full"
            style={{ aspectRatio: "32/32", objectFit: "cover" }}
          />
        </button>
        <select
          aria-hidden="true"
          style={{
            position: "absolute",
            border: 0,
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }}
          tabIndex={-1}
        >
          <option value=""></option>
        </select>
      </div>
    </header>
  );
}
