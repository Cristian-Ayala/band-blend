import { SongObj } from "@/components/songs/AddEditSong";
import { SongsCollection } from "@/components/songs/SearchSongs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import SongListItem from "./SongListItem";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface songsInPlaylistProps {
  songsEvent: SongsCollection;
  open: boolean;
  handleClose: () => void;
  mutateSongCollection: (song: SongObj) => void;
}
export default function SongsInPlaylist({
  songsEvent,
  open,
  handleClose,
  mutateSongCollection,
}: songsInPlaylistProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="songs-in-playlist"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
      keepMounted
      fullScreen
    >
      <DialogTitle id="songs-in-playlist">Canciones agregadas</DialogTitle>
      <DialogContent dividers={true}>
        {Object.values(songsEvent).map((song) => (
          <SongListItem
            key={song.id}
            song={song}
            songsEvent={songsEvent}
            mutateSongCollection={mutateSongCollection}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
