import SongListItemMainStyle from "@/components/songs/SongListItemMainStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { EventSongColection } from "./AddEditEvents.tsx";
import { localEventObj } from "./EventListItem.tsx";

interface ScrollDialogProps {
  open: boolean;
  setOpen: (stateProp: boolean) => void;
  selectedEvent: localEventObj;
  eventSongsSelected: EventSongColection[];
}

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function ListSongsInEvent({
  open,
  setOpen,
  selectedEvent,
  eventSongsSelected,
}: ScrollDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const formattedDate = new Date(selectedEvent.date).toLocaleDateString(
    "es-ES",
    options,
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen
      >
        <DialogTitle id="scroll-dialog-title">
          Lista de canciones {formattedDate}
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ width: "100%" }}>
            <div className="grid gap-4">
              {eventSongsSelected.map((eventSong) => (
                <SongListItemMainStyle
                  key={eventSong.song.id}
                  song={eventSong.song}
                  hideOptions={true}
                  handleSongSelection={() => {}}
                  memberSel={eventSong.member}
                />
              ))}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
