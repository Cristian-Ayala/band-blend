import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EmptyProps {
  message?: string;
}

export default function Empty({
  message = "No hay elementos para mostrar.",
}: EmptyProps) {
  return (
    <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="0.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          ></path>
        </svg>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
