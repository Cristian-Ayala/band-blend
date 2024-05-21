import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import SongListItem from "./SongListItem";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface songsInPlaylistProps {
  open: boolean;
  handleClose: () => void;
}
export default function SongsInPlaylist({
  open,
  handleClose,
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
        <SongListItem isAdded={true} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}
